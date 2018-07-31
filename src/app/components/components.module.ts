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
import { ButtonDocsComponent } from './buttons/button-docs/button-docs.component';
import { ButtonEditComponent } from './buttons/button-edit/button-edit.component';
import { ButtonPrintComponent } from './buttons/button-print/button-print.component';
import { ButtonRefreshComponent } from './buttons/button-refresh/button-refresh.component';
import { ButtonReturnComponent } from './buttons/button-return/button-return.component';
import { ButtonSaveComponent } from './buttons/button-save/button-save.component';
import { ButtonViewComponent } from './buttons/button-view/button-view.component';
import { ClockComponent } from './clock/clock.component';
import { ColorPickerService } from '../../../node_modules/ngx-color-picker';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToasterService } from '../../../node_modules/angular2-toaster';
import { getSpanishPaginatorIntl } from '../core/translator/config-paginator/config-paginator.component';

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
    MatTooltipModule
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
    ClockComponent

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
    ClockComponent
    
  ],
  providers: [ColorPickerService, { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }, ToasterService],
})
export class ComponentsModule { }
