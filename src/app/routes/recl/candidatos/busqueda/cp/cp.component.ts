import { Component, OnInit, Input, Output } from '@angular/core';
import {FormControl} from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

// Servicios
import { CandidatosService } from '../../../../../service';

@Component({
  selector: 'app-cp',
  templateUrl: './cp.component.html',
  styleUrls: ['./cp.component.scss']
})
export class CpComponent implements OnInit {

  // Variables
   @Input('Cp') filtroCp: any;
   Colonias: any[];
   ColoniaCtrl: FormControl;
   filteredColonia: Observable<any[]>;

  constructor() { }

  ngOnInit() {
  }

}
