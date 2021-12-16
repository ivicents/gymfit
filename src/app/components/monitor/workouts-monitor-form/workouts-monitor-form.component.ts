import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ExerciseDTO } from 'src/app/models/exercise.dto';
import { WorkoutDTO } from 'src/app/models/workout.dto';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SharedService } from 'src/app/services/shared.service';
import { WorkoutService } from 'src/app/services/workout.service';

@Component({
  selector: 'app-workouts-monitor-form',
  templateUrl: './workouts-monitor-form.component.html',
  styleUrls: ['./workouts-monitor-form.component.scss'],
})
export class WorkoutsMonitorFormComponent implements OnInit {
  workoutId: string | null;
  private isUpdateMode: boolean;
  workout: WorkoutDTO;
  exercisesList: ExerciseDTO[];

  exerciseSelected: ExerciseDTO | null;
  exercise: FormControl;
  exerciseForm: FormGroup;

  workoutNameForm: FormGroup;
  nameWorkout: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private workoutService: WorkoutService,
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.workoutId = this.activatedRoute.snapshot.paramMap.get('id');
    this.workout = new WorkoutDTO('', []);
    this.isUpdateMode = false;
    this.exerciseSelected = null;
    this.exercisesList = [];

    this.exercise = new FormControl('');
    this.exerciseForm = this.formBuilder.group({
      exercise: this.exercise,
    });

    this.nameWorkout = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(250),
    ]);

    this.workoutNameForm = this.formBuilder.group({
      nameWorkout: this.nameWorkout,
    });
  }

  ngOnInit(): void {
    this.loadExercisesList();
    if (this.workoutId) {
      this.isUpdateMode = true;
      this.loadWorkoutWithExercises(this.workoutId);
    }
  }

  loadWorkoutWithExercises(workoutId: string): void {
    this.workoutService.getWorkoutWithExercises(workoutId).subscribe(
      (workoutResponse: WorkoutDTO) => {
        this.workout = workoutResponse;
      },
      async (error) => {
        await this.sharedService.managementToast('toastFeedback', false);
      }
    );
  }

  loadExercisesList(): void {
    this.workoutService.getExercises().subscribe(
      (exercises: ExerciseDTO[]) => {
        this.exercisesList = exercises;
      },
      async (error) => {
        await this.sharedService.managementToast('toastFeedback', false);
      }
    );
  }

  deleteExercise(exerciseId: string | undefined): void {
    let responseOK = false;
    if (exerciseId && this.workout?.id) {
      this.workoutService
        .deleteExerciseToWorkout(this.workout.id, exerciseId)
        .pipe(
          finalize(async () => {
            await this.sharedService.managementToast(
              'toastFeedback',
              responseOK,
              undefined,
              'Ejercicio eliminado correctamente'
            );

            if (responseOK) {
              this.loadWorkoutWithExercises(this.workout.id!);
            }
          })
        )
        .subscribe(
          () => {
            responseOK = true;
          },
          (error) => {
            responseOK = false;
          }
        );
    }
  }

  addExercise(): void {
    let responseOK = false;
    if (this.exerciseSelected?.id && this.workout?.id) {
      this.workoutService
        .addExerciseToWorkout(this.workout.id, this.exerciseSelected.id)
        .pipe(
          finalize(async () => {
            await this.sharedService.managementToast(
              'toastFeedback',
              responseOK,
              undefined,
              'Ejercicio ' +
                this.exerciseSelected?.name +
                ' añadido a la rutina ' +
                this.workout.name
            );

            if (responseOK) {
              this.loadWorkoutWithExercises(this.workout.id!);
            }
          })
        )
        .subscribe(
          () => {
            responseOK = true;
          },
          (error) => {
            responseOK = false;
          }
        );
    }
  }

  selectExercise(e: any): void {
    this.exerciseSelected = e;
  }

  createWorkout(): void {
    let responseOK = false;
    const monitorId = this.localStorageService.get('monitor_id');
    if (
      this.workoutNameForm.valid &&
      this.workoutNameForm.value?.nameWorkout &&
      monitorId
    ) {
      this.workoutService
        .createWorkout(this.workoutNameForm.value.nameWorkout, monitorId)
        .pipe(
          finalize(async () => {
            await this.sharedService.managementToast(
              'toastFeedback',
              responseOK,
              undefined,
              'Rutina ' +
                this.workoutNameForm.value.nameWorkout +
                ' creada correctamente'
            );

            if (responseOK) {
              this.workoutId = this.workout.id!;
            }
          })
        )
        .subscribe(
          (resp) => {
            responseOK = true;
            this.workout.id = `${resp.workoutId}`;
            this.workout.name = this.workoutNameForm.value.nameWorkout;
          },
          (error) => {
            responseOK = false;
          }
        );
    }
    console.log(this.workoutNameForm.value);
  }
}
