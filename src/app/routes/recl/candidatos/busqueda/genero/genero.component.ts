import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

// Servicios
import { CandidatosService } from '../../../../../service/index';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.scss'],
  providers: [CandidatosService]
})
export class GeneroComponent implements OnInit {

  // Declarar variables.
    Generos: any[];
    generoCtrl: FormControl;
    filteredgenero: Observable<any[]>;
    filtrogenero: any;
    Idgenero: number;
    @Output()
    change: EventEmitter<number> = new EventEmitter<number>();

  constructor(private service: CandidatosService) {
    this.generoCtrl = new FormControl();
  }

  ngOnInit() {
    this.service.getgeneros()
    .subscribe(data => {
      this.Generos = data;
      this.filteredgenero = this.generoCtrl.valueChanges
        .pipe(startWith(''),
        map(genero => genero ? this.filtergenero(genero) : this.Generos.slice()));
    })
  }

  filtergenero(genero: string) {
    return this.filtrogenero = this.Generos.filter(generos =>
      generos.genero.toLowerCase().indexOf(genero.toLowerCase()) === 0);
  }

  SendIdGenero(){
    this.filteredgenero = this.generoCtrl.valueChanges
      .pipe(startWith(''),
      map(genero => genero ? this.filtergenero(genero) : this.Generos.slice()));

    if(this.filtrogenero != null){
      this.Idgenero = this.filtrogenero[0].id;
      this.change.emit(this.Idgenero);
    }
  }

}
