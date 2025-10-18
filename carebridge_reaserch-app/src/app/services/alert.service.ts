import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  /**
   * Notifies the guardian.
   * @param message - The alert message.
   */
  notifyGuardian(message: string): void {
    console.log(`Guardian Notification: ${message}`);
    // Implement guardian notification logic here (e.g., send SMS or email)
  }

  /**
   * Calls emergency services.
   * @param message - The alert message.
   */
  callEmergency(message: string): void {
    console.log(`Emergency Services Notification: ${message}`);
    // Implement emergency call logic here (e.g., API call or SMS service)
  }
}
