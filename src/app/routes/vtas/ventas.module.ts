import { DTHistorialComponent } from './requisiciones/components/dthistorial/dthistorial.component';
import { DtRequisicionComponent } from './../../components/tablas/dt-requisicion/dt-requisicion.component';
import { RouterModule, Routes } from '@angular/router';
// tslint:disable-next-line: max-line-length
import { ActividadesComponent } from './PerfilReclutamiento/formato-damfo290/formato-anexos/perfil-actividades/actividades/actividades.component';
// tslint:disable-next-line: max-line-length
import { AreasComponent } from './PerfilReclutamiento/formato-damfo290/formato-anexos/perfil-competencias/perfil-areas/areas/areas.component';
// tslint:disable-next-line: max-line-length
import { BeneficiosComponent } from './PerfilReclutamiento/formato-damfo290/formato-anexos/perfil-beneficios/beneficios/beneficios.component';
import { ComponentsModule } from '../../components/components.module';
// tslint:disable-next-line: max-line-length
import { ContactosClienteComponent } from './directorio-empresarial/editar-clientes/Components/contactos-cliente/contactos-cliente.component';
// tslint:disable-next-line: max-line-length
import { CordinalesComponent } from './PerfilReclutamiento/formato-damfo290/formato-anexos/perfil-competencias/perfil-cordinales/cordinales/cordinales.component';
import { CorreosClienteComponent } from './directorio-empresarial/editar-clientes/Components/correos-cliente/correos-cliente.component';
import { DatosGeneralesComponent } from './directorio-empresarial/editar-clientes/Components/datos-generales/datos-generales.component';
import { DialogCancelRequiComponent } from './requisiciones/components/dialog-cancel-requi/dialog-cancel-requi.component';
import { DialogEditHorarioComponent } from '../../components/tablas/dt-horarios/dialog-edit-horario/dialog-edit-horario.component';
import { DialogRutasComponent } from '../../components/tablas/dt-rutas-camion-requi/dialog-rutas/dialog-rutas.component';
import { DialogdamfoComponent } from './requisiciones/components/dialogdamfo/dialogdamfo.component';
import { DireccionautoComponent } from './requisiciones/components/direccionauto/direccionauto.component';
// tslint:disable-next-line: max-line-length
import { DireccionesClienteComponent } from './directorio-empresarial/editar-clientes/Components/direcciones-cliente/direcciones-cliente.component';
import { DirectorioEmpresarialComponent } from './directorio-empresarial/directorio-empresarial.component';
// tslint:disable-next-line: max-line-length
import { DocClienteComponent } from './PerfilReclutamiento/formato-damfo290/formato-anexos/perfil-doc-cliente/doc-cliente/doc-cliente.component';
import { DtClientesComponent } from './directorio-empresarial/clientes/dt-clientes/dt-clientes.component';
import { DtDamfoComponent } from './requisiciones/components/dt-damfo/dt-damfo.component';
import { DtProspectosComponent } from './directorio-empresarial/prospectos/dt-prospectos/dt-prospectos.component';
import { DtRequisicionReclPuroComponent } from './../../components/tablas/dt-requisicion-recl-puro/dt-requisicion-recl-puro.component';
import { EditarClientesComponent } from './directorio-empresarial/editar-clientes/editar-clientes.component';
// tslint:disable-next-line: max-line-length
import { EscolaridadesComponent } from './PerfilReclutamiento/formato-damfo290/formato-requisitos/perfil-escolaridades/escolaridades/escolaridades.component';
import { FormatoAnexosComponent } from './PerfilReclutamiento/formato-damfo290/formato-anexos/formato-anexos.component';
import { FormatoClienteComponent } from './PerfilReclutamiento/formato-damfo290/formato-cliente/formato-cliente.component';
import { FormatoDAMFO290Component } from './PerfilReclutamiento/formato-damfo290/formato-damfo290.component';
import { FormatoRequisitosComponent } from './PerfilReclutamiento/formato-damfo290/formato-requisitos/formato-requisitos.component';
// tslint:disable-next-line: max-line-length
import { GerencialesComponent } from './PerfilReclutamiento/formato-damfo290/formato-anexos/perfil-competencias/perfil-gerenciales/gerenciales/gerenciales.component';
import { HorariosComponent } from './PerfilReclutamiento/formato-damfo290/formato-anexos/perfil-horarios/horarios/horarios.component';
import { NgModule } from '@angular/core';
import { NuevoProspectoComponent } from './directorio-empresarial/prospectos/nuevo-prospecto/nuevo-prospecto.component';
// tslint:disable-next-line: max-line-length
import { ObservacionesComponent } from './PerfilReclutamiento/formato-damfo290/formato-anexos/perfil-observaciones/observaciones/observaciones.component';
// tslint:disable-next-line: max-line-length
import { PerfilActividadesComponent } from './PerfilReclutamiento/formato-damfo290/formato-anexos/perfil-actividades/perfil-actividades.component';
// tslint:disable-next-line: max-line-length
import { PerfilAreasComponent } from './PerfilReclutamiento/formato-damfo290/formato-anexos/perfil-competencias/perfil-areas/perfil-areas.component';
// tslint:disable-next-line: max-line-length
import { PerfilBeneficiosComponent } from './PerfilReclutamiento/formato-damfo290/formato-anexos/perfil-beneficios/perfil-beneficios.component';
// tslint:disable-next-line: max-line-length
import { PerfilCordinalesComponent } from './PerfilReclutamiento/formato-damfo290/formato-anexos/perfil-competencias/perfil-cordinales/perfil-cordinales.component';
// tslint:disable-next-line: max-line-length
import { PerfilDocClienteComponent } from './PerfilReclutamiento/formato-damfo290/formato-anexos/perfil-doc-cliente/perfil-doc-cliente.component';
// tslint:disable-next-line: max-line-length
import { PerfilEscolaridadesComponent } from './PerfilReclutamiento/formato-damfo290/formato-requisitos/perfil-escolaridades/perfil-escolaridades.component';
// tslint:disable-next-line: max-line-length
import { PerfilGerencialesComponent } from './PerfilReclutamiento/formato-damfo290/formato-anexos/perfil-competencias/perfil-gerenciales/perfil-gerenciales.component';
import { PerfilHorariosComponent } from './PerfilReclutamiento/formato-damfo290/formato-anexos/perfil-horarios/perfil-horarios.component';
// tslint:disable-next-line: max-line-length
import { PerfilObservacionesComponent } from './PerfilReclutamiento/formato-damfo290/formato-anexos/perfil-observaciones/perfil-observaciones.component';
// tslint:disable-next-line: max-line-length
import { PerfilPrestacionesComponent } from './PerfilReclutamiento/formato-damfo290/formato-anexos/perfil-prestaciones/perfil-prestaciones.component';
import { PerfilProcesosComponent } from './PerfilReclutamiento/formato-damfo290/formato-anexos/perfil-procesos/perfil-procesos.component';
// tslint:disable-next-line: max-line-length
import { PerfilPstClienteComponent } from './PerfilReclutamiento/formato-damfo290/formato-anexos/perfil-pst-cliente/perfil-pst-cliente.component';
import { PerfilPstDamsaComponent } from './PerfilReclutamiento/formato-damfo290/formato-anexos/perfil-pst-damsa/perfil-pst-damsa.component';
// tslint:disable-next-line: max-line-length
import { PrestacionesComponent } from './PerfilReclutamiento/formato-damfo290/formato-anexos/perfil-prestaciones/prestaciones/prestaciones.component';
import { ProcesosComponent } from './PerfilReclutamiento/formato-damfo290/formato-anexos/perfil-procesos/procesos/procesos.component';
// tslint:disable-next-line: max-line-length
import { PstClienteComponent } from './PerfilReclutamiento/formato-damfo290/formato-anexos/perfil-pst-cliente/pst-cliente/pst-cliente.component';
import { PstDamsaComponent } from './PerfilReclutamiento/formato-damfo290/formato-anexos/perfil-pst-damsa/pst-damsa/pst-damsa.component';
import { RequisicionNuevaComponent } from './requisiciones/components/requisicion-nueva/requisicion-nueva.component';
import { SharedModule } from '../../shared/shared.module';
// tslint:disable-next-line: max-line-length
import { TelefonosClienteComponent } from './directorio-empresarial/editar-clientes/Components/telefonos-cliente/telefonos-cliente.component';
import { ToolsModule } from '../../tools/tools.module';
import { UpdateInfoRequiComponent } from './requisiciones/components/update-info-requi/update-info-requi.component';
import { UpdateRequisicionComponent } from './requisiciones/components/update-requisicion/update-requisicion.component';
import { VerClienteComponent } from './directorio-empresarial/ver-cliente/ver-cliente.component';
import { ViewCuerpoRequiComponent } from './requisiciones/components/view-cuerpo-requi/view-cuerpo-requi.component';
import { ViewInforRequiComponent } from './requisiciones/components/view-info-requi/view-info-requi.component';
import { ViewRequisicionComponent } from './requisiciones/components/view-requisicion/view-requisicion.component';
import { ViewdamfoComponent } from './requisiciones/components/viewdamfo/viewdamfo.component';
import { FormatoCostosComponent } from './PerfilReclutamiento/formato-damfo290/formato-costos/formato-costos.component';

