import { RouterModule, Routes } from '@angular/router';

import { AddGrupoComponent } from './add-grupo/add-grupo.component';
import { AddPersonaComponent } from './add-persona/add-persona.component';
import { AddRolesComponent } from './add-roles/add-roles.component';
import { AddadminComponent } from './admin/addadmin.component';
import { ComponentsModule } from '../../components/components.module';
import { FilesContratadosComponent } from './files-contratados/files-contratados.component';
import { GridRolesComponent } from './add-roles/grid-roles/grid-roles.component';
import { JobRequiPauseComponent } from './job-requi-pause/job-requi-pause.component';
import { NgModule } from '@angular/core';
import { PopupModalComponent } from './popup-modal/popup-modal.component';
import { RegistroComponent } from './registro/registro.component';
import { RolGrupoComponent } from './rol-grupo/rol-grupo.component';
import { RollsStructComponent } from './rolls-struct/rolls-struct.component';
import { SharedModule } from '../../shared/shared.module';
import { UploadImgsComponent } from './upload-imgs/upload-imgs.component';

const routes: Routes = [
    { path: 'roles', component: RollsStructComponent, data: {'componente':'Roles'} },
    { path: 'agregar', component: AddPersonaComponent, data: {'componente':'Usuarios'} },
    { path: 'grupo', component: AddadminComponent, data: {'componente':'Usuarios a grupos'} },
    { path: 'grupoAdd', component: AddGrupoComponent, data: {'componente':'Grupos'} },
    { path: 'rol', component: RolGrupoComponent, data: {'componente':'Grupos a roles'} },
    { path: 'privilegios', component: RollsStructComponent, data: {'componente':'Privilegios'}},
    { path: 'registro', component: RegistroComponent},
    { path: 'filesContratados', component: FilesContratadosComponent},
    {path: 'jobPause', component:JobRequiPauseComponent}
];


@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        ComponentsModule,
      ],
    declarations:
    [
      AddadminComponent,
      AddPersonaComponent,
      AddGrupoComponent,
      AddRolesComponent,
      RolGrupoComponent,
      UploadImgsComponent,
      RollsStructComponent,
      RegistroComponent,
      GridRolesComponent ,
      UploadImgsComponent,
      FilesContratadosComponent,
      JobRequiPauseComponent,
      PopupModalComponent
    ],
    exports: [
        RouterModule
    ],
    providers: []
})

export class AdminModule {
  constructor() {	}
 }
