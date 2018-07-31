import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

import { EstadoComponent } from '../estado/estado.component';

// Servicios
import { CandidatosService } from '../../../../../service/index';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.scss'],
  providers: [CandidatosService]
})
export class PaisComponent implements OnInit {
// Declarar variables.
  @Input() IdPais: any = 0;
  Paises: any[];
  countryCtrl: FormControl;

  filtropais: any;
  filteredCountry: Observable<any[]>;
  @Output()
  change: EventEmitter<number> = new EventEmitter<number>();

  constructor(private service: CandidatosService) {
    this.countryCtrl = new FormControl();
  }

  filterCountry(pais: string) {
    return this.filtropais = this.Paises.filter(country =>
      country.pais.toLowerCase().indexOf(pais.toLowerCase()) === 0);
  }

  SendIdCountry(){
    if (this.filtropais != null){
      this.IdPais = this.filtropais[0].id;
      this.change.emit(this.IdPais);
    }else{
      this.IdPais = 0;
    }
  }

  ngOnInit(){
    this.service.getpaises()
    .subscribe(data => {
      this.Paises = data.paises;
      this.filteredCountry = this.countryCtrl.valueChanges
        .pipe(startWith(''),
        map(pais => pais ? this.filterCountry(pais) : this.Paises.slice()));
    })
  }

}
