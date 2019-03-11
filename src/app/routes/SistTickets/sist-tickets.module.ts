import { ReclutamientoModule } from './../recl/reclutamiento.module';
import { VentaModule } from './../vtas/ventas.module';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatOptionModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SeguimientoTicketComponent } from './seguimiento-ticket/seguimiento-ticket.component';

import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { VerTurnosComponent } from './ver-turnos/ver-turnos.component';
import { FilaTicketsComponent } from './fila-tickets/fila-tickets.component';
import { EnAtencionComponent } from './en-atencion/en-atencion.component';
import { CarruselVacantesComponent } from './carrusel-vacantes/carrusel-vacantes.component';
import { CarruselArteVacantesComponent } from './carrusel-arte-vacantes/carrusel-arte-vacantes.component';
import { DlgAsignarModuloComponent } from './dlg-asignar-modulo/dlg-asignar-modulo.component';

const routes: Routes = [
  { path: 'turno', component: SeguimientoTicketComponent},
  { path: 'verTurno', component: VerTurnosComponent},
  { path: 'Inicio', component: DlgAsignarModuloComponent},

];



@NgModule({
  imports: [
    CommonModule,
    SharedModule, 
    RouterModule.forChild(routes),
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatOptionModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    ComponentsModule,
    VentaModule,
    ReclutamientoModule,
    NgbModule
  ],
  declarations: [
    SeguimientoTicketComponent,
    VerTurnosComponent,
    FilaTicketsComponent,
    EnAtencionComponent,
    CarruselVacantesComponent,
    CarruselArteVacantesComponent,
    DlgAsignarModuloComponent,
    
  ],
  entryComponents: [],
})
export class SistTicketsModule { }
