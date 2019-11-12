import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-vacantes-reclutador',
  templateUrl: './vacantes-reclutador.component.html',
  styleUrls: ['./vacantes-reclutador.component.scss']
})
export class VacantesReclutadorComponent implements OnInit {
  imprimir: boolean = false;
folio = '';
  constructor( private activateRoute: ActivatedRoute) {
    this.activateRoute.params.subscribe(params => {
      if (params['folio'] != null) {
        this.folio = params['folio'];
      }
    });
   }

  ngOnInit() {
  }

}
