import { RouterModule, Routes } from '@angular/router';

import { ComponentsModule } from '../../components/components.module';
import { ContactosClienteComponent } from './directorio-empresarial/editar-clientes/Components/contactos-cliente/contactos-cliente.component';
import { CorreosClienteComponent } from './directorio-empresarial/editar-clientes/Components/correos-cliente/correos-cliente.component';
import { DatosGeneralesComponent } from './directorio-empresarial/editar-clientes/Components/datos-generales/datos-generales.component';
import { DialogActivarRequiComponent } from './requisiciones/components/dialog-activar-requi/dialog-activar-requi.component';
import { DialogCancelRequiComponent } from './requisiciones/components/dialog-cancel-requi/dialog-cancel-requi.component';
import { DialogDeleteRequiComponent } from './requisiciones/components/dialog-delete-requi/dialog-delete-requi.component';
import { DialogEditHorarioComponent } from '../../components/tablas/dt-horarios/dialog-edit-horario/dialog-edit-horario.component';
import { DialogRutasComponent } from '../../components/tablas/dt-rutas-camion-requi/dialog-rutas/dialog-rutas.component';
import { DialogdamfoComponent } from './requisiciones/components/dialogdamfo/dialogdamfo.component';
import { DireccionautoComponent } from './requisiciones/components/direccionauto/direccionauto.component';
import { DireccionesClienteComponent } from './directorio-empresarial/editar-clientes/Components/direcciones-cliente/direcciones-cliente.component';
import { DirectorioEmpresarialComponent } from './directorio-empresarial/directorio-empresarial.component';
import { DtClientesComponent } from './directorio-empresarial/clientes/dt-clientes/dt-clientes.component';
import { DtCrearRequisicionComponent } from './requisiciones/components/dt-crear-requisicion/dt-crear-requisicion.component';
import { DtDamfoComponent } from './requisiciones/components/dt-damfo/dt-damfo.component';
import { DtProspectosComponent } from './directorio-empresarial/prospectos/dt-prospectos/dt-prospectos.component';
import { DtRequisicionReclPuroComponent } from './../../components/tablas/dt-requisicion-recl-puro/dt-requisicion-recl-puro.component';
import { EditarClientesComponent } from './directorio-empresarial/editar-clientes/editar-clientes.component'
import { EscolaridadesComponent } from './PerfilReclutamiento/formato-damfo290/formato-requisitos/perfil-escolaridades/escolaridades/escolaridades.component';
import { FormatoAnexosComponent } from './PerfilReclutamiento/formato-damfo290/formato-anexos/formato-anexos.component';
import { FormatoClienteComponent } from './PerfilReclutamiento/formato-damfo290/formato-cliente/formato-cliente.component';
import { FormatoDAMFO290Component } from './PerfilReclutamiento/formato-damfo290/formato-damfo290.component';
import { FormatoRequisitosComponent } from './PerfilReclutamiento/formato-damfo290/formato-requisitos/formato-requisitos.component';
import { NgModule } from '@angular/core';
import { NuevoProspectoComponent } from './directorio-empresarial/prospectos/nuevo-prospecto/nuevo-prospecto.component';
import { PerfilEscolaridadesComponent } from './PerfilReclutamiento/formato-damfo290/formato-requisitos/perfil-escolaridades/perfil-escolaridades.component';
import { RequisicionComponent } from './requisiciones/requisicion.component';
import { RequisicionNuevaComponent } from './requisiciones/components/requisicion-nueva/requisicion-nueva.component';
import { SharedModule } from '../../shared/shared.module';
import { TelefonosClienteComponent } from './directorio-empresarial/editar-clientes/Components/telefonos-cliente/telefonos-cliente.component';
import { ToolsModule } from '../../tools/tools.module';
import { UpdateInfoRequiComponent } from './requisiciones/components/update-info-requi/update-info-requi.component';
import { UpdateRequisicionComponent } from './requisiciones/components/update-requisicion/update-requisicion.component';
import { VerClienteComponent } from './directorio-empresarial/ver-cliente/ver-cliente.component';
import { ViewCuerpoRequiComponent } from './requisiciones/components/view-cuerpo-requi/view-cuerpo-requi.component';
import { ViewInforRequiComponent } from './requisiciones/components/view-info-requi/view-info-requi.component';
import { ViewRequisicionComponent } from './requisiciones/components/view-requisicion/view-requisicion.component';
import { ViewdamfoComponent } from './requisiciones/components/viewdamfo/viewdamfo.component';

const routes: Routes = [
  { path: 'directorio', component: DirectorioEmpresarialComponent, data: { componente: 'Directorio Empresarial' } },
  { path: 'nuevoProspecto', component: NuevoProspectoComponent },
  { path: 'editarCliente/:ClienteId', component: EditarClientesComponent },
  { path: 'visualizarCliente/:ClienteId', component: VerClienteComponent },
  { path: 'requisicion', component: RequisicionComponent, data: { componente: 'Requisiciones' } },
  { path: 'crearRequisicion', component: DtCrearRequisicionComponent },
  { path: 'requisicionNueva/:IdDamfo/:IdDireccion/:IdEstatus/:Confidencial', component: RequisicionNuevaComponent },
  { path: 'visualizarDamfo290/:IdDamfo', component: ViewdamfoComponent, data: { componente: 'Formato 290' } },
  { path: 'visualizarDamfo290/:IdDamfo/:Perfil290', component: ViewdamfoComponent, data: { componente: 'Formato 290' } },
  { path: 'visualizarRequisicion/:IdRequi/:Folio/:Vacante/:TipoReclutamientoId', component: ViewRequisicionComponent, data: { componente: 'Requisiciones' } },
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
    RequisicionComponent,
    RequisicionNuevaComponent,
    DtDamfoComponent,
    DialogdamfoComponent,
    DireccionautoComponent,
    ViewdamfoComponent,
    DtDamfoComponent,
    DtCrearRequisicionComponent,
    ViewRequisicionComponent,
    ViewInforRequiComponent,
    UpdateRequisicionComponent,
    ViewCuerpoRequiComponent,
    UpdateInfoRequiComponent,
    DialogDeleteRequiComponent,
    DialogCancelRequiComponent,
    DialogActivarRequiComponent,
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
    FormatoAnexosComponent  ],

  entryComponents: [DialogdamfoComponent, DialogDeleteRequiComponent, DialogCancelRequiComponent, DialogActivarRequiComponent, DialogEditHorarioComponent, DialogRutasComponent],
  exports: [
    RouterModule,
    ViewCuerpoRequiComponent,
    ViewInforRequiComponent,
    DtDamfoComponent,
    FormatoDAMFO290Component]
})

export class VentaModule { }
