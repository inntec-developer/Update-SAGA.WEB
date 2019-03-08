import { AlertModule, ModalModule, PopoverModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatInputModule, MatNativeDateModule, MatSelectModule, MatTooltipModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { AddGrupoComponent } from './add-grupo/add-grupo.component';
import { AddPersonaComponent } from './add-persona/add-persona.component';
import { AddRolesComponent } from './add-roles/add-roles.component';
import { AddadminComponent } from './admin/addadmin.component';
import { AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { CustomFormsModule } from 'ng2-validation';
import {DataTableModule} from 'primeng/primeng';
import { DndModule } from 'ng2-dnd';
import { FileUploadModule } from 'ng2-file-upload';
import { FilesContratadosComponent } from './files-contratados/files-contratados.component';
import { GridRolesComponent } from './add-roles/grid-roles/grid-roles.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ImageCropperModule } from 'ng2-img-cropper';
import { JobRequiPauseComponent } from './job-requi-pause/job-requi-pause.component';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import { Ng2TableModule } from 'ng2-table';
import { NgModule } from '@angular/core';
import {NgxDatatableModule} from '@swimlane/ngx-datatable'
import { PagesModule } from '../pages/pages.module';
import { PopupModalComponent } from './popup-modal/popup-modal.component';
import { RegistroComponent } from './registro/registro.component';
import { RolGrupoComponent } from './rol-grupo/rol-grupo.component';
import { RollsStructComponent } from './rolls-struct/rolls-struct.component';
import { SelectModule } from 'ng2-select';
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
        HttpClientModule,
        HttpModule,
        CommonModule,
        DndModule.forRoot(),
        MatSelectModule,
        SelectModule,
        MatNativeDateModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        CustomFormsModule,
        MatDatepickerModule,
        FileUploadModule,
        ImageCropperModule,
        Ng2TableModule,
        MatCheckboxModule,
        AgGridModule,
        NgxDatatableModule, 
        MatDialogModule, 
        MatTooltipModule,
        PagesModule,
        ComponentsModule,
        ModalModule.forRoot(),
        PopoverModule.forRoot(),
        DataTableModule,
        AlertModule.forRoot()
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