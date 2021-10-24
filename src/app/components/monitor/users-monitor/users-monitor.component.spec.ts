import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersMonitorComponent } from './users-monitor.component';

describe('UsersMonitorComponent', () => {
  let component: UsersMonitorComponent;
  let fixture: ComponentFixture<UsersMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersMonitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
