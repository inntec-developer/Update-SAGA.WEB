import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  ClientId = 'A5029BD9-752C-E811-AF5F-C85B76218241';
  //VacanteId = '3558509A-0A69-E811-80E1-9E274155325E';
  VacanteId = 'D1C89BF9-D982-E811-80E2-9E274155325E';
  RequisicionId = 'F86B6366-34A2-E811-80E9-9E274155325E';
  constructor() { }

  ngOnInit() {
  }

}
