import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MonitorDTO } from '../models/monitor.dto';
import { UserDTO } from '../models/user.dto';
import { WorkoutDTO } from '../models/workout.dto';

@Injectable({
  providedIn: 'root',
})
export class MonitorService {
  private urlGymfit: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = 'monitor';
    this.urlGymfit = 'https://gymfit-uoc.es:3101/' + this.controller;
  }

  updateMonitor(
    monitorId: string,
    monitor: MonitorDTO
  ): Observable<MonitorDTO> {
    return this.http.put<MonitorDTO>(this.urlGymfit + '/' + monitorId, monitor);
  }

  getMonitorById(monitorId: string): Observable<MonitorDTO> {
    return this.http.get<MonitorDTO>(this.urlGymfit + '/' + monitorId);
  }

  getMonitorUsers(monitorId: string): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(
      this.urlGymfit + '/' + monitorId + '/users'
    );
  }

  getMonitorWorkouts(monitorId: string): Observable<WorkoutDTO[]> {
    return this.http.get<WorkoutDTO[]>(
      this.urlGymfit + '/' + monitorId + '/workouts'
    );
  }
}
