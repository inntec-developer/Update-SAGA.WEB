import { Component, OnInit } from '@angular/core';

import { ExamenesService } from './../../../service/Examenes/examenes.service';

@Component({
  selector: 'app-contestar-examen',
  templateUrl: './contestar-examen.component.html',
  styleUrls: ['./contestar-examen.component.scss']
})
export class ContestarExamenComponent implements OnInit {

  examen = [];
  Resp = [];
  candidatoId = '8E283A4F-C7BA-E811-80EA-9E274155325E'
  constructor(private service: ExamenesService) { }
  nomExamen: any;

  ngOnInit() {
    this.GetExamen();
  }


  GetExamen()
  {
    this.service.GetExamen(64).subscribe(data => {
      this.examen = data;
    });
  }

  AddRespuestas(preguntaId, respuestaId, resp)
  {
    if(this.Resp.length > 0)
    {
      let flag = false;

      this.Resp = this.Resp.filter(item =>{

        if(item.preguntaId == preguntaId)
        {
          item.value = resp;
          flag = true;
        }
        return item;

      });

      if(!flag)
      {
        this.Resp.push({CandidatoId:this.candidatoId, PreguntaId: preguntaId, RespuestaId: respuestaId, Value: resp})
      }
    }
    else
    {
      this.Resp.push({CandidatoId:this.candidatoId, PreguntaId: preguntaId, RespuestaId: respuestaId, Value: resp});
    }

  }

  Agregar()
  {
    this.service.InsertRespCandidato(this.Resp).subscribe(data => {
    });
  }
}
