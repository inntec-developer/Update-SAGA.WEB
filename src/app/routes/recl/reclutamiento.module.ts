import { RouterModule, Routes } from '@angular/router';

import { AreaExpComponent } from './candidatos/busqueda/area-exp/area-exp.component';
import { BusquedaComponent } from './candidatos/busqueda/busqueda.component';
import { CandidatosComponent } from './candidatos/candidatos.component';
import { ColoniaComponent } from './candidatos/busqueda/colonia/colonia.component';
import { ComponentsModule } from '../../components/components.module';
import { CpComponent } from './candidatos/busqueda/cp/cp.component';
import { Damfo290Component } from './damfo290/damfo290.component';
import { DialogAssingRequiComponent } from './vacantes/vacantes/components/dialogs/dialog-assing-requi/dialog-assing-requi.component';
import { DialogShowRequiComponent } from './vacantes/vacantes/components/dialogs/dialog-show-requi/dialog-show-requi.component';
import { DialogcandidatosComponent } from './candidatos/dt-candidatos/dialogcandidatos/dialogcandidatos.component';
import { DisenadorVacanteComponent } from './vacantes/disenador-vacante/disenador-vacante.component';
import { DtCandidatosComponent } from './candidatos/dt-candidatos/dt-candidatos.component';
import { DtCandidatosPostComponent } from './vacantes/vacantes/components/dt-candidatos-post/dt-candidatos-post.component';
import { DtVacantesComponent } from './candidatos/dt-vacantes/dt-vacantes.component';
import { DtVacantesReclutadorComponent } from './vacantes/vacantes/components/dt-vacantes-reclutador/dt-vacantes-reclutador.component';
import { EdadComponent } from './candidatos/busqueda/edad/edad.component';
import { EstadoComponent } from './candidatos/busqueda/estado/estado.component';
import { GeneroComponent } from './candidatos/busqueda/genero/genero.component';
import { IdiomasComponent } from './candidatos/busqueda/idiomas/idiomas.component';
import { MunicipioComponent } from './candidatos/busqueda/municipio/municipio.component';
import { NgModule } from '@angular/core';
import { NivestudiosComponent } from './candidatos/busqueda/nivestudios/nivestudios.component';
import { PaisComponent } from './candidatos/busqueda/pais/pais.component';
import { PcondiscapacidadComponent } from './candidatos/busqueda/pcondiscapacidad/pcondiscapacidad.component';
import { PerfilComponent } from './candidatos/busqueda/perfil/perfil.component';
import { ReubicacionComponent } from './candidatos/busqueda/reubicacion/reubicacion.component';
import { SeguimientoVacanteComponent } from './vacantes/vacantes/seguimiento-vacante/seguimiento-vacante/seguimiento-vacante.component';
import { SharedModule } from '../../shared/shared.module';
import { TplicenciaComponent } from './candidatos/busqueda/tplicencia/tplicencia.component';
import { VacantesComponent } from './vacantes/vacantes.component';
import { VacantesPostulateComponent } from './vacantes/vacantes/vacantes-postulate/vacantes-postulate.component';
import { VacantesReclutadorComponent } from './vacantes/vacantes/vacantes-reclutador/vacantes-reclutador.component';
import { VehpropioComponent } from './candidatos/busqueda/vehpropio/vehpropio.component';
import { VentaModule } from '../vtas/ventas.module';

const routes: Routes = [
  { path: '290', component: Damfo290Component },
  { path: 'candidatos', component: CandidatosComponent },
  { path: 'vacantes', component: VacantesComponent, },
  { path: 'disenador', component: DisenadorVacanteComponent },
  { path: 'configuracionVacante/:Requi/:Folio/:VBtra', component: DisenadorVacanteComponent },
  { path: 'vacantesReclutador', component: VacantesReclutadorComponent, data: { componente: 'Vacantes' } },
  { path: 'postulados/:VacanteId/:Folio/:VBtra', component: VacantesPostulateComponent, data: { componente: 'Vacantes' } },
  { path: 'gestionVacante/:VacanteId/:Folio/:VBtra/:ClienteId/:enProceso/:estatusId', component: SeguimientoVacanteComponent, data: { componente: 'Vacantes' } }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    VentaModule,
  ],
  declarations: [
    Damfo290Component,
    CandidatosComponent,
    VacantesComponent,
    BusquedaComponent,
    PaisComponent,
    EstadoComponent,
    MunicipioComponent,
    ColoniaComponent,
    AreaExpComponent,
    CpComponent,
    GeneroComponent,
    EdadComponent,
    ReubicacionComponent,
    PcondiscapacidadComponent,
    TplicenciaComponent,
    VehpropioComponent,
    NivestudiosComponent,
    IdiomasComponent,
    PerfilComponent,
    DtVacantesComponent,
    DtCandidatosComponent,
    DialogcandidatosComponent,
    DisenadorVacanteComponent,
    DtVacantesReclutadorComponent,
    VacantesReclutadorComponent,
    DialogShowRequiComponent,
    DialogAssingRequiComponent,
    DtCandidatosPostComponent,
    VacantesPostulateComponent,
    SeguimientoVacanteComponent],
  entryComponents: [
    DialogcandidatosComponent, DialogShowRequiComponent, DialogAssingRequiComponent],
  exports: [RouterModule, DialogShowRequiComponent]
})

export class ReclutamientoModule { }
