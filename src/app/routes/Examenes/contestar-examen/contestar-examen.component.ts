import { Component, OnInit } from '@angular/core';

import { ExamenesService } from './../../../service/Examenes/examenes.service';

@Component({
  selector: 'app-contestar-examen',
  templateUrl: './contestar-examen.component.html',
  styleUrls: ['./contestar-examen.component.scss']
})
export class ContestarExamenComponent implements OnInit {

  // scroll
  public disabled = false;
  public invertX = false;
  public compact = false;
  public invertY = false;
  public shown = 'hover';
  entrevista = [];
  Resp = [];
  overStar = {};
  percent = {};
calificacion = 0;
  constructor(private service: ExamenesService) { }
  nomExamen: any;

  ngOnInit() {
    this.GetEntrevista();
  }


  GetEntrevista() {
    this.service.GetEntrevista().subscribe(data => {
      this.entrevista = data;
      console.log(this.entrevista)
    });
  }

  public hoveringOver(value: number, id: number): void {
    this.overStar[id + '-'] = value;
    this.percent[id + '-'] = 100 * (value / 5);
  }

  public resetStar(preguntaId): void {
    this.overStar[preguntaId + '-'] = void 0;
  }

  AddRespuestas(preguntaId, value) {
    const resp = 100 * (value / 5);
    let val = false;
    this.Resp.filter(e => {
      if (e.PreguntaId === preguntaId) {
        e.Value = resp;
        val = true;
      }
    });

    if (!val) {
      this.Resp.push({ PreguntaId: preguntaId, Value: resp });
    }
    const sum = this.Resp.reduce(function (valorAnterior, valorActual, indice, vector) {
      return valorAnterior + valorActual.Value;
    }, 0);

    this.calificacion = sum / this.Resp.length;
  }

  Agregar()
  {
    this.service.InsertRespCandidato(this.Resp).subscribe(data => {
    });
  }
}
