import { Component, OnInit } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { DlgRevisarExamenesComponent } from '../../../components/dlg-revisar-examenes/dlg-revisar-examenes.component';
import { ExamenesService } from '../../../service/Examenes/examenes.service';
import { MatDialog } from '@angular/material';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { SettingsService } from '../../../core/settings/settings.service';
import { SistTicketsService } from '../../../service/SistTickets/sist-tickets.service';

@Component({
  selector: 'app-revision-examenes',
  templateUrl: './revision-examenes.component.html',
  styleUrls: ['./revision-examenes.component.scss']
})
export class RevisionExamenesComponent implements OnInit {
  /* variables scroll */
  disabled = false;
  compact = false;
  invertX = false;
  invertY = false;
  shown = 'hover';

  fila = [];
  ticket = [];
  examen = [];
  clavesRequi = [];
  clave = "";
  activas = false;
  slcClave;
  catalogo: any = [];
  examenes: any = [];
  examenId = 0;;
  examenasignado = true;
  iniciarexamen = false;
  atender = false;

  constructor(
    config: NgbTabsetConfig,
    private _service: SistTicketsService,
    private _serviceExamen: ExamenesService,
    private toasterService: ToasterService,
    private dialog: MatDialog,
    private settings: SettingsService) {
    config.justify = 'center';
    config.type = 'pills';
    setInterval(() => this.timeWait(), 60000);
  }

  ngOnInit() {
    this.GetFilaTickets();
  }

  public GetFilaTickets() {
    this._service.GetFilaTickets(3, this.settings.user['id']).subscribe(data => {
      this.fila = data;
    })
  }

  GetTicket() {
    this._service.GetTicketExamen(this.fila[0].ticketId).subscribe(data => {
      this.ticket = data;
      this.GetExamen();
      this.GetClaves();
      this.GetFilaTickets();
      this.atender = true;
    })
  }

  GetExamen() {
    this._serviceExamen.GetExamenRequi(this.ticket[0].requisicionId).subscribe(data => {
      this.examen = data;
      if (this.examen.length == 0) {
        this.examenasignado = false;
        this.GetCatalogoExamenes();
      }
    })

  }

  GetClaves() {

    this._serviceExamen.GetClaves(this.ticket[0].requisicionId).subscribe(data => {
      this.clavesRequi = data;
      this.clavesRequi[0].claves.filter(item => {
        if (item.activo == 0) {
          this.activas = true;
        }
      })
    })
  }

  AgregarClave(clave) {
    var repetida = false;
    if (clave.length == 16) {
      if (this.clavesRequi[0].claves.length > 0) {
        this.clavesRequi[0].claves.filter(i => {
          i.nueva = false;
          if (i.clave === clave) {
            repetida = true;
          }
        });

        if (!repetida) {
          this.clavesRequi[0].claves.push({ clave: clave, activo: 0, nueva: true })
        }
      }
      else {
        this.clavesRequi[0].claves.push({ clave: clave, activo: 0, nueva: true })

      }

      this.clave = "";
    }

  }
  Agregar(clave) {
    var aux = [{ RequisicionId: this.ticket[0].requisicionId, UsuarioId: this.settings.user['id'], Clave: clave }];
    this.activas = true;
    this._serviceExamen.InsertClaves(aux).subscribe(data => {
      if (data == 200) {
        this.popToast('success', 'Generar Claves', 'Las claves se agregaron con éxito');
        this.GetClaves();
      }
      else {
        this.popToast('error', 'Generar Claves', 'Ocurrio un error al intentar agregar claves');

      }
    })
  }

  PopClave(row) {
    this.clavesRequi[0].claves = this.clavesRequi[0].claves.filter(function (item) {
      if (item.clave !== row) {
        return item;
      }
    });
  }

