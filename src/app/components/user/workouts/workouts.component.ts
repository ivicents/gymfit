import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { WorkoutDTO } from 'src/app/models/workout.dto';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss'],
})
export class WorkoutsComponent implements OnInit {
  workout!: WorkoutDTO;
  workoutStarted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private sharedService: SharedService,
    private localStorageService: LocalStorageService
  ) {
    this.workout = new WorkoutDTO('', []);
    this.workoutStarted = false;
  }

  ngOnInit(): void {
    this.loadWorkout();
  }

  loadWorkout(): void {
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.userService.getUserWorkout(userId).subscribe(
        (workout: WorkoutDTO) => {
          this.workout = workout;
        },
        async (error) => {
          await this.sharedService.managementToast('toastFeedback', false);
        }
      );
    }
  }

  async startWorkout(): Promise<void> {
    let responseOK: boolean = false;
    const userId = this.localStorageService.get('user_id');
    if (this.workout.id && userId) {
      this.userService
        .startWorkout(userId, this.workout.id)
        .pipe(
          finalize(async () => {
            await this.sharedService.managementToast(
              'toastFeedback',
              responseOK,
              undefined,
              'Rutina empezada'
            );
          })
        )
        .subscribe(
          () => {
            this.workoutStarted = true;
            responseOK = true;
          },
          (error) => {
            responseOK = false;
          }
        );
    } else {
      await this.sharedService.managementToast('toastFeedback', false);
    }
  }

  async stopWorkout(): Promise<void> {
    let responseOK: boolean = false;
    const userId = this.localStorageService.get('user_id');
    if (this.workout.id && userId) {
      this.userService
        .stopWorkout(userId, this.workout.id)
        .pipe(
          finalize(async () => {
            await this.sharedService.managementToast(
              'toastFeedback',
              responseOK,
              undefined,
              'Rutina terminada'
            );
          })
        )
        .subscribe(
          () => {
            this.workoutStarted = false;
            responseOK = true;
          },
          (error) => {
            responseOK = false;
          }
        );
    } else {
      await this.sharedService.managementToast('toastFeedback', false);
    }
  }
}
