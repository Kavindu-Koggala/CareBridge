import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = ''; // Bind email input
  password: string = ''; // Bind password input
  errorMessage: string = ''; // Display error messages

  constructor(private router: Router) {}

  /**
   * Handles form submission for login.
   */
  onSubmit(): void {
    // Simple validation logic for demonstration
    if (this.email === 'user@example.com' && this.password === 'password123') {
      // Navigate to the home page after a successful login
      this.router.navigate(['/home']);
    } else {
      // Show an error message if login fails
      this.errorMessage = 'Invalid email or password. Please try again.';
    }
  }
}
