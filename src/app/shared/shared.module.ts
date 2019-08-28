import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, MatPaginatorIntl } from '@angular/material';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { PaginationConfig, PaginationModule } from 'ngx-bootstrap/pagination';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { getSpanishPaginatorBtp, getSpanishPaginatorIntl } from '../core/translator/config-paginator/config-paginator.component';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AgmCoreModule } from '@agm/core';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CheckallDirective } from './directives/checkall/checkall.directive';
import { ChkButtonsDirective } from './directives/chk-privilegios-buttons/chk-buttons.directive';
import { ChkPrivilegiosMenuDirective } from './directives/checkPrivilegios/chk-privilegios-menu.directive';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ColorPickerService } from 'ngx-color-picker';
import { ColorsService } from './colors/colors.service';
import { CommonModule } from '@angular/common';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { EasypiechartDirective } from './directives/easypiechart/easypiechart.directive';
import { FlotDirective } from './directives/flot/flot.directive';
import { JqcloudDirective } from './directives/jqcloud/jqcloud.directive';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MonedaPipe } from './pipes/moneda.pipe';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NowDirective } from './directives/now/now.directive';
import { NumericoPipe } from './pipes/numerico.pipe';
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

// https://angular.io/styleguide#!#04-10
@NgModule({
  imports: [

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCvtCCb5IK8MQbFiXe4J2F5LIQqa5fLeSY'
    }),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    AccordionModule.forRoot(),
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    DatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    ProgressbarModule.forRoot(),
    RatingModule.forRoot(),
    TabsModule.forRoot(),
    TimepickerModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    TypeaheadModule.forRoot(),
    ToasterModule,
    NgScrollbarModule,
    NgbModule,
  ],
  providers: [
    ColorsService,
    ColorPickerService,
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
    { provide: PaginationConfig, useValue: getSpanishPaginatorBtp() },
    { provide: MAT_DATE_LOCALE, useValue: 'en-MX'},
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
    MonedaPipe,
    NumericoPipe
  ],
  exports: [
    AgmCoreModule ,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,
    AccordionModule,
    AlertModule,
    ButtonsModule,
    CarouselModule,
    CollapseModule,
    DatepickerModule,
    BsDropdownModule,
    ModalModule,
    PaginationModule,
    ProgressbarModule,
    RatingModule,
    TabsModule,
    TimepickerModule,
    TooltipModule,
    PopoverModule,
    TypeaheadModule,
    ToasterModule,
    FlotDirective,
    SparklineDirective,
    EasypiechartDirective,
    CheckallDirective,
    VectormapDirective,
    NowDirective,
    ScrollableDirective,
    JqcloudDirective,
    NowDirective,
    ScrollableDirective,
    TreeGridDirective,
    ChkPrivilegiosMenuDirective,
    ChkButtonsDirective,
    NgScrollbarModule,
    NgbModule,
    MonedaPipe,
    NumericoPipe
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
