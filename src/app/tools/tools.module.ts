import { DataTableColumnCellDirective, DataTableColumnDirective, DataTableColumnHeaderDirective } from '@swimlane/ngx-datatable/release/components/columns';
import { DataTableModule, FileUploadModule } from 'primeng/primeng';
import { INgxSelectOptions, NgxSelectModule } from 'ngx-select-ex';
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
import { getSpanishPaginatorBtp, getSpanishPaginatorIntl } from '../core/translator/config-paginator/config-paginator.component';

import { AgGridModule } from 'ag-grid-angular';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ColorPickerModule } from 'ngx-color-picker';
import { CustomFormsModule } from 'ng2-validation';
import { DndModule } from 'ng2-dnd';
import { FocusDirective } from '../shared/directives/focus/focus.directive';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ImageCropperModule } from 'ng2-img-cropper';
import { ChartsModule as Ng2ChartsModule } from 'ng2-charts/ng2-charts'
import { Ng2TableModule } from 'ng2-table';
import { NgModule } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PaginationConfig } from 'ngx-bootstrap/pagination';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { SelectModule } from 'ng2-select';
import { TagInputModule } from 'ngx-chips';
import { TextMaskModule } from 'angular2-text-mask';
import { ToasterService } from 'angular2-toaster';

const CustomSelectOptions: INgxSelectOptions = { // Check the interface for more options
  optionValueField: 'id',
  optionTextField: 'name'
};

@NgModule({
  imports: [
    AgGridModule,
    BsDatepickerModule.forRoot(),
    ColorPickerModule,
    CustomFormsModule,
    DataTableModule,
    DndModule.forRoot(),
    FileUploadModule,
    HttpClientModule,
    HttpModule,
    ImageCropperModule,
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
    NgScrollbarModule,
    Ng2TableModule,
    Ng2ChartsModule,
    NgxSpinnerModule,
    NgxSelectModule.forRoot(CustomSelectOptions),
    SelectModule,
    TagInputModule,
    TextMaskModule,
  ],
  declarations: [
    FocusDirective,
    DataTableColumnDirective,
    DataTableColumnHeaderDirective,
    DataTableColumnCellDirective
  ],
  providers:[
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
    { provide: PaginationConfig, useValue: getSpanishPaginatorBtp() },
    { provide: MAT_DATE_LOCALE, useValue: 'en-MX' },
    ToasterService
  ],
  exports:[
    FocusDirective,

    AgGridModule,
    BsDatepickerModule,
    ColorPickerModule,
    CustomFormsModule,
    DataTableModule,
    DndModule,
    FileUploadModule,
    ImageCropperModule,
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
    NgScrollbarModule,
    Ng2TableModule,
    Ng2ChartsModule,
    NgxSpinnerModule,
    NgxSelectModule,
    ProgressbarModule,
    SelectModule,
    TagInputModule,
    TextMaskModule,
  ]
})
export class ToolsModule { }
