import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-daily-calorie-tracker',
  templateUrl: './daily-calorie-tracker.component.html'
})
export class DailyCalorieTrackerComponent {
  height = 0;
  weight = 0;
  age = 25;
  gender = 'male';
  bmi: number | null = null;
  dailyCaloriesNeeded: number | null = null;

  // ADD THESE
  barChartType: ChartType = 'bar';
  barChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  barChartData = {
    labels: ['Consumed', 'Daily Limit'],
    datasets: [
      {
        data: [0, 0],
        label: 'Calories',
        backgroundColor: ['#42A5F5', '#66BB6A']
      }
    ]
  };

  constructor(private http: HttpClient) {
    this.fetchSummary();
  }

  updateUser() {
    this.http.post('http://127.0.0.1:3606/user', {
      height_cm: this.height,
      weight_kg: this.weight,
      age: this.age,
      gender: this.gender
    }).subscribe((res: any) => {
      this.bmi = res.bmi;
      this.dailyCaloriesNeeded = res.daily_calories_needed;
      this.fetchSummary();
    });
  }

  fetchSummary() {
    this.http.get('http://127.0.0.1:3606/summary').subscribe((res: any) => {
      this.barChartData.datasets[0].data = [
        res.total_consumed,
        res.daily_calories_needed
      ];
    });
  }
}
