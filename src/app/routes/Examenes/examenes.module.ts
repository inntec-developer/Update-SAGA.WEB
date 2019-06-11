import { RouterModule, Routes } from '@angular/router';

import { AddExamenComponent } from './add-examen/add-examen.component';
import { AgregarResultadosPsicoComponent } from './agregar-resultados-psico/agregar-resultados-psico.component';
import { AsignarExamenComponent } from './asignar-examen/asignar-examen.component';
import { AsignarPsicometricosComponent } from './asignar-psicometricos/asignar-psicometricos.component';
import { ComponentsModule } from './../../components/components.module';
import { ContestarExamenComponent } from './contestar-examen/contestar-examen.component';
import { HistorialClavesComponent } from './historial-claves/historial-claves.component';
import { NgModule } from '@angular/core';
import { RequisicionesService } from '../../service';
import { RevisarExamenesComponent } from './revisar-examenes/revisar-examenes.component';
import { SharedModule } from './../../shared/shared.module';
import { ToolsModule } from '../../tools/tools.module';
import { AgregarResultMedicosComponent } from './agregar-result-medicos/agregar-result-medicos.component';

const routes: Routes = [
  { path: 'addexamen', component: AddExamenComponent },
  { path: 'asignar', component: AsignarExamenComponent },
  { path: 'contestar', component: ContestarExamenComponent },
  { path: 'revisar', component: RevisarExamenesComponent },
  { path: 'asignarClaves', component: AsignarPsicometricosComponent },
  { path: 'agregarResultPsico', component: AgregarResultadosPsicoComponent },
  { path: 'historialClaves', component: HistorialClavesComponent },
  { path: 'examenesMedicos', component: AgregarResultMedicosComponent }

];

@NgModule({
  imports: [
    SharedModule,
    ToolsModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [
    AddExamenComponent,
    AsignarExamenComponent,
    ContestarExamenComponent,
    AsignarPsicometricosComponent,
    AgregarResultadosPsicoComponent,
    HistorialClavesComponent,
    RevisarExamenesComponent,
    AgregarResultMedicosComponent,
    // DlgRevisarExamenesComponent
  ],
  exports: [
    RouterModule
  ],


  providers: [RequisicionesService,],

})
export class ExamenesModule {
}