const routes: Routes = [
  // { path: 'directorio',
  // children: [
  //   { path: '', component: DirectorioEmpresarialComponent, data: { componente: 'Directorio Empresarial' } },
  //   { path: ':ruta', component: DirectorioEmpresarialComponent, data: { componente: 'Directorio Empresarial', ruta: 1 } }
  // ]  },
  { path: 'directorio', component: DirectorioEmpresarialComponent, data: { componente: 'Directorio Empresarial' }},
  { path: 'nuevoProspecto/:ruta', component: NuevoProspectoComponent },
  { path: 'editarCliente', component: EditarClientesComponent },
  // { path: 'editarCliente/:ClienteId/:ruta', component: EditarClientesComponent },
  // { path: 'visualizarCliente/:ClienteId/:ruta', component: VerClienteComponent },
  { path: 'visualizarCliente', component: VerClienteComponent },
  { path: 'requisicion', component: DtRequisicionComponent, data: { componente: 'Requisiciones' } },
  { path: 'requisicion/:folio', component: DtRequisicionComponent, data: { componente: 'Requisiciones' } },
  { path: 'crearRequisicion/:perfil290', component: DtDamfoComponent },
  { path: 'historialRequisicion/:ventas', component: DTHistorialComponent},
  { path: 'requisicionNueva',
    children: [
      {path: '', component: RequisicionNuevaComponent},
      {path:  ':IdDamfo/:IdDireccion/:IdEstatus/:Confidencial', component: RequisicionNuevaComponent }
    ]
  },
  { path: 'visualizarDamfo290/:IdDamfo', component: ViewdamfoComponent, data: { componente: 'Formato 290' } },
  { path: 'visualizarDamfo290/:IdDamfo/:Perfil290', component: ViewdamfoComponent, data: { componente: 'Formato 290' } },
  { path: 'visualizarRequisicion',
    children: [
      { path: '', component: ViewRequisicionComponent, data: { componente: 'Requisiciones' }},
      { path: ':IdRequi/:Folio/:Vacante/:TipoReclutamientoId/:puro',
      component: ViewRequisicionComponent, data: { componente: 'Requisiciones' }}
    ]
  },
  { path: 'edicionRequisicion/:IdRequi/:Folio/:EstatusId/:TipoReclutamientoId', component: UpdateRequisicionComponent },
  { path: 'requisicionPuro', component: DtRequisicionReclPuroComponent, data: { componente: 'Puro' } },
  { path: 'formato290', component: FormatoDAMFO290Component, data: { componente: 'Formato 290' } },
  { path: 'formato290/:IdFormato', component: FormatoDAMFO290Component, data: { componente: 'Formato 290' } },
];

