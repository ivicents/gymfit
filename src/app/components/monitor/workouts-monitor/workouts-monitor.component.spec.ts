import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutsMonitorComponent } from './workouts-monitor.component';

describe('WorkoutsMonitorComponent', () => {
  let component: WorkoutsMonitorComponent;
  let fixture: ComponentFixture<WorkoutsMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutsMonitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutsMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
