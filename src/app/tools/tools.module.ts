import { DataTableColumnCellDirective, DataTableColumnDirective, DataTableColumnHeaderDirective } from '@swimlane/ngx-datatable/release/components/columns';
import { DataTableModule, FileUploadModule } from 'primeng/primeng';
import { INgxSelectOptions, NgxSelectModule } from 'ngx-select-ex';
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
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { SelectModule } from 'ng2-select';
import { TagInputModule } from 'ngx-chips';
import { TextMaskModule } from 'angular2-text-mask';
import { FontPickerModule, FONT_PICKER_CONFIG, FontPickerConfigInterface } from 'ngx-font-picker';
const CustomSelectOptions: INgxSelectOptions = { // Check the interface for more options
  optionValueField: 'id',
  optionTextField: 'name'
};
const DEFAULT_FONT_PICKER_CONFIG: FontPickerConfigInterface = {
  // Change this to your Google API key
  apiKey: 'AIzaSyBI5mRJ-PevYsq92gL41_0Zc3D6AjttiAQ'
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
    FontPickerModule
  ],
  declarations: [
    FocusDirective,
    DataTableColumnDirective,
    DataTableColumnHeaderDirective,
    DataTableColumnCellDirective
  ],
  providers: [
    {
      provide: FONT_PICKER_CONFIG,
      useValue: DEFAULT_FONT_PICKER_CONFIG
    }
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
    FontPickerModule
  ]
})
export class ToolsModule { }
