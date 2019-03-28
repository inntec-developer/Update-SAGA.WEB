import { RouterModule, Routes } from '@angular/router';

import { ComponentsModule } from './../../components/components.module';
import { HomeComponent } from './home/home.component';
import { NgModule, } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
    { path: '', component: HomeComponent},
];
@NgModule({
    imports: [
      SharedModule,
      RouterModule.forChild(routes),
      ComponentsModule
    ],
    declarations: [
        HomeComponent
    ],
    exports: [
        RouterModule,
    ],
    providers: []
})
export class HomeModule { }
