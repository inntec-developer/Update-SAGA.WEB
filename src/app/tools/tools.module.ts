import { FormsModule } from '@angular/forms';
import { ToasterModule } from 'angular2-toaster';
// tslint:disable-next-line: max-line-length
// import { DataTableColumnCellDirective, DataTableColumnDirective, DataTableColumnHeaderDirective } from '@swimlane/ngx-datatable/release/components/columns';
import { FileUploadModule } from 'primeng/primeng';
import { INgxSelectOptions, NgxSelectModule } from 'ngx-select-ex';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {MatCheckboxModule} from '@angular/material';
// import {MatButtonModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
// import {
//   // MatAutocompleteModule,
//   // MatButtonModule,
//   // MatButtonToggleModule,
//   // MatCardModule,
//   // MatCheckboxModule,
//   // MatChipsModule,
//   // MatDatepickerModule,
//   // MatDialogModule,
//   MatDividerModule,
//   // MatExpansionModule,
//   // MatGridListModule,
//   // MatIconModule,
//   // MatInputModule,
//   // MatListModule,
//   // MatMenuModule,
//   MatNativeDateModule,
//   MatOptionModule,
//   // MatPaginatorModule,
//   // MatProgressBarModule,
//   // MatProgressSpinnerModule,
//   // MatRadioModule,
//   MatRippleModule,
//   // MatSelectModule,
//   // MatSidenavModule,
//   // MatSlideToggleModule,
//   // MatSliderModule,
//   // MatSnackBarModule,
//   // MatSortModule,
//   // MatStepperModule,
//   // MatTableModule,
//   // MatTabsModule,
//   // MatToolbarModule,
//   // MatTooltipModule
// } from '@angular/material';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ColorPickerModule } from 'ngx-color-picker';
import { CustomFormsModule } from 'ng2-validation';
import { DndModule } from 'ng2-dnd';
import { FocusDirective } from '../shared/directives/focus/focus.directive';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule as Ng2ChartsModule } from 'ng2-charts/ng2-charts';
import { Ng2TableModule } from 'ng2-table';
import { NgModule } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { SelectModule } from 'ng2-select';
import { TagInputModule } from 'ngx-chips';
import { TextMaskModule } from 'angular2-text-mask';
import { FontPickerModule, FONT_PICKER_CONFIG, FontPickerConfigInterface } from 'ngx-font-picker';

// const CustomSelectOptions: INgxSelectOptions = { // Check the interface for more options
//   optionValueField: 'id',
//   optionTextField: 'name'
// };
const DEFAULT_FONT_PICKER_CONFIG: FontPickerConfigInterface = {
  // Change this to your Google API key
  apiKey: 'AIzaSyBI5mRJ-PevYsq92gL41_0Zc3D6AjttiAQ'
};
@NgModule({
  imports: [
    BsDatepickerModule.forRoot(),
    ColorPickerModule,
    CustomFormsModule,
    DndModule.forRoot(),
    FileUploadModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
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
    SelectModule,
    TagInputModule,
    TextMaskModule,
    FontPickerModule,
    ToasterModule,
    FormsModule,
    MatCheckboxModule,
    CKEditorModule
  ],
  declarations: [
    FocusDirective,
    // DataTableColumnDirective,
    // DataTableColumnHeaderDirective,
    // DataTableColumnCellDirective
  ],
  providers: [
    {
      provide: FONT_PICKER_CONFIG,
      useValue: DEFAULT_FONT_PICKER_CONFIG
    }
  ],
  exports: [
    FocusDirective,
    BsDatepickerModule,
    ColorPickerModule,
    CustomFormsModule,
    DndModule,
    FileUploadModule,
    MatAutocompleteModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
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
    FontPickerModule,
    ToasterModule,
    FormsModule,
    CKEditorModule,
    MatCheckboxModule
  ]
})
export class ToolsModule { }
