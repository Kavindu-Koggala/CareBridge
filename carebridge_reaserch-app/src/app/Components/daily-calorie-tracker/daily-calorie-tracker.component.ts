import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartType, ChartData } from 'chart.js';

@Component({
  selector: 'app-daily-calorie-tracker',
  templateUrl: './daily-calorie-tracker.component.html',
})
export class DailyCalorieTrackerComponent {
  height = 0;
  weight = 0;
  age = 25;
  gender = 'male';

  bmi: number | null = null;
  dailyCaloriesNeeded: number | null = null;

  public barChartType: ChartType = 'bar';

  public barChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  //  Proper typing with color
  public barChartData: ChartData<'bar'> = {
    labels: ['Consumed', 'Daily Limit'],
    datasets: [
      {
        data: [0, 0],
        label: 'Calories',
        backgroundColor: ['#ff6384', '#36a2eb']
      }
    ]
  };

  constructor(private http: HttpClient) {
    this.fetchSummary(); // Fetch data on load
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
      this.fetchSummary(); // Refresh chart with new user data
    });
  }

  fetchSummary() {
    this.http.get('http://127.0.0.1:3606/summary').subscribe((res: any) => {
      const consumed = Number(res.total_consumed) || 0;
      const limit = Number(res.daily_calories_needed) || 0;

      //  Update entire chart object to trigger re-render
      this.barChartData = {
        labels: ['Consumed', 'Daily Limit'],
        datasets: [
          {
            data: [consumed, limit],
            label: 'Calories',
            backgroundColor: ['#ff6384', '#36a2eb']
          }
        ]
      };
    });
  }
}
