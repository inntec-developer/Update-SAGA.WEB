import { CatalogosService } from '../../service/catalogos/catalogos.service';
import { ComponentsModule } from '../../components/components.module';
import { NgModule, LOCALE_ID } from '@angular/core';
import { OficinasComponent } from './oficinas/oficinas.component';
import { PreguntasFrecuentesComponent } from './preguntas-frecuentes/preguntas-frecuentes.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CatalogosComponent } from '../../components/catalogos/catalogos.component';

const routes: Routes = [
  { path: 'preguntas', component: PreguntasFrecuentesComponent },
  { path: 'oficinas', component: OficinasComponent },
  { path: 'menucatalogo', component: CatalogosComponent }
];

import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

registerLocaleData(es);

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [PreguntasFrecuentesComponent, OficinasComponent],
  providers: [CatalogosService, { provide: LOCALE_ID, useValue: 'es-ES' }]
})
export class CatalogosModule { }
