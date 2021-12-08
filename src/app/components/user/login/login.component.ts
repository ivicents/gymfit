import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthDTO } from 'src/app/models/auth.dto';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public user: AuthDTO;
  public status: string;
  email: FormControl;
  password: FormControl;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private sharedService: SharedService,
    private _router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.user = new AuthDTO('', '', '', 'juan@gmail.com', 'testtest');
    this.status = '';

    this.email = new FormControl(this.user.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl(this.user.password, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]);

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {}

  async login(): Promise<void> {
    let responseOK: boolean = false;
    let errorResponse: any;

    this.user.email = this.email.value;
    this.user.password = this.password.value;

    this.authService
      .login(this.user)
      .pipe(
        finalize(async () => {
          await this.sharedService.managementToast(
            'toastFeedback',
            responseOK,
            errorResponse,
            'Login correcto'
          );

          if (responseOK) {
            this._router.navigate(['profile']);
          }
        })
      )
      .subscribe(
        (user) => {
          responseOK = true;
          this.user.access_token = user.access_token;
          this.localStorageService.set('access_token', user.access_token);
          this.localStorageService.set('user_id', user.user_id);
          this.localStorageService.set('mode', 'user');
        },
        (error) => {
          console.log('Error es ', error);
          responseOK = false;
          errorResponse = error.error;
        }
      );
  }
}
