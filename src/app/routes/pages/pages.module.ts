import { Error404Component } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { NgModule } from '@angular/core';
import { RecoverComponent } from './recover/recover.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../../shared/shared.module';
import { TrackingVacantesComponent } from './tracking-vacantes/tracking-vacantes.component';
import { VacantesComponent } from './../Tracking/vacantes/vacantes.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    RecoverComponent,
    LockComponent,
    MaintenanceComponent,
    Error404Component,
    Error500Component,
    VacantesComponent,
    TrackingVacantesComponent
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    RecoverComponent,
    LockComponent,
    MaintenanceComponent,
    Error404Component,
    Error500Component,
    TrackingVacantesComponent
  ]
})
export class PagesModule { }
