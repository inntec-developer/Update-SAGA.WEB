import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal-examenes',
  templateUrl: './principal-examenes.component.html',
  styleUrls: ['./principal-examenes.component.scss']
})
export class PrincipalExamenesComponent implements OnInit {

  viewEnt = true;
  viewTec = false;
  viewPsic = false;
  viewMd = false;
  constructor() { }

  ngOnInit() {
  }

}
