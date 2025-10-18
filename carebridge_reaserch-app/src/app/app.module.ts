import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { NgxGaugeModule } from 'ngx-gauge';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CriticalAlertsComponent } from './Components/critical-alerts/critical-alerts.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { MindCareAssistComponent } from './Components/mind-care-assist/mind-care-assist.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { PatientMonitorComponent } from './Components/patient-monitor/patient-monitor.component';
import { ImageUploadComponent } from './Components/image-upload/image-upload.component'; 
import { HttpClientModule } from '@angular/common/http';
import { DailyCalorieTrackerComponent } from './Components/daily-calorie-tracker/daily-calorie-tracker.component';
import { NgChartsModule } from 'ng2-charts';
import { FoodSearchComponent } from './Components/food-search/food-search.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    MindCareAssistComponent,
    PatientMonitorComponent,
    CriticalAlertsComponent,
    ImageUploadComponent,
    DailyCalorieTrackerComponent,
    FoodSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    NgxGaugeModule,
    NgChartsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
