import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-expediente-contratados',
  templateUrl: './expediente-contratados.component.html',
  styleUrls: ['./expediente-contratados.component.scss']
})
export class ExpedienteContratadosComponent implements OnInit {
  candidato: any;
  candidatoId: any;
  reclutador: any;
  folio: any;
  foto: string;
  vBtra: any;
files = [];
  constructor(private _Router: Router,
     private activateRoute: ActivatedRoute,
    ) {
    this.activateRoute.params.subscribe(params => {
      if (params['candidatoId'] != null) {
        this.candidatoId = params['candidatoId'];
        this.candidato = params['nombre'];
        this.reclutador = params['reclutador'];
        this.folio = params['folio'];
        this.vBtra = params['vbtra'];
        this.foto = params['foto'];
      }
    });
  }

  ngOnInit() {
  }

  regresar() {
    this._Router.navigate(
      ['/admin/filesContratados'],
      { skipLocationChange: true }
    );
}
errorImg() {
  this.foto = '/assets/img/user/default-user.png';
}

}
