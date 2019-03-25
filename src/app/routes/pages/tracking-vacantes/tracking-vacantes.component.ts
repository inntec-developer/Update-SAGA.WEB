import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tracking-vacantes',
  templateUrl: './tracking-vacantes.component.html',
  styleUrls: ['./tracking-vacantes.component.scss']
})
export class TrackingVacantesComponent implements OnInit {

  clienteId;

  constructor() { }

  ngOnInit() {
    this.clienteId = this.GetParam('cc');
  }

  GetParam(name){

    const results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if(!results){
      return 0;
    }
    return results[1] || 0;
  }
}
