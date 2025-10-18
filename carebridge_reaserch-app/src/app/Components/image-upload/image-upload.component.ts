import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {
  selectedFile: File | null = null;
  weight: number = 1;

  calories: string | null = null;
  confidence: string | null = null;
  food: string | null = null;
  totalCalories: string | null = null;
  savedResponses: any[] = [];
  error: string | null = null;
  totalCaloriesSum: number = 0;

  // For update functionality
  editingPrediction: any = null; // Track the prediction being edited
  updatedFood: string = '';
  updatedWeight: number = 0;
  updatedCalories: number = 0;
  updatedConfidence: string = '';

  constructor(private http: HttpClient) {
    this.fetchPredictions(); // Fetch saved predictions on component initialization
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    // Validate if all fields are filled
    if (this.selectedFile && this.weight) {
      const formData = new FormData();

      // Append the image input to FormData
      formData.append('file', this.selectedFile, this.selectedFile.name);
      // Append the weight input to the FormData
      formData.append('weight', this.weight.toString());

      // Send POST request to predict food
      this.http.post('http://127.0.0.1:3606/predict', formData, { observe: 'response' })
        .subscribe(
          (response: any) => {
            if (response.body.error) {
              this.error = response.body.error;
            } else {
              // Store the response
              this.savedResponses.push(response.body);

              // Update fields with response values
              this.food = response.body.food;
              this.confidence = response.body.confidence;
              this.calories = response.body.calories_per_100g;
              this.totalCalories = response.body.total_calories.toString();

              // Calculate the sum of total calories
              this.totalCaloriesSum += response.body.total_calories || 0;

              // Clearing input fields upon successful server response
              this.clearFields();
            }
          },
          (error: HttpErrorResponse) => {
            console.error("Upload failed:", error.message);

            if (error.status === 300) {
              this.error = 'This is not a food image.';
            } else {
              this.error = 'Upload failed. Please try again.';
            }
          }
        );
    } else {
      this.error = 'Please select a file to upload and enter the weight';
    }
  }

  // Fetch all predictions from the server
  fetchPredictions() {
    this.http.get('http://127.0.0.1:3606/predictions')
      .subscribe(
        (response: any) => {
          this.savedResponses = response;
          this.totalCaloriesSum = this.savedResponses.reduce((sum, item) => sum + (item.total_calories || 0), 0);
        },
        (error) => {
          console.error("Failed to fetch predictions:", error.message);
          this.error = 'Failed to fetch predictions. Please try again.';
        }
      );
  }

  // Start editing a prediction
  startEdit(prediction: any) {
    this.editingPrediction = prediction;
    this.updatedFood = prediction.food;
    this.updatedWeight = prediction.weight;
    this.updatedCalories = prediction.calories;
    this.updatedConfidence = prediction.confidence;
  }

  // Update a prediction
  updatePrediction() {
    const updatedData = {
      food: this.updatedFood,
      weight: this.updatedWeight,
      calories: this.updatedCalories,
      confidence: this.updatedConfidence
    };

    this.http.put(`http://127.0.0.1:3606/predictions/${this.editingPrediction.id}`, updatedData)
      .subscribe(
        () => {
          this.fetchPredictions(); // Refresh the list after updating
          this.cancelEdit(); // Close the edit form
        },
        (error) => {
          console.error("Failed to update prediction:", error.message);
          this.error = 'Failed to update prediction. Please try again.';
        }
      );
  }

  // Cancel editing
  cancelEdit() {
    this.editingPrediction = null;
    this.updatedFood = '';
    this.updatedWeight = 0;
    this.updatedCalories = 0;
    this.updatedConfidence = '';
  }

  // Delete a prediction
  deletePrediction(predictionId: number) {
    const isConfirmed = confirm('Are you sure you want to delete this prediction?');
    if (isConfirmed) {
      this.http.delete(`http://127.0.0.1:3606/predictions/${predictionId}`)
        .subscribe(
          () => {
            this.fetchPredictions(); // Refresh the list after deleting
          },
          (error) => {
            console.error("Failed to delete prediction:", error.message);
            this.error = 'Failed to delete prediction. Please try again.';
          }
        );
    }
  }

  // Clears the input fields
  clearFields() {
    this.selectedFile = null;
    this.weight = 0;
    this.error = null;
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}
