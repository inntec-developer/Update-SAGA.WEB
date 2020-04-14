import { ConfiguracionService } from './../../service/DisenioVacante/configuracion.service';
import { CatalogosService } from './../../service/catalogos/catalogos.service';
import { ButtonsPostulacionesComponent } from './../../components/buttons-postulaciones/buttons-postulaciones.component';
import { EditarContratadosComponent } from './../../components/editar-contratados/editar-contratados.component';
import { InformeVacantesComponent } from './../../components/informe-vacantes/informe-vacantes.component';
import { DtDamfoComponent } from './../vtas/requisiciones/components/dt-damfo/dt-damfo.component';
import { VacantesComponent } from './vacantes/vacantes.component';
import { RouterModule, Routes } from '@angular/router';
import { AutorizarFacturasPuroComponent } from '../../components/tablas/autorizar-facturas-puro/autorizar-facturas-puro.component';
import { CandidatosComponent } from './candidatos/candidatos.component';
import { ComponentsModule } from '../../components/components.module';
import { DialogAssingRequiComponent } from './vacantes/vacantes/components/dialogs/dialog-assing-requi/dialog-assing-requi.component';
import { DialogShowRequiComponent } from './vacantes/vacantes/components/dialogs/dialog-show-requi/dialog-show-requi.component';
import { DialogcandidatosComponent } from './candidatos/dt-candidatos/dialogcandidatos/dialogcandidatos.component';
import { DisenadorComponent } from './disenador/disenador.component';
import { DisenadorVacanteComponent } from './vacantes/disenador-vacante/disenador-vacante.component';
import { DlgTransferComponent } from './../vtas/requisiciones/components/dlg-transfer/dlg-transfer.component';
import { DtCandidatosComponent } from './candidatos/dt-candidatos/dt-candidatos.component';
import { DtCandidatosPostComponent } from './vacantes/vacantes/components/dt-candidatos-post/dt-candidatos-post.component';
import { DtVacantesReclutadorComponent } from './vacantes/vacantes/components/dt-vacantes-reclutador/dt-vacantes-reclutador.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ShowVacanteReclutadorComponent } from './show-vacante-reclutador/show-vacante-reclutador.component';
import { ToolsModule } from '../../tools/tools.module';
import { VacantesPostulateComponent } from './vacantes/vacantes/vacantes-postulate/vacantes-postulate.component';
import { VentaModule } from '../vtas/ventas.module';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM/DD',
  },
  display: {

    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'YYYY/MM/DD',
    monthYearA11yLabel: 'MM YYYY',
  },
};
const routes: Routes = [
  { path: '290', component: DtDamfoComponent },
  { path: 'candidatos', component: CandidatosComponent },
  { path: 'vacantes', component: VacantesComponent, },
  { path: 'configuracionVacante/:Requi/:Folio/:VBtra', component: DisenadorComponent },
  // { path: 'configuracionVacante/:Requi/:Folio/:VBtra', component: DisenadorVacanteComponent },
  { path: 'vacantesReclutador', component: DtVacantesReclutadorComponent, data: { componente: 'Vacantes' } },
  { path: 'vacantesReclutador/:folio', component: DtVacantesReclutadorComponent, data: { componente: 'Vacantes' } },
  { path: 'postulados/:VacanteId/:Folio/:VBtra', component: DtVacantesReclutadorComponent, data: { componente: 'Vacantes' } },
  // tslint:disable-next-line: max-line-length
  { path: 'gestionVacante', component: ButtonsPostulacionesComponent, data: { componente: 'Vacantes' } },
  { path: 'editarContratados', component: EditarContratadosComponent},
  { path: 'autorizarRequi', component: AutorizarFacturasPuroComponent},
  { path: 'showVacanteReclutador/:Folio', component: ShowVacanteReclutadorComponent},
  { path: 'informeVacantes', component: InformeVacantesComponent}
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
    CandidatosComponent,
    DtCandidatosComponent,
    DialogcandidatosComponent,
    DisenadorVacanteComponent,
    DtVacantesReclutadorComponent,
    DialogShowRequiComponent,
    DialogAssingRequiComponent,
    DtCandidatosPostComponent,
    VacantesPostulateComponent,
    DlgTransferComponent,
    ShowVacanteReclutadorComponent,
    DisenadorComponent,
    VacantesComponent
    ],
    providers: [CatalogosService, ConfiguracionService,  { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
  entryComponents: [
    DialogcandidatosComponent, DialogShowRequiComponent, DialogAssingRequiComponent, DlgTransferComponent],
  exports: [RouterModule, DialogShowRequiComponent, DlgTransferComponent ]
})

export class ReclutamientoModule { }
