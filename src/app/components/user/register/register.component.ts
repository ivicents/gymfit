import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';
import { UserDTO } from '../../../models/user.dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public user: UserDTO;
  public status: string;
  name: FormControl;
  surname: FormControl;
  email: FormControl;
  password: FormControl;
  birthday: FormControl;
  gender: FormControl;
  registerForm: FormGroup;
  isValidForm: boolean | null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private sharedService: SharedService,
    private _router: Router
  ) {
    this.user = new UserDTO(
      'Mar',
      'Gomez',
      'male',
      new Date(),
      'mar@gmail.com',
      'testtest'
    );
    this.status = '';
    this.isValidForm = null;

    this.name = new FormControl(this.user.name, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25),
    ]);

    this.surname = new FormControl(this.user.surname, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.email = new FormControl(this.user.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl(this.user.password, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]);

    this.birthday = new FormControl(
      formatDate(this.user.birthday, 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    this.gender = new FormControl(this.user.gender, [Validators.required]);

    this.registerForm = this.formBuilder.group({
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password,
      birthday: this.birthday,
      gender: this.gender,
    });
  }

  ngOnInit(): void {}

  async register(): Promise<void> {
    let responseOK: boolean = false;
    let errorResponse: any;

    this.user.email = this.email.value;
    this.user.password = this.password.value;
    this.user = this.registerForm.value;

    this.userService
      .register(this.user)
      .pipe(
        finalize(async () => {
          await this.sharedService.managementToast(
            'toastFeedback',
            responseOK,
            errorResponse,
            'Registrado correctamente'
          );

          if (responseOK) {
            this._router.navigate(['login']);
          }
        })
      )
      .subscribe(
        () => {
          responseOK = true;
          this.registerForm.reset();
          this.birthday.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
        },
        (error) => {
          responseOK = false;
          errorResponse = error.error;
        }
      );
  }
}
