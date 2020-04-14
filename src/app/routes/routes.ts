import { ContactComponent } from './pages/contact/contact.component';
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
        canActivate: [LogInGuardGuard],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full'},
            { path: '**', redirectTo: '404' },
            { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
            { path: 'reclutamiento', loadChildren: () => import('./recl/reclutamiento.module').then(m => m.ReclutamientoModule)},
            { path: 'ventas', loadChildren: () => import('./vtas/ventas.module').then(m => m.VentaModule)},
            { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
            { path: 'usuario', loadChildren: () => import('./perfiles/perfiles.module').then(m => m.PerfilesModule)},
            { path: 'examenes', loadChildren: () => import('./Examenes/examenes.module').then(m => m.ExamenesModule)},
            { path: 'catalogos', loadChildren: () => import('./catalogos/catalogos.module').then(m => m.CatalogosModule)},
            { path: 'reporte', loadChildren: () => import('./reportes/reportes.module').then(m => m.ReportesModule)},
            { path: 'tickets', loadChildren: () => import('./SistTickets/sist-tickets.module').then(m => m.SistTicketsModule)},
            { path: 'equipos', loadChildren: () => import('./EquiposDeTrabajo/equipos.module').then(m => m.EquiposModule)},
            {path: 'webcampo', loadChildren: () => import('./ReclutamientoCampo/campo-web.module').then(m => m.CampoWebModule)},
        ]},
        // {path: 'pages', loadChildren: './pages/pages.module#PagesModule'},
        // { path: 'login', redirectTo: 'pages/login' },
        // { path: 'login/:Folio', redirectTo: 'pages/login/:Folio'},
        // { path: 'register', redirectTo: 'pages/registro' },
        // { path: 'trackingvacantes', redirectTo: 'pages/TrackingVacantes'},
        // { path: 'Verturnos', redirectTo: 'pages/verturnos' },
        // { path: 'Principal', redirectTo: 'pages/Principal'},
        // { path: 'contactanos', redirectTo: 'pages/contactanos'},
    { path: 'login', component: LoginComponent },
    { path: 'login/:Folio', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
   // { path: 'recover', component: RecoverComponent },
   // { path: 'lock', component: LockComponent },
   // { path: 'maintenance', component: MaintenanceComponent },
   { path: '404', component: Error404Component },
   // { path: '500', component: Error500Component },
   { path: 'trackingvacantes', component: TrackingVacantesComponent },
    { path: 'Tickets', component: TicketsInicioComponent },
    { path: 'VerTurno', component: VerTurnosComponent},
    { path: 'Kiosco', component: InicioKioscoComponent},


    // Not found
];
