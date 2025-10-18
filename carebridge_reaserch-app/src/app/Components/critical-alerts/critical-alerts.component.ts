import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-critical-alerts',
  templateUrl: './critical-alerts.component.html',
  styleUrls: ['./critical-alerts.component.scss']
})
export class CriticalAlertsComponent implements OnInit {
  heartRate: number = 72;  // Default heart rate (bpm)
  bloodPressure: number = 120;  // Default blood pressure (mmHg)
  alerts: { message: string; timestamp: Date; type: string }[] = [];  // Alerts array

  conditions = ['Asking for help', 'Coughing', 'Screaming', 'Normal', 'Critical']; // Conditions list
  currentCondition: string = 'Normal'; // Default condition

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.simulateLiveData();  // Simulate live data (replace with actual data source if needed)
  }

  /**
   * Simulates real-time biometric data updates for demonstration purposes.
   */
  simulateLiveData(): void {
    setInterval(() => {
      const newHeartRate = Math.floor(60 + Math.random() * 40);  // Random heart rate (bpm)
      const newBloodPressure = Math.floor(110 + Math.random() * 30);  // Random blood pressure (mmHg)
      
      this.heartRate = newHeartRate;
      this.bloodPressure = newBloodPressure;

      this.checkCriticalCondition(newHeartRate, newBloodPressure);  // Check for critical condition
    }, 5000);  // Updates every 5 seconds
  }

  /**
   * Checks if the biometric data indicates a critical condition.
   */
  private checkCriticalCondition(heartRate: number, bloodPressure: number): void {
    if (heartRate > 120 || bloodPressure > 140) {
      this.updateCondition('Critical');
      const message = `Critical condition detected: Heart Rate: ${heartRate} bpm, Blood Pressure: ${bloodPressure} mmHg.`;

      this.alerts.unshift({
        message,
        timestamp: new Date(),
        type: 'critical',
      });

      this.alertService.notifyGuardian(message);  // Notify guardian
      this.alertService.callEmergency(message);  // Call emergency services
    } else if (heartRate > 100 || bloodPressure > 130) {
      this.updateCondition('Asking for help');
    } else {
      this.updateCondition('Normal');
    }
  }

  /**
   * Updates the current condition displayed based on the input.
   */
  private updateCondition(newCondition: string): void {
    this.currentCondition = newCondition;
  }
}
