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
//import { DatePipe } from '@angular/common';

const routes:Routes =[
  {path: 'informe', component:InformeComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxSpinnerModule
  //  DatePipe
  ],
  declarations: [InformeComponent, TablaReporteComponent],
  providers: [ReportesService,ExcelService]
})
export class ReportesModule { }
