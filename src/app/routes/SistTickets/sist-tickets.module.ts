import { RouterModule, Routes } from '@angular/router';

import { CarruselArteVacantesComponent } from './carrusel-arte-vacantes/carrusel-arte-vacantes.component';
import { CarruselVacantesComponent } from './carrusel-vacantes/carrusel-vacantes.component';
import { ComponentsModule } from './../../components/components.module';
import { DlgAsignarModuloComponent } from './dlg-asignar-modulo/dlg-asignar-modulo.component';
import { EnAtencionComponent } from './en-atencion/en-atencion.component';
import { FilaTicketsComponent } from './fila-tickets/fila-tickets.component';
import { NgModule } from '@angular/core';
import { ReclutamientoModule } from './../recl/reclutamiento.module';
import { RevisionExamenesComponent } from './revision-examenes/revision-examenes.component';
import { SeguimientoTicketComponent } from './seguimiento-ticket/seguimiento-ticket.component';
import { SharedModule } from '../../shared/shared.module';
import { TicketCitaPruebaComponent } from './ticket-cita-prueba/ticket-cita-prueba.component';
import { VentaModule } from './../vtas/ventas.module';
import { VerTurnosComponent } from './ver-turnos/ver-turnos.component';
import { ReporteConcurrenciaComponent } from './reporte-concurrencia/reporte-concurrencia.component';

const routes: Routes = [
  { path: 'turno', component: SeguimientoTicketComponent},
  { path: 'verTurno', component: VerTurnosComponent},
  { path: 'Inicio', component: DlgAsignarModuloComponent},
  { path: 'Examenes', component: RevisionExamenesComponent},
  { path: 'ticketConCita', component: TicketCitaPruebaComponent},
  {path: 'reporteConcurrencia', component: ReporteConcurrenciaComponent}
];



@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    VentaModule,
    ReclutamientoModule,
  ],
  declarations: [
    SeguimientoTicketComponent,
    VerTurnosComponent,
    FilaTicketsComponent,
    EnAtencionComponent,
    CarruselVacantesComponent,
    CarruselArteVacantesComponent,
    DlgAsignarModuloComponent,
    RevisionExamenesComponent,
    TicketCitaPruebaComponent,
    ReporteConcurrenciaComponent,
  ],
  exports:[CarruselVacantesComponent]
})
export class SistTicketsModule { }
