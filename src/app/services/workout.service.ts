import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseDTO } from '../models/exercise.dto';
import { WorkoutDTO } from '../models/workout.dto';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private urlGymfit: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = 'workout';
    this.urlGymfit = 'http://13.38.93.235:3100/' + this.controller;
  }

  deleteWorkout(workoutId: string): Observable<any> {
    return this.http.delete<any>(this.urlGymfit, { body: { workoutId } });
  }

  getWorkoutWithExercises(workoutId: string): Observable<WorkoutDTO> {
    return this.http.get<WorkoutDTO>(this.urlGymfit + '/' + workoutId);
  }

  getExercises(): Observable<ExerciseDTO[]> {
    return this.http.get<ExerciseDTO[]>('http://13.38.93.235:3100/exercise');
  }

  addExerciseToWorkout(
    workoutId: string,
    exerciseId: string
  ): Observable<void> {
    return this.http.post<void>(this.urlGymfit + '/addExercise', {
      workoutId,
      exerciseId,
    });
  }

  deleteExerciseToWorkout(
    workoutId: string,
    exerciseId: string
  ): Observable<any> {
    return this.http.delete<any>(
      this.urlGymfit + '/' + workoutId + '/exercise/' + exerciseId
    );
  }

  createWorkout(workoutName: string, monitorId: string): Observable<any> {
    return this.http.post<any>(this.urlGymfit, {
      workoutName,
      monitorId,
    });
  }
}
