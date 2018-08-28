import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

// Servicios
import { CandidatosService } from '../../../../../service';

@Component({
  selector: 'app-area-exp',
  templateUrl: './area-exp.component.html',
  styleUrls: ['./area-exp.component.scss'],
  providers: [CandidatosService]
})
export class AreaExpComponent implements OnInit {
  // Declarar variables.
  Areasexp: any[];
  aresexpCtrl: FormControl;
  filteredareaexp: Observable<any[]>;
  filtroareaexp: any;
  IdExp: number;
  @Output()
  change: EventEmitter<number> = new EventEmitter<number>();

  constructor(private service: CandidatosService) {
    this.aresexpCtrl = new FormControl();
  }

  ngOnInit() {
    this.service.getareasexp()
    .subscribe(data => {
      this.Areasexp = data;
      this.filteredareaexp = this.aresexpCtrl.valueChanges
        .pipe(startWith(''),
        map(area => area ? this.filterareaexp(area) : this.Areasexp.slice()));
    });
  }

  filterareaexp(area: string) {
    return this.filtroareaexp = this.Areasexp.filter(areaexp =>
      areaexp.areaExperiencia.toLowerCase().indexOf(area.toLowerCase()) === 0);
  }

  SendIdExp(){
    this.filteredareaexp = this.aresexpCtrl.valueChanges
      .pipe(startWith(''),
      map(area => area ? this.filterareaexp(area) : this.Areasexp.slice()));

    if(this.filtroareaexp != null){
      this.IdExp = this.filtroareaexp[0].id;
      this.change.emit(this.IdExp);
      }

  }

}
