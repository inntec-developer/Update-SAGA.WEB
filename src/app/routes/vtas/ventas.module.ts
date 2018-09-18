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

import { ActividadesComponent } from './requisiciones/components/actividades/actividades.component';
import { ClientesComponent } from './directorio-empresarial/clientes/clientes.component';
import { ColorPickerService } from 'ngx-color-picker';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { DialogActivarRequiComponent } from './requisiciones/components/dialog-activar-requi/dialog-activar-requi.component';
import { DialogCancelRequiComponent } from './requisiciones/components/dialog-cancel-requi/dialog-cancel-requi.component';
import { DialogDeleteRequiComponent } from './requisiciones/components/dialog-delete-requi/dialog-delete-requi.component';
import { DialogEditHorarioComponent } from './requisiciones/components/dt-horarios/dialog-edit-horario/dialog-edit-horario.component';
import { DialogdamfoComponent } from './requisiciones/components/dialogdamfo/dialogdamfo.component';
import { DireccionautoComponent } from './requisiciones/components/direccionauto/direccionauto.component';
import { DirectorioEmpresarialComponent } from './directorio-empresarial/directorio-empresarial.component';
import { DocumentosClienteComponent } from './requisiciones/components/documentos-cliente/documentos-cliente.component';
import { DocumentosDamsaComponent } from './requisiciones/components/documentos-damsa/documentos-damsa.component';
import { DtBeneficiosComponent } from './requisiciones/components/dt-beneficios/dt-beneficios.component';
import { DtCompetenciaAreaComponent } from './requisiciones/components/competencias/dt-competencia-area/dt-competencia-area.component';
import { DtCompetenciaCardinalComponent } from './requisiciones/components/competencias/dt-competencia-cardinal/dt-competencia-cardinal.component';
import { DtCompetenciaGerencialComponent } from './requisiciones/components/competencias/dt-competencia-gerencial/dt-competencia-gerencial.component';
import { DtContactosComponent } from './requisiciones/components/dt-contactos/dt-contactos.component';
import { DtCrearRequisicionComponent } from './requisiciones/components/dt-crear-requisicion/dt-crear-requisicion.component';
import { DtDamfoComponent } from './requisiciones/components/dt-damfo/dt-damfo.component';
import { DtDireccionComponent } from './requisiciones/components/dt-direccion/dt-direccion.component';
import { DtDirecionRequiComponent } from './requisiciones/components/dt-direcion-requi/dt-direcion-requi.component'
import { DtHorariosComponent } from './requisiciones/components/dt-horarios/dt-horarios.component';
import { DtPsicometriasClienteComponent } from './requisiciones/components/dt-psicometrias-cliente/dt-psicometrias-cliente.component';
import { DtPsicometriasDamsaComponent } from './requisiciones/components/dt-psicometrias-damsa/dt-psicometrias-damsa.component';
import { DtRequisicionComponent } from './requisiciones/components/dt-requisicion/dt-requisicion.component';
import { DtTelefonosComponent } from './requisiciones/components/dt-telefonos/dt-telefonos.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Ng2TableModule } from 'ng2-table';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ObservacionesComponent } from './requisiciones/components/observaciones/observaciones.component';
import { PrestacionesClienteComponent } from './requisiciones/components/prestaciones-cliente/prestaciones-cliente.component';
import { PrestacionesLeyComponent } from './requisiciones/components/prestaciones-ley/prestaciones-ley.component';
import { ProcesosComponent } from './requisiciones/components/procesos/procesos.component';
import { ProspectoComponent } from './directorio-empresarial/prospectos/prospecto.component';
import { RequisicionComponent } from './requisiciones/requisicion.component';
import { RequisicionNuevaComponent } from './requisiciones/components/requisicion-nueva/requisicion-nueva.component';
import { SelectModule } from 'ng2-select';
import { SharedModule } from '../../shared/shared.module';
import { UpdateInfoRequiComponent } from './requisiciones/components/update-info-requi/update-info-requi.component';
import { UpdateRequisicionComponent } from './requisiciones/components/update-requisicion/update-requisicion.component';
import { ViewCuerpoRequiComponent } from './requisiciones/components/view-cuerpo-requi/view-cuerpo-requi.component';
import { ViewInforRequiComponent } from './requisiciones/components/view-info-requi/view-info-requi.component';
import { ViewRequisicionComponent } from './requisiciones/components/view-requisicion/view-requisicion.component';
import { ViewdamfoComponent } from './requisiciones/components/viewdamfo/viewdamfo.component';

