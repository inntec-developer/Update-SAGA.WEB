import { ReportesService } from './../../service/Reporte/reportes.service';
import { CatalogosService } from './../../service/catalogos/catalogos.service';
import { AdminServiceService } from './../../service/AdminServicios/admin-service.service';
import { FileManagerComponent } from './../../components/file-manager/file-manager.component';
import { EditorArteRequisicionesComponent } from './../../components/editor-arte-requisiciones/editor-arte-requisiciones.component';
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
import { RolGrupoComponent } from './rol-grupo/rol-grupo.component';
import { RollsStructComponent } from './rolls-struct/rolls-struct.component';
import { SharedModule } from '../../shared/shared.module';
import { ToolsModule } from '../../tools/tools.module';
import { AdminPrincipalComponent } from './admin-principal/admin-principal.component';
import { CapturaPersonalComponent } from './captura-personal/captura-personal.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ExpedienteContratadosComponent } from './expediente-contratados/expediente-contratados.component';
import { PrincipalIngresosComponent } from './principal-ingresos/principal-ingresos.component';
import { GenerarGafeteComponent } from './generar-gafete/generar-gafete.component';
import { GenerarContratoComponent } from './generar-contrato/generar-contrato.component';

const routes: Routes = [
    { path: 'roles', component: AdminPrincipalComponent, data: {'componente': 'Roles'} },
    { path: 'agregar', component: AddPersonaComponent, data: {'componente': 'Usuarios'} },
    { path: 'grupo', component: AddadminComponent, data: {'componente': 'Usuarios a grupos'} },
    { path: 'grupoAdd', component: AddGrupoComponent, data: {'componente': 'Grupos'} },
    { path: 'rol', component: RolGrupoComponent, data: {'componente': 'Grupos a roles'} },
    { path: 'privilegios', component: RollsStructComponent, data: {'componente': 'Privilegios'}},
    { path: 'filesContratados',
      children: [
        {path: '', component: FilesContratadosComponent},
        {path: ':ruta', component: FilesContratadosComponent}
      ] },
    { path: 'ingresos', component: PrincipalIngresosComponent},
    { path: 'generarGafetes', component: GenerarGafeteComponent},
    { path: 'generarContrato', component: GenerarContratoComponent},
    { path: 'fileManager/:candidatoId/:ruta/:nombre/:reclutador/:folio/:vbtra/:foto', component: ExpedienteContratadosComponent},
    { path: 'capturaPersonal/:candidatoId/:folio/:vbtra', component: CapturaPersonalComponent},
    {path: 'jobPause', component: JobRequiPauseComponent},
    {path: 'editorArte', component: EditorArteRequisicionesComponent}
];

@NgModule({
    imports: [
        SharedModule,
        ToolsModule,
        RouterModule.forChild(routes),
        ComponentsModule
      ],
    declarations:
    [
      AddadminComponent,
      AddPersonaComponent,
      AddGrupoComponent,
      AddRolesComponent,
      RolGrupoComponent,
      RollsStructComponent,
      GridRolesComponent ,
      FilesContratadosComponent,
      JobRequiPauseComponent,
      PopupModalComponent,
      AdminPrincipalComponent,
      CapturaPersonalComponent,
      ExpedienteContratadosComponent,
      PrincipalIngresosComponent,
      GenerarGafeteComponent,
      GenerarContratoComponent
    ],
    exports: [
        RouterModule
    ],
    providers: [AdminServiceService, CatalogosService, CurrencyPipe, ReportesService, DatePipe]
})

export class AdminModule {
  constructor() {	}
 }
