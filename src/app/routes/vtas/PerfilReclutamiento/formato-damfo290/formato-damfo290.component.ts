import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formato-damfo290',
  templateUrl: './formato-damfo290.component.html',
  styleUrls: ['./formato-damfo290.component.scss']
})
export class FormatoDAMFO290Component implements OnInit {
  IdFormato: any;
  isNew: boolean = false;
  imprimir: boolean = false;

  constructor(
    private _Router: Router,
    private _Route: ActivatedRoute,
  ) {
    this._Route.params.subscribe(params => {
      if(params['IdFormato'] != null){
        this.IdFormato = params['IdFormato'];
        this.isNew = false;
      }
      else{
        this.isNew = true;
      }
    });
  }
  ngOnInit() {
  }

}
