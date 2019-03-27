import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { ColorPickerModule, ColorPickerService } from 'ngx-color-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { EasypiechartDirective } from './directives/easypiechart/easypiechart.directive';
import { FlotDirective } from './directives/flot/flot.directive';
import { FocusDirective } from './directives//focus/focus.directive';
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
import { SparklineDirective } from './directives/sparkline/sparkline.directive';
import { TabsModule } from 'ngx-bootstrap/tabs';
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
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    ColorPickerModule,
    CommonModule,
    DatepickerModule.forRoot(),
    FormsModule,
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
    TabsModule.forRoot(),
    TimepickerModule.forRoot(),
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
    DatepickerModule,
    EasypiechartDirective,
    FocusDirective,
    FormsModule,
    FlotDirective,
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
    ScrollableDirective,
    SparklineDirective,
    TabsModule,
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
