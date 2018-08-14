import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ViewChild } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { CustomFormsModule } from 'ng2-validation';
import { HomeComponent } from './home/home.component';
import { NgxSelectModule } from 'ngx-select-ex'

const routes: Routes = [
    { path: '', component: HomeComponent},
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        NgxSelectModule,
        FormsModule,
        ReactiveFormsModule,
        CustomFormsModule,
        CommonModule,
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