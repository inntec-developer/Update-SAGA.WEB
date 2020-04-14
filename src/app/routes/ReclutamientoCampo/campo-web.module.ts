import { DlgRegistroMasivoComponent } from './../../components/dlg-registro-masivo/dlg-registro-masivo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebCampoComponent } from './web-campo/web-campo.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ToolsModule } from '../../tools/tools.module';
import { ComponentsModule } from './../../components/components.module';
import { VacantesReclutadorComponent } from './vacantes-reclutador/vacantes-reclutador.component';
import { RportCandidatosComponent } from './rport-candidatos/rport-candidatos.component';
import { DlgEditarCandidatosComponent } from './dlg-editar-candidatos/dlg-editar-candidatos.component';
import { AdminReclutadoresCampoComponent } from './admin-reclutadores-campo/admin-reclutadores-campo.component';
import { ModalInfoVacanteComponent } from './vacantes-reclutador/modal-info-vacante/modal-info-vacante.component';

const routes: Routes = [
  { path: 'inicio', component: WebCampoComponent },
  { path: 'rportCandidatos', component: RportCandidatosComponent },
  { path: 'reclutadorvacantes', component: VacantesReclutadorComponent },
  { path: 'adminreclutadores', component: AdminReclutadoresCampoComponent },
  { path: 'registro', component: DlgRegistroMasivoComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ToolsModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    WebCampoComponent,
    VacantesReclutadorComponent,
    RportCandidatosComponent,
    DlgEditarCandidatosComponent,
    AdminReclutadoresCampoComponent,
    ModalInfoVacanteComponent],
  exports: [
    RouterModule,
    DlgEditarCandidatosComponent,
    ModalInfoVacanteComponent
  ],
  entryComponents: [DlgEditarCandidatosComponent]
})
export class CampoWebModule { }
