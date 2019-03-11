import { ComponentsModule } from './../../components/components.module';


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformeComponent } from './informe/informe.component';
import { TablaReporteComponent } from './tabla-reporte/tabla-reporte.component';
import { ReportesService} from '../../service/Reporte/reportes.service';
import { ExcelService} from '../../service/ExcelService/excel.service';
import { PaginationConfig, PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoverModule, TooltipModule } from 'ngx-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReporteGeneralComponent } from './reporte-general/reporte-general.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { INgxSelectOptions, NgxSelectModule } from 'ngx-select-ex';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { DatePipe } from '@angular/common';

const routes:Routes =[
  {path: 'informe', component:InformeComponent},
  {path: 'reporteGeneral', component: ReporteGeneralComponent}
]

const CustomSelectOptions: INgxSelectOptions = { // Check the interface for more options
  optionValueField: 'id',
  optionTextField: 'name'
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxSpinnerModule,
    NgScrollbarModule,
    PopoverModule,
    TooltipModule,
    ComponentsModule,
    NgxSelectModule.forRoot(CustomSelectOptions),
    FormsModule,
    ReactiveFormsModule
  //  DatePipe
  ],
  declarations: [InformeComponent, TablaReporteComponent, ReporteGeneralComponent],
  providers: [ReportesService,ExcelService]
})
export class ReportesModule { }
