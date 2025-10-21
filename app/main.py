from fastapi import FastAPI, UploadFile, File, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse
from PIL import Image
import io
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
import mediapipe as mp

from app.utils import predict_eye_state
from app.db import get_db_connection  # ✅ Use your existing db.py file

app = FastAPI(title="Eye State Prediction API")

# ✅ CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

mp_face_mesh = mp.solutions.face_mesh
LEFT_EYE_INDEXES = [33, 133, 160, 158, 159, 144, 145, 153, 154, 155]

def crop_left_eye_from_image(image: Image.Image) -> Image.Image:
    img_cv = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
    rgb = cv2.cvtColor(img_cv, cv2.COLOR_BGR2RGB)

    with mp_face_mesh.FaceMesh(static_image_mode=True) as face_mesh:
        results = face_mesh.process(rgb)
        if not results.multi_face_landmarks:
            raise HTTPException(status_code=400, detail="No face detected in the image.")

        h, w, _ = img_cv.shape
        landmarks = results.multi_face_landmarks[0]

        xs, ys = [], []
        for idx in LEFT_EYE_INDEXES:
            x = int(landmarks.landmark[idx].x * w)
            y = int(landmarks.landmark[idx].y * h)
            xs.append(x)
            ys.append(y)

        x1, x2 = max(min(xs) - 5, 0), min(max(xs) + 5, w)
        y1, y2 = max(min(ys) - 5, 0), min(max(ys) + 5, h)

        eye_crop = rgb[y1:y2, x1:x2]
        return Image.fromarray(eye_crop)

# === Pose Analysis ===
mp_pose = mp.solutions.pose

def is_lying_down(pose_landmarks, image_shape):
    left_shoulder = pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER]
    right_shoulder = pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_SHOULDER]
    left_hip = pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP]
    right_hip = pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HIP]

    shoulder_y = (left_shoulder.y + right_shoulder.y) / 2
    hip_y = (left_hip.y + right_hip.y) / 2
    shoulder_x = (left_shoulder.x + right_shoulder.x) / 2
    hip_x = (left_hip.x + right_hip.x) / 2

    vertical_diff = abs(shoulder_y - hip_y)
    horizontal_diff = abs(shoulder_x - hip_x)

    return horizontal_diff > vertical_diff * 1.5

# === DB Logging Function ===
def log_prediction(prediction: str, sleep_confirmed: bool = None):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        query = "INSERT INTO eye_state_records (prediction, sleep_confirmed) VALUES (%s, %s)"
        cursor.execute(query, (prediction, int(sleep_confirmed) if sleep_confirmed is not None else None))
        conn.commit()
        cursor.close()
        conn.close()
    except Exception as e:
        print(f"[DB Error] Failed to insert record: {e}")

# === API Endpoint ===
@app.post("/predict_eye_state")
async def predict_eye_state_endpoint(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Invalid image type")

    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    eye_crop = crop_left_eye_from_image(image)

    prediction = predict_eye_state(eye_crop)
    response = {"eye_state": prediction}

    sleep_confirmed = None

    if prediction == "Closed":
        img_cv = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
        with mp_pose.Pose(static_image_mode=True) as pose:
            results = pose.process(img_cv)
            if results.pose_landmarks:
                sleep_confirmed = is_lying_down(results.pose_landmarks, img_cv.shape)
                response["sleep_confirmed"] = sleep_confirmed
            else:
                sleep_confirmed = False
                response["sleep_confirmed"] = False

    # ✅ Log to DB
    log_prediction(prediction, sleep_confirmed)

    return JSONResponse(content=response)
