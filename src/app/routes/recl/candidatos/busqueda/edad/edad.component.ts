import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-edad',
  templateUrl: './edad.component.html',
  styleUrls: ['./edad.component.scss']
})
export class EdadComponent implements OnInit {

  Edad: number;
  @Output()
  change: EventEmitter<number> = new EventEmitter<number>();


  FiltroEdad(edad: number){
    this.Edad = edad;
    this.change.emit(this.Edad);
  }

   constructor(fb: FormBuilder) {
   }

  ngOnInit() {
  }

}
