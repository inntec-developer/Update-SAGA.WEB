import { Component, Input, OnInit } from '@angular/core';

import { ApiConection } from './../../service/api-conection.service';
import { InfoCandidatoService } from '../../service/SeguimientoVacante/info-candidato.service';

@Component({
  selector: 'app-info-candidato',
  templateUrl: './info-candidato.component.html',
  styleUrls: ['./info-candidato.component.scss'],
  providers: [InfoCandidatoService]
})
export class InfoCandidatoComponent implements OnInit {
  candidato: any;
  @Input('Id') CandidatoId: string;
  private countVacantes: number;
  constructor(
    private _serviceCandidato: InfoCandidatoService
  ) {
    this.countVacantes = 0;
  }

  ngOnInit() {
    this.CandidatoId = '4F65DAC1-C6A0-E811-80E8-9E274155325E'
    this._serviceCandidato.getInfoCandidato(this.CandidatoId).subscribe(data => {
      this.candidato = {
        picture: localStorage.getItem('ConexionBolsa') + data.foto,
        nombre: data.nombre,
        aboutMe: data.aboutMe[0]['acercaDeMi'],
        edad: data.edad,
        genero: data.genero,
        correo: data.email.email,
        telefonos: data.telefono,
        direccion: data.direccion,
        estatus: data.estatus,
        about: data.aboutMe[0],
        info: data.candidato

      }
    });
  }

}
