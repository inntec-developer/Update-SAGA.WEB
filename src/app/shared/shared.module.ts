import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { ColorPickerModule, ColorPickerService } from 'ngx-color-picker';
import { DataTableModule, FileUploadModule } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ModuleWithProviders, NgModule } from '@angular/core';
import { PaginationConfig, PaginationModule } from 'ngx-bootstrap/pagination';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { getSpanishPaginatorBtp, getSpanishPaginatorIntl } from '../core/translator/config-paginator/config-paginator.component';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AgGridModule } from 'ag-grid-angular';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CheckallDirective } from './directives/checkall/checkall.directive';
import { ChkButtonsDirective } from './directives/chk-privilegios-buttons/chk-buttons.directive';
import { ChkPrivilegiosMenuDirective } from './directives/checkPrivilegios/chk-privilegios-menu.directive';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ColorsService } from './colors/colors.service';
import { CommonModule } from '@angular/common';
import { CustomFormsModule } from 'ng2-validation';
import { DndModule } from 'ng2-dnd';
import { EasypiechartDirective } from './directives/easypiechart/easypiechart.directive';
import { FlotDirective } from './directives/flot/flot.directive';
import { FocusDirective } from './directives//focus/focus.directive';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ImageCropperModule } from 'ng2-img-cropper';
import { JqcloudDirective } from './directives/jqcloud/jqcloud.directive';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ChartsModule as Ng2ChartsModule } from 'ng2-charts/ng2-charts'
import { Ng2TableModule } from 'ng2-table';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NowDirective } from './directives/now/now.directive';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { RatingModule } from 'ngx-bootstrap/rating';
import { RouterModule } from '@angular/router';
import { ScrollableDirective } from './directives/scrollable/scrollable.directive';
import { SelectModule } from 'ng2-select';
import { SparklineDirective } from './directives/sparkline/sparkline.directive';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TagInputModule } from 'ngx-chips';
import { TextMaskModule } from 'angular2-text-mask';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { TreeGridDirective } from './directives/treeGrid/treeGrid.directive';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { VectormapDirective } from './directives/vectormap/vectormap.directive';

const CustomSelectOptions: INgxSelectOptions = { // Check the interface for more options
  optionValueField: 'id',
  optionTextField: 'name'
};

// https://angular.io/styleguide#!#04-10
@NgModule({
  imports: [
    AccordionModule.forRoot(),
    AgGridModule,
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    ColorPickerModule,
    CommonModule,
    CustomFormsModule,
    DataTableModule,
    DatepickerModule.forRoot(),
    DndModule.forRoot(),
    FileUploadModule,
    FormsModule,
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
    ModalModule.forRoot(),
    NgbModule,
    NgScrollbarModule,
    Ng2TableModule,
    Ng2ChartsModule,
    NgxSpinnerModule,
    NgxSelectModule.forRoot(CustomSelectOptions),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    RatingModule.forRoot(),
    ReactiveFormsModule,
    SelectModule,
    TabsModule.forRoot(),
    TagInputModule,
    TimepickerModule.forRoot(),
    TextMaskModule,
    ToasterModule,
    TooltipModule.forRoot(),
    TranslateModule,
    TypeaheadModule.forRoot(),
  ],
  providers: [
    ColorsService,
    ColorPickerService,
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
    { provide: PaginationConfig, useValue: getSpanishPaginatorBtp() },
    { provide: MAT_DATE_LOCALE, useValue: 'en-MX' },
    ToasterService
  ],

  declarations: [
    FlotDirective,
    SparklineDirective,
    EasypiechartDirective,
    CheckallDirective,
    VectormapDirective,
    NowDirective,
    ScrollableDirective,
    JqcloudDirective,
    ChkButtonsDirective,
    ChkPrivilegiosMenuDirective,
    TreeGridDirective,
    FocusDirective
  ],
  exports: [
    AccordionModule,
    AgGridModule,
    AlertModule,
    ButtonsModule,
    BsDatepickerModule,
    BsDropdownModule,
    CarouselModule,
    CheckallDirective,
    ChkButtonsDirective,
    CollapseModule,
    ColorPickerModule,
    CommonModule,
    CustomFormsModule,
    DataTableModule,
    DatepickerModule,
    DndModule,
    EasypiechartDirective,
    FileUploadModule,
    FocusDirective,
    FormsModule,
    FlotDirective,
    ImageCropperModule,
    JqcloudDirective,
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
    ModalModule,
    NowDirective,
    NgbModule,
    NgScrollbarModule,
    Ng2TableModule,
    Ng2ChartsModule,
    NgxSpinnerModule,
    NgxSelectModule,
    PaginationModule,
    PopoverModule,
    ProgressbarModule,
    RatingModule,
    ReactiveFormsModule,
    RouterModule,
    SelectModule,
    ScrollableDirective,
    SparklineDirective,
    TabsModule,
    TagInputModule,
    TextMaskModule,
    TimepickerModule,
    ToasterModule,
    TooltipModule,
    TranslateModule,
    TreeGridDirective,
    TypeaheadModule,
    VectormapDirective,
  ]
})

// https://github.com/ocombe/ng2-translate/issues/209
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
