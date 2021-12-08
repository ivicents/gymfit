import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { UserDTO } from 'src/app/models/user.dto';
import { WorkoutDTO } from 'src/app/models/workout.dto';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MonitorService } from 'src/app/services/monitor.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-monitor',
  templateUrl: './users-monitor.component.html',
  styleUrls: ['./users-monitor.component.scss'],
})
export class UsersMonitorComponent implements OnInit {
  userList: UserDTO[];
  userSelected: UserDTO | null;
  monitorWorkouts: WorkoutDTO[];
  workoutSelected: WorkoutDTO | null;
  workout: FormControl;
  workoutForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private monitorService: MonitorService,
    private userService: UserService,
    private sharedService: SharedService,
    private localStorageService: LocalStorageService
  ) {
    this.userList = [];
    this.userSelected = null;
    this.monitorWorkouts = [];
    this.workoutSelected = null;

    this.workout = new FormControl('');
    this.workoutForm = this.formBuilder.group({
      workout: this.workout,
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadWorkouts();
  }

  loadUsers(): void {
    const monitorId = this.localStorageService.get('monitor_id');
    if (monitorId) {
      this.monitorService.getMonitorUsers(monitorId).subscribe(
        (usuarios: UserDTO[]) => {
          this.userList = usuarios;
          this.userSelected = usuarios[0];
        },
        async (error) => {
          await this.sharedService.managementToast('toastFeedback', false);
        }
      );
    }
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

  changeWorkout(e: any): void {
    this.workoutSelected = e;
  }

  selectUser(user: any): void {
    this.userSelected = user;
  }

  async updateUserWorkout(): Promise<void> {
    let responseOK: boolean = false;
    if (this.userSelected && this.workoutSelected) {
      this.userService
        .updateUserWorkout(this.userSelected.id!, this.workoutSelected.id!)
        .pipe(
          finalize(async () => {
            await this.sharedService.managementToast(
              'toastFeedback',
              responseOK,
              undefined,
              'Rutina actualizada para el usuario ' + this.userSelected?.name
            );
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
    } else {
      await this.sharedService.managementToast('toastFeedback', false);
    }
  }
}
