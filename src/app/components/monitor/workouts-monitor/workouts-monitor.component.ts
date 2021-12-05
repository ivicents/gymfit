import { Component, OnInit } from '@angular/core';
import { WorkoutDTO } from 'src/app/models/workout.dto';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MonitorService } from 'src/app/services/monitor.service';

@Component({
  selector: 'app-workouts-monitor',
  templateUrl: './workouts-monitor.component.html',
  styleUrls: ['./workouts-monitor.component.scss'],
})
export class WorkoutsMonitorComponent implements OnInit {
  monitorWorkouts: WorkoutDTO[];

  constructor(
    private monitorService: MonitorService,
    private localStorageService: LocalStorageService
  ) {
    this.monitorWorkouts = [];
  }

  ngOnInit(): void {
    this.loadWorkouts();
  }

  loadWorkouts(): void {
    const monitorId = this.localStorageService.get('monitor_id');
    if (monitorId) {
      this.monitorService.getMonitorWorkouts(monitorId).subscribe(
        (rutinas: WorkoutDTO[]) => {
          this.monitorWorkouts = rutinas;
        },
        (error) => {
          //TODO: Mostrar error
        }
      );
    }
  }

  createWorkout(): void {}
}