  AsignarClave() {
    var objeto = { CandidatoId: this.ticket[0].candidato.candidatoId, RequisicionId: this.ticket[0].requisicionId, RequiClaveId: this.slcClave, Resultado: 'SIN RESULTADO', UsuarioId: this.settings.user['id'] };
    this._serviceExamen.AsignarClaveCandidato(objeto).subscribe(data => {
      if (data == 200) {
        this.slcClave = '';
        this.ticket[0].candidato.estatus = 'EVALUACIÓN PSICOMÉTRICA';
        this.ticket[0].candidato.estatusId = 15;

        this.popToast('success', 'Asignar Clave', 'Los cambios se realizaron con éxito');
        this.GetClaves();
      }
      else {
        this.popToast('error', 'Asignar Clave', 'Ocurrio un error al intentar asignar clave');

      }
    })
  }

  GetCatalogoExamenes() {
    this._serviceExamen.GetCatalogo().subscribe(data => {
      this.catalogo = data;
    })
  }

  GetExamenes(tipoexamenId) {
    this._serviceExamen.GetExamenes(tipoexamenId).subscribe(data => {
      this.examenes = data;
    })
  }

  VerExamen(ExamenId) {
    this._serviceExamen.GetExamen(ExamenId).subscribe(data => {
      this.examen = data;
    })
  }

  AsignarExamen() {

    var relacion = [{ RequisicionId: this.ticket[0].requisicionId, ExamenId: this.examenId }];

    this._serviceExamen.InsertRelacion(relacion).subscribe(data => {
      if (data == 200) {
        this.popToast('success', 'Asignar Examen', 'La relacion requisición examen se genero con éxito');
        this.GetExamen();
        this.examenasignado = true;
      }
      else {
        this.popToast('error', 'Asignar Examen', 'Ocurrio un error');
        this.examenasignado = false;
      }
    })
  }

  IniciarExamen() {
    this.iniciarexamen = true;

    let objeto = { ExamenId: this.examen[0].examenId, CandidatoId: this.ticket[0].candidato.candidatoId, RequisicionId: this.ticket[0].requisicionId, Resultado: 0 };
    this._service.SetExamen(objeto).subscribe(data => {
      if (data == 200) {
        this.examenId = 0;
        this.ticket[0].candidato.estatus = 'EVALUACIÓN TÉCNICA';
        this.ticket[0].candidato.estatusId = 13;
      }
    })
  }

  OpenDialogRevisar() {
    this._serviceExamen.GetResultadosCandidato(this.ticket[0].candidato.candidatoId, this.ticket[0].requisicionId).subscribe(data => {
      let aux = data;
      aux[0].candidatoId = this.ticket[0].candidato.candidatoId;
      aux[0].requisicionId = this.ticket[0].requisicionId;

      let dialog = this.dialog.open(DlgRevisarExamenesComponent, {
        width: '60%',
        height: 'auto',
        disableClose: true,
        data: aux
      });
      dialog.afterClosed().subscribe(result => {

        this._service.SetEstatusCandidato(this.ticket[0].candidato.candidatoId, this.ticket[0].requisicionId, 13).subscribe(data => {
          this.ticket[0].candidato.estatus = 'EVALUACIÓN TÉCNICA';
          this.ticket[0].candidato.estatusId = 13;

        })
      });
    })
  }

  public Finalizar() {
    this._service.UpdateStatusTicket(this.ticket[0].ticketId, 4, 1).subscribe(data => {
      if (data == 200) {
        this.Reiniciar();

      }
    });
  }

  Reiniciar() {
    this.ticket = [];
    this.examen = [];
    this.clavesRequi = [];
    this.clave = "";
    this.activas = false;
    this.slcClave = '';
    this.catalogo = [];
    this.examenes = [];
    this.examenId = 0;;
    this.examenasignado = true;
    this.iniciarexamen = false;
    this.atender = false;
  }
  timeWait() {
    this.GetFilaTickets();
    let d = new Date();
    let s = d.getSeconds() * 6;
    let m = d.getMinutes();
    if (this.fila.length > 0) {
      this.fila.forEach(e => {
        var mocos = new Date(e.fch_Creacion);
        e.te = m + mocos.getUTCMinutes()
      })
    }

  }


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

  popToast(type, title, body) {
    var toast: Toast = {
      type: type,
      title: title,
      timeout: 4000,
      body: body
    }
    this.toasterService.pop(toast);

  }

}
