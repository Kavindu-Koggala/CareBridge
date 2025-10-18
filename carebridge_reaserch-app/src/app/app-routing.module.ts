import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriticalAlertsComponent } from './Components/critical-alerts/critical-alerts.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { MindCareAssistComponent } from './Components/mind-care-assist/mind-care-assist.component';
import { ImageUploadComponent } from './Components/image-upload/image-upload.component';
import { DailyCalorieTrackerComponent } from './Components/daily-calorie-tracker/daily-calorie-tracker.component';
import { FoodSearchComponent } from './Components/food-search/food-search.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default to login page
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'mindcare', component: MindCareAssistComponent },
  { path: 'alerts', component: CriticalAlertsComponent },
  { path: 'image', component: ImageUploadComponent },
  { path: 'daily-calorie-tracker', component: DailyCalorieTrackerComponent },
  { path: 'food', component: FoodSearchComponent },
  { path: '**', redirectTo: 'login' } // Redirect unknown routes to login
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

