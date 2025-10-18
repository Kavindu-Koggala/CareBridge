import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMonitorComponent } from './patient-monitor.component';

describe('PatientMonitorComponent', () => {
  let component: PatientMonitorComponent;
  let fixture: ComponentFixture<PatientMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientMonitorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
