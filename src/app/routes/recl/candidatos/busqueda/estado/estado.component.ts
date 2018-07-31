import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

// Servicios
import { CandidatosService } from '../../../../../service/index';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.scss'],
  providers: [CandidatosService]
})
export class EstadoComponent implements OnInit, OnChanges {
 // Variables
  @Input('Pais') filtropais: any;
  Estados: any[];
  StatesCtrl: FormControl;
  filteredStates: Observable<any[]>;
  // Sacamos el filtro para verlo en busqueda.
  filtroestado: any;
  @Input() IdEstado: any = 0;
  @Output()
  change: EventEmitter<number> = new EventEmitter<number>();

  constructor(private service: CandidatosService) {
    this.StatesCtrl = new FormControl();
    // this.StatesCtrl = new FormControl();
  }
  ngOnInit(){
  }
  ngOnChanges(changes: SimpleChanges){
    if(changes.filtropais && !changes.filtropais.isFirstChange()){
      this.SendIdState();
    }
  }

  filterState(estado: string) {
    return this.filtroestado = this.Estados.filter(state =>
      state.estado.toLowerCase().indexOf(estado.toLowerCase()) === 0);
  }

  SendIdState(){
    if (this.filtropais != null){
      this.service.getestados(this.filtropais)
      .subscribe(data => {
        this.Estados = data.estados;
        this.filteredStates = this.StatesCtrl.valueChanges
          .pipe(startWith(''),
            map(estado => estado ? this.filterState(estado) : this.Estados.slice())
          );
      })
      if(this.filtroestado != null){
      this.IdEstado = this.filtroestado[0].id;
      this.change.emit(this.IdEstado);
      }
    }
  }

}
