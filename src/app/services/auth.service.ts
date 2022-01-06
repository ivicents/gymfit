import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthDTO } from '../models/auth.dto';

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
    this.urlGymfit = 'https://gymfit-uoc.es:3101/' + this.controller;
  }

  login({ email, password }: AuthDTO): Observable<AuthToken> {
    return this.http.post<AuthToken>(this.urlGymfit, { email, password }).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  loginMonitor({ email, password }: AuthDTO): Observable<AuthToken> {
    return this.http
      .post<AuthToken>(this.urlGymfit + '/monitor', { email, password })
      .pipe(
        map((resp: any) => {
          return resp;
        })
      );
  }
}
