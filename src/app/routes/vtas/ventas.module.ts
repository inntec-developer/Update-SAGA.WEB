import { AccordionModule, AlertModule, BsDatepickerModule, ModalModule, PopoverModule, TabsModule, TooltipModule } from 'ngx-bootstrap';
import { ColorPickerModule, ColorPickerService } from 'ngx-color-picker';
import {
  MAT_DATE_LOCALE,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatOptionModule,
  MatPaginatorIntl,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { PaginationConfig, PaginationModule } from 'ngx-bootstrap/pagination';
import { RouterModule, Routes } from '@angular/router';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { getSpanishPaginatorBtp, getSpanishPaginatorIntl } from '../../core/translator/config-paginator/config-paginator.component';

import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { DialogActivarRequiComponent } from './requisiciones/components/dialog-activar-requi/dialog-activar-requi.component';
import { DialogCancelRequiComponent } from './requisiciones/components/dialog-cancel-requi/dialog-cancel-requi.component';
import { DialogDeleteRequiComponent } from './requisiciones/components/dialog-delete-requi/dialog-delete-requi.component';
import { DialogEditHorarioComponent } from '../../components/tablas/dt-horarios/dialog-edit-horario/dialog-edit-horario.component';
import { DialogRutasComponent } from '../../components/tablas/dt-rutas-camion-requi/dialog-rutas/dialog-rutas.component';
import { DialogdamfoComponent } from './requisiciones/components/dialogdamfo/dialogdamfo.component';
import { DireccionautoComponent } from './requisiciones/components/direccionauto/direccionauto.component';
import { DirectorioEmpresarialComponent } from './directorio-empresarial/directorio-empresarial.component';
import { DtClientesComponent } from './directorio-empresarial/clientes/dt-clientes/dt-clientes.component';
import { DtCrearRequisicionComponent } from './requisiciones/components/dt-crear-requisicion/dt-crear-requisicion.component';
import { DtDamfoComponent } from './requisiciones/components/dt-damfo/dt-damfo.component';
import { DtProspectosComponent } from './directorio-empresarial/prospectos/dt-prospectos/dt-prospectos.component';
import { DtRequisicionReclPuroComponent } from './../../components/tablas/dt-requisicion-recl-puro/dt-requisicion-recl-puro.component';
import { EditarClientesComponent } from './directorio-empresarial/editar-clientes/editar-clientes.component'
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {ChartsModule as Ng2ChartsModule} from 'ng2-charts/ng2-charts'
import { Ng2TableModule } from 'ng2-table';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NuevoProspectoComponent } from './directorio-empresarial/prospectos/nuevo-prospecto/nuevo-prospecto.component';
import { RequisicionComponent } from './requisiciones/requisicion.component';
import { RequisicionNuevaComponent } from './requisiciones/components/requisicion-nueva/requisicion-nueva.component';
import { SelectModule } from 'ng2-select';
import { SharedModule } from '../../shared/shared.module';
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
  { path: 'requisicionNueva/:IdDamfo/:IdDireccion/:IdEstatus', component: RequisicionNuevaComponent },
  { path: 'visualizarDamfo290/:IdDamfo', component: ViewdamfoComponent, data: { componente: 'Formato 290' } },
  { path: 'visualizarRequisicion/:IdRequi/:Folio/:Vacante/:TipoReclutamientoId', component: ViewRequisicionComponent, data: { componente: 'Requisiciones' } },
  { path: 'edicionRequisicion/:IdRequi/:Folio/:EstatusId/:TipoReclutamientoId', component: UpdateRequisicionComponent },
  { path: 'requisicionPuro', component: DtRequisicionReclPuroComponent },
];

@NgModule({
  imports: [
    AlertModule,
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
    HttpModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatOptionModule,
    NgxSpinnerModule,
    ToasterModule,
    SelectModule,
    ComponentsModule,
    Ng2TableModule,
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    TooltipModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ColorPickerModule,
    NgbModule,
    Ng2ChartsModule,
  ],
  providers: [ColorPickerService,
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
    { provide: PaginationConfig, useValue: getSpanishPaginatorBtp() },
    { provide: MAT_DATE_LOCALE, useValue: 'en-MX' },
    ToasterService
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
    VerClienteComponent
  ],
  entryComponents: [DialogdamfoComponent, DialogDeleteRequiComponent, DialogCancelRequiComponent, DialogActivarRequiComponent, DialogEditHorarioComponent, DialogRutasComponent],
  exports: [
    RouterModule, ViewCuerpoRequiComponent, ViewInforRequiComponent
  ]
})

export class VentaModule { }
