import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IncidencesMonitorComponent } from './components/monitor/incidences-monitor/incidences-monitor.component';
import { LoginMonitorComponent } from './components/monitor/login-monitor/login-monitor.component';
import { ProfileMonitorComponent } from './components/monitor/profile-monitor/profile-monitor.component';
import { UsersMonitorComponent } from './components/monitor/users-monitor/users-monitor.component';
import { WorkoutsMonitorComponent } from './components/monitor/workouts-monitor/workouts-monitor.component';
import { IncidencesComponent } from './components/user/incidences/incidences.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { StatisticsComponent } from './components/user/statistics/statistics.component';
import { WorkoutsComponent } from './components/user/workouts/workouts.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    WorkoutsComponent,
    StatisticsComponent,
    IncidencesComponent,
    IncidencesMonitorComponent,
    WorkoutsMonitorComponent,
    UsersMonitorComponent,
    ProfileMonitorComponent,
    LoginMonitorComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
