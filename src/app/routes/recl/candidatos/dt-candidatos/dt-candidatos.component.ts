import { DtBusquedaCandidatosComponent } from './../../../../components/dt-busqueda-candidatos/dt-busqueda-candidatos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ToasterConfig, ToasterService } from 'angular2-toaster';

import { CandidatosService } from '../../../../service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dt-candidatos',
  templateUrl: './dt-candidatos.component.html',
  styleUrls: ['./dt-candidatos.component.scss'],
  providers: [CandidatosService]
})
export class DtCandidatosComponent implements OnInit, OnChanges {

  // Variables utilizadas. ***
  @Input('Filtrado') FCandidatos: any; // Datos que reciben del filtro. ***
  @Input('expanded') Expanded: boolean;

  candidatos: any;
  step = 0;
  infoCnd = 0;
  idCandidato: any;
  showCandidato = false;
activar = false;
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    limit: 7,
    tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true,
    preventDuplicates: true
  });

  spinner = false;
  setInfoCnd(index: number) {
    this.infoCnd = index;
  }

  setStep(index: number) {
    this.step = index;
  }

  SiguienteStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor(private service: CandidatosService, public dialog: MatDialog, private _Router: Router,
    private _Route: ActivatedRoute, toasterService: ToasterService) {
  }

  // Captamos la variable de la busqueda de candidatos para ver si tiene cambios. ***
  ngOnChanges(changes: SimpleChanges) {
    if (changes.FCandidatos && !changes.FCandidatos.isFirstChange()) {
      this.candidatos = this.FCandidatos;
      this.setInfoCnd(0);
      this.showCandidato = false;
    }
  }

  // Agregamos la carga para la tabla de candidatos. ***
  ngOnInit() {
    this.spinner = true;
      this.service.getTopCandidatos().subscribe(data => {
        this.spinner = false;
        this.candidatos = data;
      });
 }

  // Boton de ver de la tabla de candidatos. ***
  vercandidato(id): void {
    this.idCandidato = id;
    this.showCandidato = true;
    this.setInfoCnd(1);
  }

}

