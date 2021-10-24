import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidencesMonitorComponent } from './incidences-monitor.component';

describe('IncidencesMonitorComponent', () => {
  let component: IncidencesMonitorComponent;
  let fixture: ComponentFixture<IncidencesMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidencesMonitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidencesMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
