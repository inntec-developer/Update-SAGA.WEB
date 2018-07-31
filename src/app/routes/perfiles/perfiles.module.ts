import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { PerfilesComponent } from './perfiles/perfiles.component';

const routes: Routes = [
    { path: 'perfiles', component: PerfilesComponent },
    { path: 'perfiles/:user', component: PerfilesComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [
        PerfilesComponent
    ],
    exports: [
        RouterModule
    ]
})
export class PerfilesModule { }