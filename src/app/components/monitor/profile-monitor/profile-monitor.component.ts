import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { MonitorDTO } from 'src/app/models/monitor.dto';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MonitorService } from 'src/app/services/monitor.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-profile-monitor',
  templateUrl: './profile-monitor.component.html',
  styleUrls: ['./profile-monitor.component.scss'],
})
export class ProfileMonitorComponent implements OnInit {
  profileMonitor: MonitorDTO;

  name: FormControl;
  surname: FormControl;
  email: FormControl;
  password: FormControl;
  birthday: FormControl;
  gender: FormControl;

  profileForm: FormGroup;
  isValidForm: boolean | null;

  constructor(
    private formBuilder: FormBuilder,
    private monitorService: MonitorService,
    private sharedService: SharedService,
    private localStorageService: LocalStorageService
  ) {
    this.profileMonitor = new MonitorDTO('', '', '', new Date(), '', '');

    this.isValidForm = null;

    this.name = new FormControl(this.profileMonitor.name, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.surname = new FormControl(this.profileMonitor.surname, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.email = new FormControl(this.profileMonitor.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl(this.profileMonitor.password, [
      Validators.required,
      Validators.minLength(8),
    ]);

    this.birthday = new FormControl(
      formatDate(this.profileMonitor.birthday, 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    this.gender = new FormControl(this.profileMonitor.gender, [
      Validators.required,
    ]);

    this.profileForm = this.formBuilder.group({
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password,
      birthday: this.birthday,
      gender: this.gender,
    });
  }

  ngOnInit(): void {
    // load monitor data
    const monitorId = this.localStorageService.get('monitor_id');
    if (monitorId) {
      this.monitorService.getMonitorById(monitorId).subscribe(
        (monitor: MonitorDTO) => {
          const monitorData = monitor;

          this.name.setValue(monitorData.name);
          this.surname.setValue(monitorData.surname);
          this.email.setValue(monitorData.email);
          this.password.setValue(monitorData.password);
          this.birthday.setValue(
            formatDate(monitorData.birthday, 'yyyy-MM-dd', 'en')
          );
          this.gender.setValue(monitorData.gender);

          this.profileForm = this.formBuilder.group({
            name: this.name,
            surname: this.surname,
            email: this.email,
            password: this.password,
            birthday: this.birthday,
            gender: this.gender,
          });
        },
        async (error) => {
          await this.sharedService.managementToast('toastFeedback', false);
        }
      );
    }
  }

  updateMonitor(): void {
    let responseOK: boolean = false;
    this.isValidForm = false;
    let errorResponse: any;

    if (this.profileForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.profileMonitor = this.profileForm.value;

    const monitorId = this.localStorageService.get('monitor_id');
    if (monitorId) {
      this.monitorService
        .updateMonitor(monitorId, this.profileMonitor)
        .pipe(
          finalize(async () => {
            await this.sharedService.managementToast(
              'toastFeedback',
              responseOK,
              undefined,
              'Datos guardados correctamente'
            );
          })
        )
        .subscribe(
          () => {
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
