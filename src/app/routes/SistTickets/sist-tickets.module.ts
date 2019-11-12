import { RouterModule, Routes } from '@angular/router';
import { CarruselArteVacantesComponent } from './carrusel-arte-vacantes/carrusel-arte-vacantes.component';
import { CarruselVacantesComponent } from './carrusel-vacantes/carrusel-vacantes.component';
import { ComponentsModule } from './../../components/components.module';
import { DlgAsignarModuloComponent } from './dlg-asignar-modulo/dlg-asignar-modulo.component';
import { EnAtencionComponent } from './en-atencion/en-atencion.component';
import { FilaTicketsComponent } from './fila-tickets/fila-tickets.component';
import { NgModule } from '@angular/core';
import { ReclutamientoModule } from './../recl/reclutamiento.module';
import { ReporteConcurrenciaComponent } from './reporte-concurrencia/reporte-concurrencia.component';
import { RevisionExamenesComponent } from './revision-examenes/revision-examenes.component';
import { SeguimientoTicketComponent } from './seguimiento-ticket/seguimiento-ticket.component';
import { SharedModule } from '../../shared/shared.module';
import { TicketCitaPruebaComponent } from './ticket-cita-prueba/ticket-cita-prueba.component';
import { ToolsModule } from '../../tools/tools.module';
import { VentaModule } from './../vtas/ventas.module';
import { RportTicketsGeneradosComponent } from './rport-tickets-generados/rport-tickets-generados.component';
import { RportAtencionTurnosComponent } from './rport-atencion-turnos/rport-atencion-turnos.component';
import { ExamenesModule } from '../Examenes/examenes.module';



const routes: Routes = [
  { path: 'turno', component: SeguimientoTicketComponent},
  { path: 'Inicio', component: DlgAsignarModuloComponent},
  { path: 'Examenes', component: RevisionExamenesComponent},
  { path: 'ticketConCita', component: TicketCitaPruebaComponent},
  {path: 'reporteConcurrencia', component: ReporteConcurrenciaComponent},
  { path: 'reporteTurnos', component: RportTicketsGeneradosComponent},
  { path: 'reporteAtencion', component: RportAtencionTurnosComponent}
];



@NgModule({
  imports: [
    SharedModule,
    ToolsModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    VentaModule,
    ReclutamientoModule,
    ExamenesModule
  ],
  declarations: [
    SeguimientoTicketComponent,
    FilaTicketsComponent,
    EnAtencionComponent,
    CarruselVacantesComponent,
    CarruselArteVacantesComponent,
    DlgAsignarModuloComponent,
    RevisionExamenesComponent,
    TicketCitaPruebaComponent,
    ReporteConcurrenciaComponent,
    RportTicketsGeneradosComponent,
    RportAtencionTurnosComponent
  ],
  exports:[CarruselVacantesComponent, EnAtencionComponent, CarruselArteVacantesComponent]
})
export class SistTicketsModule { }
