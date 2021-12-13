import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { WorkoutDTO } from 'src/app/models/workout.dto';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MonitorService } from 'src/app/services/monitor.service';
import { SharedService } from 'src/app/services/shared.service';
import { WorkoutService } from 'src/app/services/workout.service';

@Component({
  selector: 'app-workouts-monitor',
  templateUrl: './workouts-monitor.component.html',
  styleUrls: ['./workouts-monitor.component.scss'],
})
export class WorkoutsMonitorComponent implements OnInit {
  monitorWorkouts: WorkoutDTO[];

  constructor(
    private monitorService: MonitorService,
    private sharedService: SharedService,
    private localStorageService: LocalStorageService,
    private workoutService: WorkoutService,
    private router: Router
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
        async (error) => {
          await this.sharedService.managementToast('toastFeedback', false);
        }
      );
    }
  }

  createWorkout(): void {
    this.router.navigateByUrl('/monitor/workouts/form/');
  }

  updateWorkout(workoutId: string | undefined): void {
    if (workoutId) {
      this.router.navigateByUrl('/monitor/workouts/form/' + workoutId);
    }
  }

  deleteWorkout(workoutId: string | undefined): void {
    let errorResponse: any;
    let responseOK: boolean = false;
    const workout = this.monitorWorkouts.find((w) => w.id === workoutId);

    if (workoutId) {
      let result = confirm('Deseas borrar el workout: ' + workout?.name + '.');
      if (result) {
        this.workoutService
          .deleteWorkout(workoutId)
          .pipe(
            finalize(async () => {
              await this.sharedService.managementToast(
                'toastFeedback',
                responseOK,
                errorResponse,
                'Workout eliminado correctamente'
              );

              if (responseOK) {
                this.loadWorkouts();
              }
            })
          )
          .subscribe(
            (resp) => {
              responseOK = true;
            },
            (error) => {
              responseOK = false;
              errorResponse = error.error;
            }
          );
      }
    }
  }
}