@NgModule({
  imports: [
    SharedModule,
    ToolsModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    // HttpModule,
    // HttpClientModule,
  ],
  declarations: [
    RequisicionNuevaComponent,
    DtDamfoComponent,
    DialogdamfoComponent,
    DireccionautoComponent,
    ViewdamfoComponent,
    DtDamfoComponent,
    ViewRequisicionComponent,
    ViewInforRequiComponent,
    UpdateRequisicionComponent,
    ViewCuerpoRequiComponent,
    UpdateInfoRequiComponent,
    DialogCancelRequiComponent,
    DirectorioEmpresarialComponent,
    DtProspectosComponent,
    DtClientesComponent,
    NuevoProspectoComponent,
    DtRequisicionReclPuroComponent,
    EditarClientesComponent,
    VerClienteComponent,
    DatosGeneralesComponent,
    DireccionesClienteComponent,
    TelefonosClienteComponent,
    CorreosClienteComponent,
    ContactosClienteComponent,
    FormatoDAMFO290Component,
    FormatoClienteComponent,
    FormatoRequisitosComponent,
    PerfilEscolaridadesComponent,
    EscolaridadesComponent,
    FormatoAnexosComponent,
    PerfilBeneficiosComponent,
    BeneficiosComponent,
    HorariosComponent,
    PerfilHorariosComponent,
    PerfilActividadesComponent,
    ActividadesComponent,
    PerfilObservacionesComponent,
    ObservacionesComponent,
    PerfilPstDamsaComponent,
    PstDamsaComponent,
    PstClienteComponent,
    PerfilPstClienteComponent,
    PerfilDocClienteComponent,
    DocClienteComponent,
    PerfilProcesosComponent,
    ProcesosComponent,
    PerfilPrestacionesComponent,
    PrestacionesComponent,
    PerfilCordinalesComponent,
    PerfilAreasComponent,
    PerfilGerencialesComponent,
    AreasComponent,
    GerencialesComponent,
    CordinalesComponent
,
    FormatoCostosComponent
  ],
  entryComponents: [
    DialogdamfoComponent,
    DialogCancelRequiComponent,
    DialogEditHorarioComponent,
    DialogRutasComponent
  ],
  exports: [
    RouterModule,
    ViewCuerpoRequiComponent,
    ViewInforRequiComponent,
    DtDamfoComponent,
    FormatoDAMFO290Component]
})

export class VentaModule { }
