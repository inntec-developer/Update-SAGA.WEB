import { Component, OnInit } from '@angular/core';
import { ExamenesService } from '../../../service/Examenes/examenes.service';

@Component({
  selector: 'app-historial-claves',
  templateUrl: './historial-claves.component.html',
  styleUrls: ['./historial-claves.component.scss']
})
export class HistorialClavesComponent implements OnInit {

  candidatos = [];

  constructor(private _service: ExamenesService) { }

  ngOnInit() {
    this.GetClavesCandidatos();
  }

  GetClavesCandidatos()
  {
    this._service.GetClavesByCandidatos().subscribe(data => {
      this.candidatos = data;
    });
  }
}
