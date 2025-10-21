import torch
from torchvision import transforms
from PIL import Image
from app.model import EyeClassifierV3  # make sure your model class is in app/model.py

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Load model
model = EyeClassifierV3()
model.load_state_dict(torch.load(r"C:\Users\shash\Desktop\Carebridge\eye_state_classifier_v3.pth", map_location=device))
model.to(device)
model.eval()

# Transform must match training
transform = transforms.Compose([
    transforms.Grayscale(num_output_channels=3),
    transforms.Resize((64, 64)),
    transforms.ToTensor(),
    transforms.Normalize([0.5]*3, [0.5]*3),
])

class_labels = {0: "Closed", 1: "Open"}

def predict_eye_state(cropped_eye_image: Image.Image) -> str:
    """Takes PIL Image (cropped eye), runs inference, returns 'Open' or 'Closed'."""
    input_tensor = transform(cropped_eye_image).unsqueeze(0).to(device)  # add batch dim
    with torch.no_grad():
        outputs = model(input_tensor)
        predicted_class = torch.argmax(outputs, dim=1).item()
        return class_labels[predicted_class]
