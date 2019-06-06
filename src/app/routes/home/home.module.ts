import { RouterModule, Routes } from '@angular/router';

import { ComponentsModule } from './../../components/components.module';
import { HomeComponent } from './home/home.component';
import { NgModule, } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { StarCalendarioComponent } from './star-calendario/star-calendario.component';
import { ToolsModule } from '../../tools/tools.module';

const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'Calendario', component: StarCalendarioComponent}
];
@NgModule({
    imports: [
      SharedModule,
      ToolsModule,
      RouterModule.forChild(routes),
      ComponentsModule
    ],
    declarations: [
        HomeComponent,
        StarCalendarioComponent
    ],
    exports: [
        RouterModule,
    ],
    providers: []
})
export class HomeModule { }
