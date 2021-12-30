import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncidenceService {
  private urlGymfit: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = 'incidence';
    this.urlGymfit = 'http://13.38.93.235:3100/' + this.controller;
  }

  sendIncidence(
    incidence: string,
    userId: string | null,
    monitorId: string | null
  ): Observable<void> {
    return this.http.post<void>(this.urlGymfit, {
      idUser: userId,
      idMonitor: monitorId,
      text: incidence,
    });
  }
}
