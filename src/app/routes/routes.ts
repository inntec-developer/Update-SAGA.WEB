import { Error404Component } from './pages/error404/error404.component';
import { Error500Component } from './pages/error500/error500.component';
import { InicioKioscoComponent } from './pages/inicio-kiosco/inicio-kiosco.component';
import { LayoutComponent } from '../layout/layout.component';
import { LockComponent } from './pages/lock/lock.component';
import { LogInGuardGuard } from '../auth-guard/log-in-guard.guard';
import { LoginComponent } from './pages/login/login.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { RecoverComponent } from './pages/recover/recover.component';
import { RegisterComponent } from './pages/register/register.component';
import { TicketsInicioComponent } from './pages/tickets-inicio/tickets-inicio.component';
import { TrackingVacantesComponent } from './pages/tracking-vacantes/tracking-vacantes.component';
import { VerTurnosComponent } from './pages/ver-turnos/ver-turnos.component';

export const routes = [

        {
        path: '',
        component: LayoutComponent,
        canActivate:[LogInGuardGuard],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full'},
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'reclutamiento', loadChildren: './recl/reclutamiento.module#ReclutamientoModule'},
            { path: 'ventas', loadChildren: './vtas/ventas.module#VentaModule'},
            { path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
            { path: 'usuario', loadChildren: './perfiles/perfiles.module#PerfilesModule'},
            { path: 'examenes', loadChildren: './Examenes/examenes.module#ExamenesModule'},
            { path: 'catalogos', loadChildren: './catalogos/catalogos.module#CatalogosModule'},
            { path: 'reporte', loadChildren:'./reportes/reportes.module#ReportesModule'},
            { path: 'tickets', loadChildren: './SistTickets/sist-tickets.module#SistTicketsModule'}
        ]},




    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'recover', component: RecoverComponent },
    { path: 'lock', component: LockComponent },
    { path: 'maintenance', component: MaintenanceComponent },
    { path: '404', component: Error404Component },
    { path: '500', component: Error500Component },
    { path: 'TrackingVacantes', component: TrackingVacantesComponent },
    { path: 'Tickets', component: TicketsInicioComponent },
    { path: 'VerTurno', component: VerTurnosComponent},
    { path: 'Principal', component: InicioKioscoComponent},


    // Not found
    { path: '**', redirectTo: '404' }
];
