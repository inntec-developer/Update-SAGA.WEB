import { PantallaGGComponent } from './pantalla-gg/pantalla-gg.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ToolsModule } from '../../tools/tools.module';
import { ChartsModule as Ng2ChartsModule } from 'ng2-charts/ng2-charts';
import { TablaEquiposComponent } from './tabla-equipos/tabla-equipos.component';

const routes: Routes = [
  { path: 'gerentegeneral', component: PantallaGGComponent}
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ToolsModule,
    RouterModule.forChild(routes),
    Ng2ChartsModule
  ],
  declarations: [
    PantallaGGComponent,
    TablaEquiposComponent
  ],
  exports: [
    RouterModule
  ],
})
export class EquiposModule { }
