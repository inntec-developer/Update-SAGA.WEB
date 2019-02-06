import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreguntasFrecuentesComponent } from './preguntas-frecuentes/preguntas-frecuentes.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'preguntas', component: PreguntasFrecuentesComponent}

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [PreguntasFrecuentesComponent]
})
export class CatalogosModule { }
