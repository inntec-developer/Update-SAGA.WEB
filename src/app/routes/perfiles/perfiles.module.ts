import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';


import { NgModule } from '@angular/core';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { pipe } from '@angular/core/src/render3/pipe';

const routes: Routes = [
    { path: 'perfil', component: PerfilesComponent },
    { path: 'perfiles/:user', component: PerfilesComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ],
    declarations: [
        PerfilesComponent
    ],
    exports: [
        RouterModule
    ]
})
export class PerfilesModule { }