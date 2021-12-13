import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutsMonitorFormComponent } from './workouts-monitor-form.component';

describe('WorkoutsMonitorFormComponent', () => {
  let component: WorkoutsMonitorFormComponent;
  let fixture: ComponentFixture<WorkoutsMonitorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutsMonitorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutsMonitorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
