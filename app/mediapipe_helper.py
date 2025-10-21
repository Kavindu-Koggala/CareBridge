import cv2
import mediapipe as mp
from PIL import Image

mp_face_mesh = mp.solutions.face_mesh
LEFT_EYE_INDEXES = [33, 133, 160, 158, 159, 144, 145, 153, 154, 155]

def crop_left_eye(image_path):
    img = cv2.imread(image_path)
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    with mp_face_mesh.FaceMesh(static_image_mode=True) as face_mesh:
        results = face_mesh.process(rgb)
        if not results.multi_face_landmarks:
            raise Exception("No face detected")

        h, w, _ = img.shape
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
