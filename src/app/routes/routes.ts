import { CanActivate, CanActivateChild } from '@angular/router';

import { AuthRolesGuard } from './../auth-guard/auth-roles.guard';
import { Component } from '@angular/core';
import { Error404Component } from './pages/error404/error404.component';
import { Error500Component } from './pages/error500/error500.component';
import { LayoutComponent } from '../layout/layout.component';
import { LockComponent } from './pages/lock/lock.component';
import { LogInGuardGuard } from './../auth-guard/log-in-guard.guard';
import { LoginComponent } from './pages/login/login.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { RecoverComponent } from './pages/recover/recover.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes = [

        {
        path: '',
        component: LayoutComponent, canActivate:[LogInGuardGuard],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full'},
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'reclutamiento', loadChildren: './recl/reclutamiento.module#ReclutamientoModule'},
            { path: 'ventas', loadChildren: './vtas/ventas.module#VentaModule'},
            { path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
            { path: 'perfiles', loadChildren: './perfiles/perfiles.module#PerfilesModule'}
            
        ]},




    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'recover', component: RecoverComponent },
    { path: 'lock', component: LockComponent },
    { path: 'maintenance', component: MaintenanceComponent },
    { path: '404', component: Error404Component },
    { path: '500', component: Error500Component },

    // Not found
    { path: '**', redirectTo: '404' }
];
