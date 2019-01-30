import { PaginationConfig, PaginationModule } from 'ngx-bootstrap/pagination';
import { DlgRevisarExamenesComponent } from './../../components/dlg-revisar-examenes/dlg-revisar-examenes.component';

import { SharedModule } from './../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExamenComponent } from './add-examen/add-examen.component';
import { MatInputModule, MatSelectModule, MatRadioModule, MatDialogModule,  MatDividerModule, MatPaginatorIntl } from '@angular/material';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { AsignarExamenComponent } from './asignar-examen/asignar-examen.component';
import { RequisicionesService } from '../../service';
import { ContestarExamenComponent } from './contestar-examen/contestar-examen.component';
import { RevisarExamenesComponent } from './revisar-examenes/revisar-examenes.component';
import { AsignarPsicometricosComponent } from './asignar-psicometricos/asignar-psicometricos.component';
import { getSpanishPaginatorBtp, getSpanishPaginatorIntl } from '../../core/translator/config-paginator/config-paginator.component';
import { AgregarResultadosPsicoComponent } from './agregar-resultados-psico/agregar-resultados-psico.component';
import { HistorialClavesComponent } from './historial-claves/historial-claves.component';



const routes: Routes = [
  { path: 'addexamen', component: AddExamenComponent },
  { path: 'asignar', component: AsignarExamenComponent },
  { path: 'contestar', component: ContestarExamenComponent},
  { path: 'revisar', component: RevisarExamenesComponent},
  { path: 'asignarClaves', component: AsignarPsicometricosComponent},
  { path: 'agregarResultPsico', component: AgregarResultadosPsicoComponent},
  { path: 'historialClaves', component: HistorialClavesComponent}
  
];

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
    MatSelectModule, 
    MatInputModule,
    ToasterModule, 
    MatRadioModule,
    MatDialogModule,
    MatDividerModule,
    PaginationModule.forRoot()
  ],
  declarations: [
    AddExamenComponent,
    AsignarExamenComponent,
    ContestarExamenComponent,
    RevisarExamenesComponent,
    DlgRevisarExamenesComponent,
    AsignarPsicometricosComponent,
    AgregarResultadosPsicoComponent,
    HistorialClavesComponent
  ],
  exports: [
    RouterModule
],
providers:[ToasterService, RequisicionesService,
  {provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
  { provide: PaginationConfig, useValue: getSpanishPaginatorBtp()}],
entryComponents:[DlgRevisarExamenesComponent]

})
export class ExamenesModule {
 }
