# Import PyTorch library for deep learning
import torch
# Import neural network modules (layers, activations, etc.)
from torch import nn

# Define the model class
class EyeClassifierV3(nn.Module):   # Inherit from PyTorch's base Module class
    def __init__(self):             # Constructor (initialization of model layers)
        super(EyeClassifierV3, self).__init__()  # Call parent class initializer

        # Define the convolutional layers (feature extraction part)
        self.conv_layers = nn.Sequential(
            nn.Conv2d(3, 32, 3, padding=1),  # Conv layer: 3 input channels (RGB), 32 output filters, 3x3 kernel
            nn.ReLU(),                       # Activation: makes learning non-linear
            nn.MaxPool2d(2),                 # Downsampling: reduce image size by half (64 → 32)

            nn.Conv2d(32, 64, 3, padding=1), # Conv layer: 32 input channels, 64 output filters
            nn.ReLU(),                       # Non-linear activation
            nn.MaxPool2d(2),                 # Downsampling: 32 → 16

            nn.Conv2d(64, 128, 3, padding=1),# Conv layer: 64 input channels, 128 output filters
            nn.ReLU(),                       # Non-linear activation
            nn.MaxPool2d(2)                  # Downsampling: 16 → 8
        )

        # Define the fully connected layers (classification part)
        self.fc_layers = nn.Sequential(
            nn.Flatten(),                    # Flatten feature maps into a 1D vector
            nn.Linear(128 * 8 * 8, 128),     # Fully connected: input features → 128 neurons
            nn.ReLU(),                       # Non-linear activation
            nn.Linear(128, 2)                # Output layer: 2 classes (e.g., Open vs Closed eye)
        )

    # Define forward pass (how data flows through the model)
    def forward(self, x):
        x = self.conv_layers(x)   # Pass image through convolutional layers
        x = self.fc_layers(x)     # Pass extracted features through fully connected layers
        return x                  # Return final predictions

# Function to load a trained model
def load_model(model_path, device):
    model = EyeClassifierV3().to(device)                           # Create model and move to device (CPU/GPU)
    model.load_state_dict(torch.load(model_path, map_location=device))  # Load saved weights
    model.eval()                                                   # Set model to evaluation mode (no training)
    return model                                                   # Return ready-to-use model
