import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import {FormControl} from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

// Servicios
import { CandidatosService } from '../../../../../service';

@Component({
  selector: 'app-municipio',
  templateUrl: './municipio.component.html',
  styleUrls: ['./municipio.component.scss'],
  providers: [CandidatosService]
})
export class MunicipioComponent implements OnInit, OnChanges {
 // Variables
  @Input('Estado') filtroestado: any;
  Municipios: any[];
  MunicipioCtrl: FormControl;
  filteredMunicipio: Observable<any[]>;
  // Sacamos el filtro para verlo en busqueda.
  filtromunicipio: any;
  @Input() IdMunicipio: any = 0;
  @Output()
  change: EventEmitter<number> = new EventEmitter<number>();

  constructor(private service: CandidatosService) {
    this.MunicipioCtrl = new FormControl();
  }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges){
    if(changes.filtroestado && !changes.filtroestado.isFirstChange()){
      this.SendIdMunicipio();
    }
  }

  filterMunicipio(municipio: string) {
    return this.filtromunicipio = this.Municipios.filter(muni =>
        muni.municipio.toLowerCase().indexOf(municipio.toLowerCase()) === 0);
  }

  SendIdMunicipio(){
    if(this.filtroestado != null){
      this.service.getmunicipios(this.filtroestado)
      .subscribe(data => {
        this.Municipios = data.municipios;
        this.filteredMunicipio = this.MunicipioCtrl.valueChanges
          .pipe(startWith(''),
            map(municipio => municipio ? this.filterMunicipio(municipio) : this.Municipios.slice())
          );
      })
      if(this.filtromunicipio != null){
      this.IdMunicipio = this.filtromunicipio[0].id;
      this.change.emit(this.IdMunicipio);
      }
      }
  }
}
