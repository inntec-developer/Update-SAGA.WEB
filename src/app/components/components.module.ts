import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { INgxSelectOptions, NgxSelectModule } from 'ngx-select-ex'
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
import { getSpanishPaginatorBtp, getSpanishPaginatorIntl } from '../core/translator/config-paginator/config-paginator.component';

import { AsignarRequisicionComponent } from './asignar-requisicion/asignar-requisicion.component';
import { BusquedaCandidatosComponent } from './busqueda-candidatos/busqueda-candidatos.component';
import { ButtonAcceptComponent } from './buttons/button-accept/button-accept.component';
import { ButtonAddComponent } from './buttons/button-add/button-add.component';
import { ButtonAssignComponent } from './buttons/button-assign/button-assign.component';
import { ButtonCancelComponent } from './buttons/button-cancel/button-cancel.component';
import { ButtonCheckComponent } from './buttons/button-check/button-check.component';
import { ButtonClosedComponent } from './buttons/button-closed/button-closed.component';
import { ButtonDeleteComponent } from './buttons/button-delete/button-delete.component';
import { ButtonDesignComponent } from './buttons/button-design/button-design.component';
import { ButtonDesingReclComponent } from './buttons/button-desing-recl/button-desing-recl.component';
import { ButtonDislikeComponent } from './buttons/button-dislike/button-dislike.component';
import { ButtonDocsComponent } from './buttons/button-docs/button-docs.component';
import { ButtonEditComponent } from './buttons/button-edit/button-edit.component';
import { ButtonLikeComponent } from './buttons/button-like/button-like.component';
import { ButtonPrintComponent } from './buttons/button-print/button-print.component';
import { ButtonRefreshComponent } from './buttons/button-refresh/button-refresh.component';
import { ButtonReturnComponent } from './buttons/button-return/button-return.component';
import { ButtonSaveComponent } from './buttons/button-save/button-save.component';
import { ButtonSendComponent } from './buttons/button-send/button-send.component';
import { ButtonViewComponent } from './buttons/button-view/button-view.component';
import { ClockComponent } from './clock/clock.component';
import { ColorPickerService } from '../../../node_modules/ngx-color-picker';
import { CommonModule } from '@angular/common';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { NgModule } from '@angular/core';
import { TablaPruebaComponent } from './dataTable/tabla-prueba/tabla-prueba.component';
import { ToasterService } from '../../../node_modules/angular2-toaster';
import { CardVacanteComponent } from './card-vacantes/card-vacante/card-vacante.component';

const CustomSelectOptions: INgxSelectOptions = { // Check the interface for more options
  optionValueField: 'id',
  optionTextField: 'name'
};

@NgModule({
  imports: [
    CommonModule,
    NgxSelectModule.forRoot(CustomSelectOptions),
    FormsModule,
    ReactiveFormsModule,
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
    MatTooltipModule,
    Ng2TableModule,
    PaginationModule.forRoot()
    
  ],
  declarations: [
    AsignarRequisicionComponent,
    ButtonSaveComponent,
    ButtonEditComponent,
    ButtonDeleteComponent,
    ButtonViewComponent,
    ButtonCancelComponent,
    ButtonReturnComponent,
    ButtonRefreshComponent,
    ButtonDesignComponent,
    ButtonCheckComponent,
    ButtonClosedComponent,
    ButtonAssignComponent,
    ButtonPrintComponent,
    ButtonAcceptComponent,
    ButtonDocsComponent,
    ButtonDesingReclComponent,
    ButtonAddComponent,
    BusquedaCandidatosComponent,
    ClockComponent,
    ButtonLikeComponent,
    ButtonDislikeComponent,
    ButtonSendComponent,
    TablaPruebaComponent,
    CardVacanteComponent

  ],
  exports: [
    AsignarRequisicionComponent,
    ButtonSaveComponent,
    ButtonEditComponent,
    ButtonDeleteComponent,
    ButtonViewComponent,
    ButtonCancelComponent,
    ButtonReturnComponent,
    ButtonRefreshComponent,
    ButtonDesignComponent,
    ButtonCheckComponent,
    ButtonClosedComponent,
    ButtonAssignComponent,
    ButtonPrintComponent,
    ButtonAcceptComponent,
    ButtonDocsComponent,
    ButtonDesingReclComponent,
    ButtonAddComponent,
    BusquedaCandidatosComponent,
    ClockComponent,
    ButtonLikeComponent,
    ButtonDislikeComponent,
    ButtonSendComponent,
    TablaPruebaComponent,
    CardVacanteComponent
    
  ],
  providers: [ColorPickerService,
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
    { provide: PaginationConfig, useValue: getSpanishPaginatorBtp()},
    ToasterService
    ],
})
export class ComponentsModule { }
