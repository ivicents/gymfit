import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MonitorDTO } from '../models/monitor.dto';

@Injectable({
  providedIn: 'root',
})
export class MonitorService {
  private urlGymfit: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = 'monitor';
    this.urlGymfit = 'http://localhost:3100/' + this.controller;
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
}
