import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  ClientId : any;
  //VacanteId = '3558509A-0A69-E811-80E1-9E274155325E';
  VacanteId : any;
  RequisicionId : any;
  
  constructor() { }

  ngOnInit() {
    this.ClientId = 'A5029BD9-752C-E811-AF5F-C85B76218241';
    this.VacanteId = 'D1C89BF9-D982-E811-80E2-9E274155325E';
  this.RequisicionId = '839745C5-6DB0-E811-80E9-9E274155325E';
  }

}
