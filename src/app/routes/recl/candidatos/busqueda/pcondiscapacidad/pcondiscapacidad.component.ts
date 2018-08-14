import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { CandidatosService } from '../../../../../service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';

// Servicios


@Component({
  selector: 'app-pcondiscapacidad',
  templateUrl: './pcondiscapacidad.component.html',
  styleUrls: ['./pcondiscapacidad.component.scss'],
  providers: [CandidatosService]
})
export class PcondiscapacidadComponent implements OnInit {

  // Declarar variables.
    pdiscapacidades: any[];
    pdiscapacidadCtrl: FormControl;
    filteredpdiscapacidad: Observable<any[]>;
    filtropd: any;
    Idpd: number;
    @Output()
    change: EventEmitter<number> = new EventEmitter<number>();


  constructor(private service: CandidatosService) {
    this.pdiscapacidadCtrl = new FormControl();
  }

  ngOnInit() {
    this.service.getdiscapacidad()
    .subscribe(data => {
      this.pdiscapacidades = data;
      this.filteredpdiscapacidad = this.pdiscapacidadCtrl.valueChanges
        .pipe(startWith(''),
        map(pdis => pdis ? this.filterpdiscapacidad(pdis) : this.pdiscapacidades.slice()));
    })
  }

  filterpdiscapacidad(pdiscapa: string) {
    return this.filtropd = this.pdiscapacidades.filter(pdisc =>
      pdisc.tipoDiscapacidad.toLowerCase().indexOf(pdiscapa.toLowerCase()) === 0);
  }

  SendIdPd(){
    this.filteredpdiscapacidad = this.pdiscapacidadCtrl.valueChanges
      .pipe(startWith(''),
      map(pdis => pdis ? this.filterpdiscapacidad(pdis) : this.pdiscapacidades.slice()));

    if(this.filtropd != null){
        this.Idpd = this.filtropd[0].id;
        this.change.emit(this.Idpd);
      }
  }

}
