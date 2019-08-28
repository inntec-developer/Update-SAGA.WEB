
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl, MatTableModule, MatInputModule, MatIconModule } from '@angular/material';
import { PaginationConfig, PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoverModule, TooltipModule } from 'ngx-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { getSpanishPaginatorBtp, getSpanishPaginatorIntl } from '../../core/translator/config-paginator/config-paginator.component';

import { Error404Component } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';
import { HttpClientModule } from '@angular/common/http';
import { InicioKioscoComponent } from './inicio-kiosco/inicio-kiosco.component';
import { LockComponent } from './lock/lock.component';
import { LoginComponent, DialogOverviewExampleDialog } from './login/login.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { NgModule } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { RecoverComponent } from './recover/recover.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../../shared/shared.module';
import { SistTicketsModule } from './../SistTickets/sist-tickets.module';
import { TicketsInicioComponent } from './tickets-inicio/tickets-inicio.component';
import { TrackingVacantesComponent } from './tracking-vacantes/tracking-vacantes.component';
import { VerTurnosComponent } from './ver-turnos/ver-turnos.component';
import { ComponentsModule } from '../../components/components.module';

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
        MatInputModule,
        MatIconModule,
        Ng2TableModule,
        PaginationModule.forRoot(),
        TooltipModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        NgScrollbarModule,
        HttpClientModule,
        SistTicketsModule, 
        ComponentsModule
    ],
    declarations: [
        LoginComponent,
        DialogOverviewExampleDialog,
        RegisterComponent,
        RecoverComponent,
        LockComponent,
        MaintenanceComponent,
        Error404Component,
        Error500Component,
        TrackingVacantesComponent,
        TicketsInicioComponent,
        VerTurnosComponent,
        InicioKioscoComponent
    ],
    providers: [
        { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
        { provide: PaginationConfig, useValue: getSpanishPaginatorBtp()}
        ],
    entryComponents: [DialogOverviewExampleDialog],
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
    ],

})
export class PagesModule { }
