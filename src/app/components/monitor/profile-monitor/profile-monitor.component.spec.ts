import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMonitorComponent } from './profile-monitor.component';

describe('ProfileMonitorComponent', () => {
  let component: ProfileMonitorComponent;
  let fixture: ComponentFixture<ProfileMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileMonitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
