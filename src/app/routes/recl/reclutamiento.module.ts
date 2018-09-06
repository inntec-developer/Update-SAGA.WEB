import { ColorPickerModule, ColorPickerService } from 'ngx-color-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
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
import { PopoverModule, TooltipModule } from 'ngx-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { getSpanishPaginatorBtp, getSpanishPaginatorIntl } from '../../core/translator/config-paginator/config-paginator.component';

import { AreaExpComponent } from './candidatos/busqueda/area-exp/area-exp.component';
import { BusquedaComponent } from './candidatos/busqueda/busqueda.component';
import { CandidatosComponent } from './candidatos/candidatos.component';
import { ColoniaComponent } from './candidatos/busqueda/colonia/colonia.component';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { CpComponent } from './candidatos/busqueda/cp/cp.component';
import { CustomFormsModule } from 'ng2-validation';
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
import { FileUploadModule } from 'ng2-file-upload';
import { GeneroComponent } from './candidatos/busqueda/genero/genero.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { IdiomasComponent } from './candidatos/busqueda/idiomas/idiomas.component';
import { ImageCropperModule } from 'ng2-img-cropper';
import { MunicipioComponent } from './candidatos/busqueda/municipio/municipio.component';
import { Ng2TableModule } from 'ng2-table';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NivestudiosComponent } from './candidatos/busqueda/nivestudios/nivestudios.component';
import {PaginatorModule} from 'primeng/paginator';
import { PaisComponent } from './candidatos/busqueda/pais/pais.component';
import { PcondiscapacidadComponent } from './candidatos/busqueda/pcondiscapacidad/pcondiscapacidad.component';
import { PerfilComponent } from './candidatos/busqueda/perfil/perfil.component';
import { ReubicacionComponent } from './candidatos/busqueda/reubicacion/reubicacion.component';
import { SelectModule } from 'ng2-select';
import { SharedModule } from '../../shared/shared.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TagInputModule } from 'ngx-chips';
import { TextMaskModule } from 'angular2-text-mask';
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
    { path: 'vacantesReclutador', component: VacantesReclutadorComponent, data:{componente:'Vacantes'} },
    { path: 'postulados/:VacanteId/:Folio/:VBtra', component: VacantesPostulateComponent, data: {componnte: 'Vacantes'} }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        SelectModule, ColorPickerModule, TextMaskModule,
        TagInputModule, CustomFormsModule, FileUploadModule,
        ImageCropperModule, FormsModule, ReactiveFormsModule,
        CommonModule, HttpClientModule, HttpModule,
        MatAutocompleteModule, MatButtonModule, MatButtonToggleModule,
        MatCardModule, MatCheckboxModule, MatChipsModule,
        MatStepperModule, MatDatepickerModule, MatDialogModule,
        MatDividerModule, MatExpansionModule, MatGridListModule,
        MatIconModule, MatInputModule,   MatListModule,
        MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule,
        MatProgressSpinnerModule, MatRadioModule, MatRippleModule,
        MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule,
        MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule,
        MatToolbarModule, MatTooltipModule, MatOptionModule, MatDialogModule,
        ToasterModule, VentaModule, ComponentsModule, NgxSpinnerModule,
        PaginationModule.forRoot(),Ng2TableModule,
        PopoverModule.forRoot(),
        TooltipModule.forRoot(),
        TabsModule   
    ],
    providers: [ColorPickerService, 
        { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
        { provide: PaginationConfig, useValue: getSpanishPaginatorBtp()}
        , ToasterService],
    declarations: [ Damfo290Component, CandidatosComponent, VacantesComponent,
                    BusquedaComponent, PaisComponent, EstadoComponent,
                    MunicipioComponent, ColoniaComponent, AreaExpComponent,
                    CpComponent, GeneroComponent, EdadComponent,
                    ReubicacionComponent, PcondiscapacidadComponent, TplicenciaComponent,
                    VehpropioComponent, NivestudiosComponent, IdiomasComponent,
                    PerfilComponent, DtVacantesComponent, DtCandidatosComponent,
                     DialogcandidatosComponent, DisenadorVacanteComponent, 
                     DtVacantesReclutadorComponent, VacantesReclutadorComponent,
                     DialogShowRequiComponent,
                     DialogAssingRequiComponent,
                     DtCandidatosPostComponent,
                     VacantesPostulateComponent],
    entryComponents: [
       DialogcandidatosComponent, DialogShowRequiComponent, DialogAssingRequiComponent],
    exports: [ RouterModule ]
})

export class ReclutamientoModule { }
