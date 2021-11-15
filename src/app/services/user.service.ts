import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private urlGymfit: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = 'register';
    this.urlGymfit = 'http://localhost:3100/' + this.controller;
  }

  register(user: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(this.urlGymfit, user);
  }

  updateUser(userId: string, user: UserDTO): Observable<UserDTO> {
    return this.http.put<UserDTO>(this.urlGymfit + '/' + userId, user);
  }

  getUSerById(userId: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(this.urlGymfit + '/' + userId);
  }
}
