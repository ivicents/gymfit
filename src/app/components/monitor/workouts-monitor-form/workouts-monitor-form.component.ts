import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseDTO } from 'src/app/models/exercise.dto';
import { WorkoutDTO } from 'src/app/models/workout.dto';
import { SharedService } from 'src/app/services/shared.service';
import { WorkoutService } from 'src/app/services/workout.service';

@Component({
  selector: 'app-workouts-monitor-form',
  templateUrl: './workouts-monitor-form.component.html',
  styleUrls: ['./workouts-monitor-form.component.scss'],
})
export class WorkoutsMonitorFormComponent implements OnInit {
  private workoutId: string | null;
  private isUpdateMode: boolean;
  workout: WorkoutDTO;
  exercisesList: ExerciseDTO[];

  exerciseSelected: ExerciseDTO | null;
  exercise: FormControl;
  exerciseForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private workoutService: WorkoutService,
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute,
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
  }

  ngOnInit(): void {
    this.loadExercisesList();
    if (this.workoutId) {
      this.isUpdateMode = true;
      this.workoutService.getWorkoutWithExercises(this.workoutId).subscribe(
        (workoutResponse: WorkoutDTO) => {
          this.workout = workoutResponse;
        },
        async (error) => {
          await this.sharedService.managementToast('toastFeedback', false);
        }
      );
    }
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
    console.log('Ejer elim ', exerciseId);
  }

  addExercise(): void {}

  selectExercise(e: any): void {
    this.exerciseSelected = e;
    console.log('Exxerc sel ', this.exerciseSelected);
  }
}
