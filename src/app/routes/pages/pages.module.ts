import { SistTicketsModule } from './../SistTickets/sist-tickets.module';
import { VacantesComponent } from './../Tracking/vacantes/vacantes.component';
import { getSpanishPaginatorBtp, getSpanishPaginatorIntl } from '../../core/translator/config-paginator/config-paginator.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatPaginatorIntl, MatTableModule } from '@angular/material';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PopoverModule, TooltipModule } from 'ngx-bootstrap';
import { PaginationConfig, PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverComponent } from './recover/recover.component';
import { LockComponent } from './lock/lock.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { Error404Component } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';
import { TrackingVacantesComponent } from './tracking-vacantes/tracking-vacantes.component';
import { TicketsInicioComponent } from './tickets-inicio/tickets-inicio.component';




/* Use this routes definition in case you want to make them lazy-loaded */
// const routes: Routes = [
//     { path: 'login', component: LoginComponent },
//     { path: 'register', component: RegisterComponent },
//     { path: 'recover', component: RecoverComponent },
//     { path: 'lock', component: LockComponent },
//     { path: 'maintenance', component: MaintenanceComponent },
//     { path: '404', component: Error404Component },
//     { path: '500', component: Error500Component },
//      { path: 'TrackingVacantes', component:TrackingVacantesComponent},
// ];

@NgModule({
    imports: [
        SharedModule,
        //  RouterModule.forChild(routes),
        MatTableModule,
        Ng2TableModule,
        PaginationModule.forRoot(),
        TooltipModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        NgScrollbarModule,
        HttpClientModule,
        SistTicketsModule
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
        TrackingVacantesComponent,
        TicketsInicioComponent
    ],
    providers: [
        { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
        { provide: PaginationConfig, useValue: getSpanishPaginatorBtp()}
        ],
    exports: [
        RouterModule,
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
