import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
  constructor(private _Router: Router,
    private _Route: ActivatedRoute) {
    this._Route.queryParams.subscribe(params => {
      if (params['ruta'] != null) {
        if (params['ruta'] === '1') {
          this.viewEnt = true;
          this.viewTec = false;
          this.viewPsic = false;
          this.viewMd = false;
        } else if (params['ruta'] === '2') {
          this.viewTec = true;
          this.viewPsic = false;
          this.viewMd = false;
          this.viewEnt = false;
        } else if (params['ruta'] === '3') {
          this.viewPsic = true;
          this.viewTec = false;
          this.viewMd = false;
          this.viewEnt = false;
        } else {
          this.viewMd = true;
          this.viewTec = false;
          this.viewPsic = false;
          this.viewMd = false;
          this.viewEnt = false;
        }
      }
    });
   }

  ngOnInit() {
  }

}
