import { SharedModule } from './../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExamenComponent } from './add-examen/add-examen.component';

const routes: Routes = [
  { path: 'addexamen', component: AddExamenComponent },
  
];

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AddExamenComponent
  ],
  exports: [
    RouterModule
]
})
export class ExamenesModule {
 }
