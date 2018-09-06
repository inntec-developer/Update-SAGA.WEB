import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { CandidatosService } from '../../../../service';
import { MatDialog } from '@angular/material';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-dt-candidatos',
  templateUrl: './dt-candidatos.component.html',
  styleUrls: ['./dt-candidatos.component.scss'],
  providers: [CandidatosService]
})
export class DtCandidatosComponent implements OnInit, OnChanges {

  // Variables utilizadas. ***
  @Input('Filtrado') FCandidatos: any; //Datos que reciben del filtro. ***  
  @Input('MisCandidatos') MisCandidatos: any;
  candidatos: any;
  step = 0;
  infoCnd = 0;
  idCandidato: any;
  showCandidato: boolean = false;

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
      this.ngOnInit();
    }
  }

  // Agregamos la carga para la tabla de candidatos. ***
  ngOnInit() {
    this.candidatos = this.FCandidatos;
  }

  // Boton de ver de la tabla de candidatos. ***
  vercandidato(id): void {
    this.idCandidato = id;
    this.showCandidato = true;
    this.setInfoCnd(1);
  }
}

