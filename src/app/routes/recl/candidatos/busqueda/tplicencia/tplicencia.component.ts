import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

// Servicios
import { CandidatosService } from '../../../../../service';

@Component({
  selector: 'app-tplicencia',
  templateUrl: './tplicencia.component.html',
  styleUrls: ['./tplicencia.component.scss'],
  providers: [CandidatosService]
})
export class TplicenciaComponent implements OnInit {

  // Declarar variables.
    tplicencia: any[];
    tplicCtrl: FormControl;
    filteredtplicencia: Observable<any[]>;
    filtrotplic: any;
    Idtplic: number;
    @Output()
    change: EventEmitter<number> = new EventEmitter<number>();

  constructor(private service: CandidatosService) {
    this.tplicCtrl = new FormControl();
  }

  ngOnInit() {
    this.service.gettplicencia()
    .subscribe(data => {
      this.tplicencia = data;
      this.filteredtplicencia = this.tplicCtrl.valueChanges
        .pipe(startWith(''),
        map(tp => tp ? this.filtertplicencia(tp) : this.tplicencia.slice()));
    })
  }

  filtertplicencia(tplic: string) {
    return this.filtrotplic = this.tplicencia.filter(tp =>
      tp.descripcion.toLowerCase().indexOf(tplic.toLowerCase()) === 0);
  }

SendIdTpLic(){
  this.filteredtplicencia = this.tplicCtrl.valueChanges
    .pipe(startWith(''),
    map(tp => tp ? this.filtertplicencia(tp) : this.tplicencia.slice()));

  if(this.filtrotplic != null){
        this.Idtplic = this.filtrotplic[0].id;
        this.change.emit(this.Idtplic);
      }

}

}
