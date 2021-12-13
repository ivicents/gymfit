import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private urlGymfit: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = 'workout';
    this.urlGymfit = 'http://localhost:3100/' + this.controller;
  }

  deleteWorkout(workoutId: string): Observable<any> {
    return this.http.delete<any>(this.urlGymfit, { body: { workoutId } });
  }
}
