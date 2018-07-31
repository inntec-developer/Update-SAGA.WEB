import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.scss']
})
export class CandidatosComponent implements OnInit {

  filtradocandidatos: any;

  Filtrado(event) {
    this.filtradocandidatos = event;
  }

  ngOnInit(){

  }
}
