import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { UserDTO } from 'src/app/models/user.dto';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileUser: UserDTO;

  name: FormControl;
  surname: FormControl;
  email: FormControl;
  password: FormControl;
  birthday: FormControl;
  gender: FormControl;

  profileForm: FormGroup;
  isValidForm: boolean | null;

  private userId: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {
    this.userId = '';
    this.profileUser = new UserDTO('', '', '', new Date(), '', '');

    this.isValidForm = null;

    this.name = new FormControl(this.profileUser.name, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.surname = new FormControl(this.profileUser.surname, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.email = new FormControl(this.profileUser.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl(this.profileUser.password, [
      Validators.required,
      Validators.minLength(8),
    ]);

    this.birthday = new FormControl(
      formatDate(this.profileUser.birthday, 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    this.gender = new FormControl(this.profileUser.gender, [
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
    let errorResponse: any;

    // load user data
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.userService.getUSerById(userId).subscribe(
        (user: UserDTO) => {
          const userData = user;

          this.name.setValue(userData.name);
          this.surname.setValue(userData.surname);
          this.email.setValue(userData.email);
          this.password.setValue(userData.password);
          this.birthday.setValue(
            formatDate(userData.birthday, 'yyyy-MM-dd', 'en')
          );
          this.gender.setValue(userData.gender);

          this.profileForm = this.formBuilder.group({
            name: this.name,
            surname: this.surname,
            email: this.email,
            password: this.password,
            birthday: this.birthday,
            gender: this.gender,
          });
        },
        (error) => {
          errorResponse = error.error;
          //TODO: Mostrar error
        }
      );
    }
  }

  updateUser(): void {
    let responseOK: boolean = false;
    this.isValidForm = false;
    let errorResponse: any;

    if (this.profileForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.profileUser = this.profileForm.value;

    const userId = this.localStorageService.get('user_id');

    if (userId) {
      this.userService
        .updateUser(userId, this.profileUser)
        .pipe(
          finalize(async () => {
            // await this.sharedService.managementToast(
            //   'profileFeedback',
            //   responseOK,
            //   errorResponse
            // );
            //TODO: Mostrar toast
          })
        )
        .subscribe(
          (resp) => {
            responseOK = true;
          },
          (error) => {
            responseOK = false;
            errorResponse = error.error;

            //this.sharedService.errorLog(errorResponse);
          }
        );
    }
  }
}
