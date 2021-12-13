import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidencesMonitorComponent } from './components/monitor/incidences-monitor/incidences-monitor.component';
import { LoginMonitorComponent } from './components/monitor/login-monitor/login-monitor.component';
import { ProfileMonitorComponent } from './components/monitor/profile-monitor/profile-monitor.component';
import { UsersMonitorComponent } from './components/monitor/users-monitor/users-monitor.component';
import { WorkoutsMonitorFormComponent } from './components/monitor/workouts-monitor-form/workouts-monitor-form.component';
import { WorkoutsMonitorComponent } from './components/monitor/workouts-monitor/workouts-monitor.component';
import { IncidencesComponent } from './components/user/incidences/incidences.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { StatisticsComponent } from './components/user/statistics/statistics.component';
import { WorkoutsComponent } from './components/user/workouts/workouts.component';
import { AuthGuard } from './guards/auth.guards';
//import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'workouts',
    component: WorkoutsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'incidences',
    component: IncidencesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'monitor/login',
    component: LoginMonitorComponent,
  },
  {
    path: 'monitor/profile',
    component: ProfileMonitorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'monitor/users',
    component: UsersMonitorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'monitor/workouts',
    component: WorkoutsMonitorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'monitor/workouts/form/:id',
    component: WorkoutsMonitorFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'monitor/workouts/form',
    component: WorkoutsMonitorFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'monitor/incidences',
    component: IncidencesMonitorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
