import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {DomSanitizer} from '@angular/platform-browser';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';

@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.scss']
})
export class CandidatosComponent implements OnInit {

  public filtradocandidatos: any;
  public Expanded: boolean = false;

  Filtrado(event) {
    this.filtradocandidatos = event;
    this.Expanded = true;
  }

  ngOnInit(){
  }
}
