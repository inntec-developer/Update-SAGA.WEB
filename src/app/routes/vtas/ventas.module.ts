import { DtRequisicionReclPuroComponent } from './../../components/tablas/dt-requisicion-recl-puro/dt-requisicion-recl-puro.component';
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

import { ClientesComponent } from './directorio-empresarial/clientes/clientes.component';
import { ColorPickerService } from 'ngx-color-picker';
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
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Ng2TableModule } from 'ng2-table';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NuevoProspectoComponent } from './directorio-empresarial/prospectos/nuevo-prospecto/nuevo-prospecto.component';
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
    { path: 'nuevoProspecto', component: NuevoProspectoComponent},
    { path: 'prospectos', component: ProspectoComponent },
    { path: 'clientes', component: ClientesComponent},
    { path: 'requisicion', component: RequisicionComponent, data:{componente:'Requisiciones'}},
    { path: 'crearRequisicion', component: DtCrearRequisicionComponent},
    { path: 'requisicionNueva/:IdDamfo/:IdDireccion/:IdEstatus', component: RequisicionNuevaComponent},
    { path: 'visualizarDamfo290/:IdDamfo', component: ViewdamfoComponent, data:{componente: 'Formato 290'} },
    { path: 'visualizarRequisicion/:IdRequi/:Folio/:Vacante', component: ViewRequisicionComponent, data:{componente:'Requisiciones'} },
    { path: 'edicionRequisicion/:IdRequi/:Folio/:EstatusId', component: UpdateRequisicionComponent },
    { path: 'requisicionPuro', component: DtRequisicionReclPuroComponent},
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
        ClientesComponent,
        DtProspectosComponent,
        DtClientesComponent,
        NuevoProspectoComponent,
        DtRequisicionReclPuroComponent
    ],
    entryComponents: [DialogdamfoComponent, DialogDeleteRequiComponent, DialogCancelRequiComponent, DialogActivarRequiComponent, DialogEditHorarioComponent, DialogRutasComponent],
    exports: [
        RouterModule, ViewCuerpoRequiComponent, ViewInforRequiComponent
    ]
})

export class VentaModule { }
