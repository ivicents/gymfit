import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { WorkoutDTO } from 'src/app/models/workout.dto';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss'],
})
export class WorkoutsComponent implements OnInit {
  workout!: WorkoutDTO;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {
    this.workout = new WorkoutDTO('', []);
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
          console.log('El workout recibido es ', workout);
        },
        (error) => {
          //TODO: Mostrar error
        }
      );
    }
  }
}
