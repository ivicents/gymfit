import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDTO } from '../models/user.dto';

interface AuthToken {
  user_id: string;
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlGymfit: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = 'login';
    this.urlGymfit = 'http://localhost:3100/' + this.controller;
  }

  login(auth: UserDTO): Observable<AuthToken> {
    return this.http.post<AuthToken>(this.urlGymfit, auth).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  login2(username: string, password: string): Observable<AuthToken> {
    return this.http.post(this.urlGymfit, { username, password }).pipe(
      map((resp: any) => {
        //this.userStore.token = resp.token;
        return resp;
      })
    );
  }
}
