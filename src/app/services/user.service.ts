import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/user.dto';
import { WorkoutDTO } from '../models/workout.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private urlGymfit: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = 'user';
    this.urlGymfit = 'https://gymfit-uoc.es:3101/' + this.controller;
  }

  register(user: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>('https://gymfit-uoc.es:3101/register', user);
  }

  updateUser(userId: string, user: UserDTO): Observable<UserDTO> {
    return this.http.put<UserDTO>(this.urlGymfit + '/' + userId, user);
  }

  getUSerById(userId: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(this.urlGymfit + '/' + userId);
  }

  getUserWorkout(userId: string): Observable<WorkoutDTO> {
    return this.http.get<WorkoutDTO>(
      'https://gymfit-uoc.es:3101/workout/user' + '/' + userId
    );
  }

  startWorkout(userId: string, workoutId: string): Observable<void> {
    return this.http.post<any>(this.urlGymfit + '/startWorkout', {
      userId,
      workoutId,
    });
  }
  stopWorkout(userId: string, workoutId: string): Observable<void> {
    return this.http.post<any>(this.urlGymfit + '/stopWorkout', {
      userId,
      workoutId,
    });
  }

  updateUserWorkout(userId: string, workoutId: string): Observable<void> {
    return this.http.put<void>(
      this.urlGymfit + '/' + userId + '/updateWorkout',
      { workoutId }
    );
  }

  getUSerStatistics(userId: string): Observable<any> {
    return this.http.get<any>(this.urlGymfit + '/' + userId + '/statistics');
  }
}
