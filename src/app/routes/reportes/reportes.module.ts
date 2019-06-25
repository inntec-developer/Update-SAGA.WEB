import { RouterModule, Routes } from '@angular/router';

import { ComponentsModule } from './../../components/components.module';
import { ComponentsService } from '../../service/Components/components.service';
import { ExcelService } from '../../service/ExcelService/excel.service';
import { IndicadoresComponent } from './indicadores/indicadores.component';
import { InformeComponent } from './informe/informe.component';
import { NgModule } from '@angular/core';
import { ReporteGeneralComponent } from './reporte-general/reporte-general.component';
import { ReportesService } from '../../service/Reporte/reportes.service';
import { SharedModule } from '../../shared/shared.module';
import { TablaReporteComponent } from './tabla-reporte/tabla-reporte.component';
import { ToolsModule } from '../../tools/tools.module';
import { ProductividadComponent } from './productividad/productividad.component';
import { DetallereclutaComponent } from './detallerecluta/detallerecluta.component';
import { DetallecordinaComponent } from './detallecordina/detallecordina.component';
import { CoordinacionComponent } from './coordinacion/coordinacion.component';
import { CandidatobolsaComponent } from './candidatobolsa/candidatobolsa.component';
import { CatalogosService } from '../../service/catalogos/catalogos.service';

//import { DatePipe } from '@angular/common';

const routes:Routes =[
  {path: 'informe', component:InformeComponent},
  {path: 'reporteGeneral', component: ReporteGeneralComponent},
  {path: 'indicador', component: IndicadoresComponent}
]
@NgModule({
  imports: [
    SharedModule,
    ToolsModule,
    RouterModule.forChild(routes),
    ComponentsModule,
  ],
  declarations: [InformeComponent, TablaReporteComponent, ReporteGeneralComponent, IndicadoresComponent, ProductividadComponent, DetallereclutaComponent, DetallecordinaComponent, CoordinacionComponent, CandidatobolsaComponent],
  providers: [ReportesService,ExcelService,ComponentsService,CatalogosService]
})
export class ReportesModule { }
