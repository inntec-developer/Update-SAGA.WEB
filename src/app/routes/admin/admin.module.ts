import {DataTableModule, SharedModule} from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatInputModule, MatNativeDateModule, MatSelectModule, MatTooltipModule } from '@angular/material';
import { ModalModule, PopoverModule } from 'ngx-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import { AddGrupoComponent } from './add-grupo/add-grupo.component';
import { AddPersonaComponent } from './add-persona/add-persona.component';
import { AddRolesComponent } from './add-roles/add-roles.component';
import { AddadminComponent } from './admin/addadmin.component';
import { AgGridModule } from 'ag-grid-angular';
import { CardVacanteComponent } from '../../components/card-vacantes/card-vacante.component';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { CustomFormsModule } from 'ng2-validation';
import { DndModule } from 'ng2-dnd';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { FileUploadModule } from 'ng2-file-upload';
import { GridRolesComponent } from './add-roles/grid-roles/grid-roles.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ImageCropperModule } from 'ng2-img-cropper';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import { Ng2TableModule } from 'ng2-table';
import { NgModule } from '@angular/core';
import {NgxDatatableModule} from '@swimlane/ngx-datatable'
import { PagesModule } from '../pages/pages.module';
import { RegistroComponent } from './registro/registro.component';
import { RolGrupoComponent } from './rol-grupo/rol-grupo.component';
import { RollsStructComponent } from './rolls-struct/rolls-struct.component';
import { SelectModule } from 'ng2-select';
import { TreeModule } from 'angular-tree-component';
import { TreeTableModule } from 'primeng/primeng';
import { UploadImgsComponent } from './upload-imgs/upload-imgs.component';

const routes: Routes = [
    { path: 'roles', component: RollsStructComponent, data: {'componente':'Roles'} },
    { path: 'agregar', component: AddPersonaComponent, data: {'componente':'Usuarios'} },
    { path: 'grupo', component: AddadminComponent, data: {'componente':'Usuarios a grupos'} },
    { path: 'grupoAdd', component: AddGrupoComponent, data: {'componente':'Grupos'} },
    { path: 'rol', component: RolGrupoComponent, data: {'componente':'Grupos a roles'} },
    { path: 'privilegios', component: RollsStructComponent, data: {'componente':'Privilegios'}},
    { path: 'registro', component: RegistroComponent},
    { path: 'filemanager', component: FileManagerComponent }
];


@NgModule({
    imports: [
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
        TreeTableModule, 
        DataTableModule,
        SharedModule, 
        TreeModule
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
      FileManagerComponent,
      CardVacanteComponent
    ],
    exports: [
        RouterModule,
        AddPersonaComponent
    ], 
    providers: []
})

export class AdminModule {
  constructor() {	}
 }