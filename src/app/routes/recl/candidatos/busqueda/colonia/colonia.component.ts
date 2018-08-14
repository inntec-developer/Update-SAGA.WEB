import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { CandidatosService } from '../../../../../service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';

// Servicios


@Component({
  selector: 'app-colonia',
  templateUrl: './colonia.component.html',
  styleUrls: ['./colonia.component.scss'],
  providers: [CandidatosService]
})
export class ColoniaComponent implements OnInit, OnChanges {

  // Variables
   @Input('Municipio') filtromunicipio: any;
   Colonias: any[];
   ColoniaCtrl: FormControl;
   filteredColonia: Observable<any[]>;
   // Sacamos el filtro para verlo en busqueda.
   filtroColonia: any;
   @Input() IdColonia: any = 0;
   @Output()
   change: EventEmitter<number> = new EventEmitter<number>();

  constructor(private service: CandidatosService) {
    this.ColoniaCtrl = new FormControl();
  }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges){
    if(changes.filtromunicipio && !changes.filtromunicipio.isFirstChange()){
      this.SendIdColonia();
    }
  }

  filterColonia(colonia: string) {
    return this.Colonias.filter(col =>
        col.colonia.toLowerCase().indexOf(colonia.toLowerCase()) === 0);
  }

  SendIdColonia(){
    if(this.filtromunicipio != null){
    this.service.getcolonias(this.filtromunicipio)
    .subscribe(data => {
      this.Colonias = data.colonias;
      this.filteredColonia = this.ColoniaCtrl.valueChanges
        .pipe(startWith(''),
          map(colonia => colonia ? this.filterColonia(colonia) : this.Colonias.slice())
        );
    })
    if(this.filtroColonia != null){
      this.IdColonia = this.filtroColonia[0].id;
      this.change.emit(this.IdColonia);
      }
    }
}
}
