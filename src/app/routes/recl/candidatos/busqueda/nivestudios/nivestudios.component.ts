import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { CandidatosService } from '../../../../../service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';

// Servicios


@Component({
  selector: 'app-nivestudios',
  templateUrl: './nivestudios.component.html',
  styleUrls: ['./nivestudios.component.scss'],
  providers: [CandidatosService]
})
export class NivestudiosComponent implements OnInit {

  // Declarar variables.
    nvestuidios: any[];
    nvestudiosCtrl: FormControl;
    filterednvestudios: Observable<any[]>;
    filtronv: any;
    Idnv: number;
    @Output()
    change: EventEmitter<number> = new EventEmitter<number>();

  constructor(private service: CandidatosService) {
    this.nvestudiosCtrl = new FormControl();
  }

  ngOnInit() {
    this.service.getnivelestudio()
    .subscribe(data => {
      this.nvestuidios = data;
      this.filterednvestudios = this.nvestudiosCtrl.valueChanges
        .pipe(startWith(''),
        map(nv => nv ? this.filternvestudio(nv) : this.nvestuidios.slice()));
    })
  }

  filternvestudio(nvest: string) {
    return this.filtronv = this.nvestuidios.filter(nv =>
      nv.gradoEstudio.toLowerCase().indexOf(nvest.toLowerCase()) === 0);
  }

  SendIdnv(){
    this.filterednvestudios = this.nvestudiosCtrl.valueChanges
      .pipe(startWith(''),
      map(nv => nv ? this.filternvestudio(nv) : this.nvestuidios.slice()));

   if(this.filtronv != null){
          this.Idnv = this.filtronv[0].id;
          this.change.emit(this.Idnv);
        }
  }


}
