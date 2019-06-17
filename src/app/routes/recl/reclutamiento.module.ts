import { DlgTransferComponent } from './../vtas/requisiciones/components/dlg-transfer/dlg-transfer.component';
import { RouterModule, Routes } from '@angular/router';

import { CandidatosComponent } from './candidatos/candidatos.component';
import { ComponentsModule } from '../../components/components.module';
import { Damfo290Component } from './damfo290/damfo290.component';
import { DialogAssingRequiComponent } from './vacantes/vacantes/components/dialogs/dialog-assing-requi/dialog-assing-requi.component';
import { DialogShowRequiComponent } from './vacantes/vacantes/components/dialogs/dialog-show-requi/dialog-show-requi.component';
import { DialogcandidatosComponent } from './candidatos/dt-candidatos/dialogcandidatos/dialogcandidatos.component';
import { DisenadorVacanteComponent } from './vacantes/disenador-vacante/disenador-vacante.component';
import { DtCandidatosComponent } from './candidatos/dt-candidatos/dt-candidatos.component';
import { DtCandidatosPostComponent } from './vacantes/vacantes/components/dt-candidatos-post/dt-candidatos-post.component';
import { DtVacantesReclutadorComponent } from './vacantes/vacantes/components/dt-vacantes-reclutador/dt-vacantes-reclutador.component';
import { NgModule } from '@angular/core';
import { SeguimientoVacanteComponent } from './vacantes/vacantes/seguimiento-vacante/seguimiento-vacante/seguimiento-vacante.component';
import { SharedModule } from '../../shared/shared.module';
import { ToolsModule } from '../../tools/tools.module';
import { VacantesComponent } from './vacantes/vacantes.component';
import { VacantesPostulateComponent } from './vacantes/vacantes/vacantes-postulate/vacantes-postulate.component';
import { VacantesReclutadorComponent } from './vacantes/vacantes/vacantes-reclutador/vacantes-reclutador.component';
import { VentaModule } from '../vtas/ventas.module';
import { AutorizarFacturasPuroComponent } from '../../components/tablas/autorizar-facturas-puro/autorizar-facturas-puro.component';

const routes: Routes = [
  { path: '290', component: Damfo290Component },
  { path: 'candidatos', component: CandidatosComponent },
  { path: 'vacantes', component: VacantesComponent, },
  { path: 'disenador', component: DisenadorVacanteComponent },
  { path: 'configuracionVacante/:Requi/:Folio/:VBtra', component: DisenadorVacanteComponent },
  { path: 'vacantesReclutador', component: VacantesReclutadorComponent, data: { componente: 'Vacantes' } },
  { path: 'postulados/:VacanteId/:Folio/:VBtra', component: VacantesPostulateComponent, data: { componente: 'Vacantes' } },
  { path: 'gestionVacante/:VacanteId/:Folio/:VBtra/:ClienteId/:enProceso/:estatusId', component: SeguimientoVacanteComponent, data: { componente: 'Vacantes' } },
  { path: 'autorizarRequi', component: AutorizarFacturasPuroComponent}

];

@NgModule({
  imports: [
    SharedModule,
    ToolsModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    VentaModule,
  ],
  declarations: [
    Damfo290Component,
    CandidatosComponent,
    VacantesComponent,
    DtCandidatosComponent,
    DialogcandidatosComponent,
    DisenadorVacanteComponent,
    DtVacantesReclutadorComponent,
    VacantesReclutadorComponent,
    DialogShowRequiComponent,
    DialogAssingRequiComponent,
    DtCandidatosPostComponent,
    VacantesPostulateComponent,
    SeguimientoVacanteComponent,
    DlgTransferComponent
    ],
  entryComponents: [
    DialogcandidatosComponent, DialogShowRequiComponent, DialogAssingRequiComponent, DlgTransferComponent],
  exports: [RouterModule, DialogShowRequiComponent,DlgTransferComponent ]
})

export class ReclutamientoModule { }