const routes: Routes = [
    { path: 'directorio', component: DirectorioEmpresarialComponent, data: {componente: 'Directorio Empresarial'}},
    { path: 'prospectos', component: ProspectoComponent },
    { path: 'clientes', component: ClientesComponent},
    { path: 'prospecto/:user', component: ProspectoComponent },
    { path: 'requisicion', component: RequisicionComponent, data:{componente:'Requisiciones'}},
    { path: 'crearRequisicion', component: DtCrearRequisicionComponent},
    { path: 'requisicionNueva/:IdDamfo/:IdDireccion', component: RequisicionNuevaComponent},
    { path: 'visualizarDamfo290/:IdDamfo', component: ViewdamfoComponent, data:{componente: 'Formato 290'} },
    { path: 'visualizarRequisicion/:IdRequi/:Folio/:Vacante', component: ViewRequisicionComponent, data:{componente:'Requisiciones'} },
    { path: 'edicionRequisicion/:IdRequi/:Folio', component: UpdateRequisicionComponent },
];

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        RouterModule.forChild(routes),
        HttpModule,
        HttpClientModule,
        MatAutocompleteModule, MatButtonModule, MatButtonToggleModule,
        MatCardModule, MatCheckboxModule, MatChipsModule,
        MatStepperModule, MatDatepickerModule, MatDialogModule,
        MatDividerModule, MatExpansionModule, MatGridListModule,
        MatIconModule, MatInputModule,   MatListModule,
        MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule,
        MatProgressSpinnerModule, MatRadioModule, MatRippleModule,
        MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule,
        MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule,
        MatToolbarModule, MatTooltipModule, MatOptionModule, NgxSpinnerModule, ToasterModule,
        SelectModule, ComponentsModule, Ng2TableModule, PaginationModule.forRoot()
    ],
    providers: [ColorPickerService,
         { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
         { provide: PaginationConfig, useValue: getSpanishPaginatorBtp()},
         {provide: MAT_DATE_LOCALE, useValue: 'en-MX'},
          ToasterService ],
    declarations: [
        ProspectoComponent,
        RequisicionComponent,
        RequisicionNuevaComponent,
        DtDamfoComponent,
        DialogdamfoComponent,
        DireccionautoComponent,
        ViewdamfoComponent,
        DtDireccionComponent,
        DtTelefonosComponent,
        DtDamfoComponent,
        DtContactosComponent,
        DtHorariosComponent,
        DtPsicometriasDamsaComponent,
        DtPsicometriasClienteComponent,
        DtBeneficiosComponent,
        DtCompetenciaCardinalComponent,
        DtCompetenciaAreaComponent,
        DtCompetenciaGerencialComponent,
        DtCrearRequisicionComponent,
        DtRequisicionComponent,
        DocumentosDamsaComponent,
        DocumentosClienteComponent,
        PrestacionesLeyComponent,
        PrestacionesClienteComponent,
        ActividadesComponent,
        ObservacionesComponent,
        ProcesosComponent,
        ViewRequisicionComponent,
        ViewInforRequiComponent,
        UpdateRequisicionComponent,
        ViewCuerpoRequiComponent,
        UpdateInfoRequiComponent,
        DialogDeleteRequiComponent,
        DialogCancelRequiComponent,
        DialogActivarRequiComponent,
        DtDirecionRequiComponent,
        DialogEditHorarioComponent,
        DirectorioEmpresarialComponent,
        ClientesComponent,
    ],
    entryComponents: [DialogdamfoComponent, DialogDeleteRequiComponent, DialogCancelRequiComponent, DialogActivarRequiComponent, DialogEditHorarioComponent],
    exports: [
        RouterModule, ViewCuerpoRequiComponent, ViewInforRequiComponent
    ]
})

export class VentaModule { }
