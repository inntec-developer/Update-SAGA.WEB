import { Component, OnInit } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';
import { ExamenesService } from './../../../service/Examenes/examenes.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

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

 /**
   * configuracion para mensajes de acciones.
   */
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    limit: 7,
    tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true,
    preventDuplicates: true,
  });

  constructor(private service: ExamenesService, private toasterService: ToasterService,
    public dialog: MatDialogRef<ContestarExamenComponent>) { }
  nomExamen: any;

  ngOnInit() {
    this.GetEntrevista();
  }


  GetEntrevista() {
    this.service.GetEntrevista().subscribe(data => {
      this.entrevista = data;
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

  Agregar() {
this.dialog.close();
    this.popToast('error', 'Entrevista', 'Aún no tengo las preguntas');
    // this.service.InsertRespCandidato(this.Resp).subscribe(data => {
    // });
  }

  popToast(type, title, body) {
    const toast: Toast = {
      type: type,
      title: title,
      timeout: 4000,
      body: body
    };
    this.toasterService.pop(toast);

  }
}
