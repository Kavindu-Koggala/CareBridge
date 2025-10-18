import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // Current status: this can be dynamically set based on the situation
  status: string = 'critical';  // example, this would be dynamic in your actual app

  // List of all status options
  statusOptions = [
    { value: 'asking_for_help', text: 'Asking for help' },
    { value: 'coughing', text: 'Coughing' },
    { value: 'screaming', text: 'Screaming' },
    { value: 'normal', text: 'Normal' },
    { value: 'critical', text: 'Critical' }
  ];

  // Returns the corresponding icon for the status
  getStatusIcon(status: string): string {
    switch(status) {
      case 'asking_for_help': return '/help.svg';
      case 'coughing': return '/coughing.svg';
      case 'screaming': return '/screaming.svg';
      case 'normal': return 'assets/icons/normal.svg';
      case 'critical': return '/critical1.svg';
      default: return 'assets/icons/default.svg';  // fallback icon
    }
  }
}