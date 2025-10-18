import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MindCareAssistComponent } from './mind-care-assist.component';

describe('MindCareAssistComponent', () => {
  let component: MindCareAssistComponent;
  let fixture: ComponentFixture<MindCareAssistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MindCareAssistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MindCareAssistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
