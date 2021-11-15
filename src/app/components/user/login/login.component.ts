import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthDTO } from 'src/app/models/auth.dto';
import { AuthService } from 'src/app/services/auth.service';
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
    private _route: ActivatedRoute,
    private _router: Router
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

  onSubmit() {
    console.log(this.user);

    // this._userservice.signin(this.user).subscribe(
    //   (response) => {
    //     if (response.status != 'error') {
    //       this.status = 'success';
    //       //token
    //       this.token = response;
    //       localStorage.setItem('token', this.token);

    //       //Objeto usuario identificado
    //       this._userservice.signin(this.user, true).subscribe(
    //         (response) => {
    //           this.identity = response;
    //           localStorage.setItem('identity', JSON.stringify(this.identity));
    //           this._router.navigate(['dashboard']);
    //         },
    //         (error) => {
    //           console.log(<any>error);
    //         }
    //       );
    //     } else {
    //       this.status = 'error';
    //     }
    //   },
    //   (error) => {
    //     console.log(<any>error);
    //   }
    // );
  }

  async login(): Promise<void> {
    let responseOK: boolean = false;
    let errorResponse: any;

    this.user.email = this.email.value;
    this.user.password = this.password.value;

    this.authService.login(this.user).subscribe(
      (user) => {
        responseOK = true;
        // this.loginUser.access_token = user.access_token;
        // save token to localstorage for next requests
        // this.localStorageService.set('user_id', this.loginUser.user_id);
        // this.localStorageService.set(
        //   'access_token',
        //   this.loginUser.access_token
        // );
        this._router.navigate(['profile']);
      },
      (error) => {
        console.log('Error es ', error);
        responseOK = false;
        errorResponse = error.error;
      }
    );
  }

  login2() {
    // this._route.params.subscribe((params) => {
    //   let signout = +params['sure'];
    //   if (signout == 1) {
    //     localStorage.removeItem('identity');
    //     localStorage.removeItem('token');
    //     this.identity = null;
    //     this.token = null;
    //     //redirección
    //     this._router.navigate(['home']);
    //   }
    // });
  }
}
