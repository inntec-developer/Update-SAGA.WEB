import { DlgAsignarPerfilComponent } from './../../../components/dlg-asignar-perfil/dlg-asignar-perfil.component';
import { id } from '@swimlane/ngx-datatable/release/utils';
import { SistTicketsService } from './../../../service/SistTickets/sist-tickets.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogShowRequiComponent } from '../../recl/vacantes/vacantes/components/dialogs/dialog-show-requi/dialog-show-requi.component';
import { MatDialog } from '@angular/material';
import { InfoCandidatoService } from '../../../service/SeguimientoVacante/info-candidato.service';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';
import { RequisicionesService } from '../../../service';

@Component({
  selector: 'app-seguimiento-ticket',
  templateUrl: './seguimiento-ticket.component.html',
  styleUrls: ['./seguimiento-ticket.component.scss'],
  providers: [RequisicionesService]
})
export class SeguimientoTicketComponent implements OnInit {

  fila = [];
  ticket = [];
finalizar = false;
atender = false;
date = new Date;
timeW;
  postulaciones: any = [];
  loading: boolean;
  procesoCandidato: { candidatoId: any; requisicionId: any; folio: any; reclutador: any; reclutadorId: any; estatusId: number; };
  dataSource: any = [];
apartar = true;

  constructor( private _service: SistTicketsService, 
      private _Router: Router, private dialog: MatDialog, 
      private _serviceCandidato: InfoCandidatoService,  
      private toasterService: ToasterService,
      private service: RequisicionesService) { 
    setInterval(() => this.timeWait(), 1000);
  }

  ngOnInit() {
    this.GetFilaTickets();
    //this.GetTicket('6FD2758C-A533-E911-AF44-E4B31877AAB4');

  }

  public GetFilaTickets()
  {
    this._service.GetFilaTickets().subscribe( data => {
        this.fila = data;
    })
  }

  public GetTicket(ticketId)
  {
    this._service.GetTicketRecl(ticketId, sessionStorage.getItem('id')).subscribe(data => {
      this.ticket = data;
      this.ticket[0].estado == 3 ? this.finalizar = false : this.finalizar = true;
      this.ticket[0].estado == 2 ? this.atender = true : this.atender = false;

      this.GetPostulaciones(this.ticket[0].candidato.candidatoId);
      this.GetFilaTickets();
   
    })

  }
  GetPostulaciones(candidatoId)
  {
    this._service.GetPostulaciones(candidatoId).subscribe(data => {
      this.postulaciones = data;
      this.GetMisVacantes();
      console.log(this.postulaciones)
    })
  }

  GetMisVacantes() {
    this.service.getRequiReclutador(sessionStorage.getItem('id')).subscribe(data => {
      this.dataSource = data;
      console.log(this.dataSource)
    });
  }

  public Atender()
  {

    this._service.GetTicketPrioridad(sessionStorage.getItem('id')).subscribe(data => {
     this.GetTicket(data);
    })
   
  }

  public Finalizar(ticketId)
  {
    this._service.UpdateStatusTicket(ticketId).subscribe(data => {
      this.apartar = true;
      this.GetTicket(ticketId)

    })
  }

  _apartarCandidato(row, candidato) {
    if(row.reclutadores.length > 1)
    {

      let dialogDlt = this.dialog.open(DlgAsignarPerfilComponent, {
        width: '45%',
        disableClose: true,
        data: row.reclutadores
      });

      dialogDlt.afterClosed().subscribe(result => {
        this.procesoCandidato = {
          candidatoId: candidato.candidato.candidatoId,
          requisicionId:row.id,
          folio: row.folio,
          reclutador: result.nombre,
          reclutadorId: result.reclutadorId,
          estatusId: 12
        }
        console.log(this.procesoCandidato)
      });
    }
    else if(row.reclutadores.length == 1)
    {
      this.procesoCandidato = {
        candidatoId: candidato.candidato.candidatoId,
        requisicionId:row.id,
        folio: row.folio,
        reclutador: row.reclutadores[0].nombre,
        reclutadorId: row.reclutadores[0].reclutadorId,
        estatusId: 12
      }
      console.log(this.procesoCandidato)

    }
    else
    {
      
      this.loading = true;
      this.procesoCandidato = {
      candidatoId: candidato.candidato.candidatoId,
      requisicionId:row.id,
      folio: row.folio,
      reclutador: sessionStorage.getItem('nombre'),
      reclutadorId: sessionStorage.getItem('id'),
      estatusId: 12
      }
    }

    this._serviceCandidato.setApartarCandidato(this.procesoCandidato)
      .subscribe(data => {
        this.apartar = false;
        
        switch (data) {
          case 200: {
            this.loading = false;

            var msg = 'El candidato se aparto correctamente.';
            this.popToast('success', 'Apartado', msg);

            this.GetTicket(candidato.ticketId)
          
            break;
          }
          case 304: {
            msg = 'El candidato ya esta apartado o en proceso.';
            this.popToast('info', 'Apartado', msg); ''
            this.loading = false;

            break;
          }
          case 404: {
            var msg = 'Error el intentar apartar el candidato. Consulte al departamento de soporte si el problema persiste.';
            this.popToast('error', 'Apartado', msg);
            this.loading = false;

            break;
          }
          default: {
            var msg = 'Error inesperado y desconocido, reporte el problema el departamento de soporte.';
            this.popToast('error', 'Oops!!', msg);
            this.loading = false;

            break;
          }
        }
      }, err => {
        console.log(err);
      });
    

  }

  _liberarCandidato(row, candidato)
  {
    
    this._service.LiberarCandidato(row.id, candidato.candidato.candidatoId).subscribe(data =>{
      if(data == 201)
      {
        this.GetTicket(candidato.ticketId)
        this.apartar = true;
        this.popToast('success', 'Apartado', 'El candidato se liberó correctamente');
      }
      else
      {
        var msg = 'Error el intentar liberar candidato. Consulte al departamento de soporte si el problema persiste.';
        this.popToast('error', 'Apartado', msg);
      }
    });

  }

  openDialogShowRequi(row) {

    let dialogShow = this.dialog.open(DialogShowRequiComponent, {
      width: '200%',
      height: '100%',
      data: { folio: row.folio, id: row.id, vacante: row.vBtra }
    });
    dialogShow.afterClosed().subscribe(result => {
      if(result)
      {
        
      }
    });
  }


  timeWait()
  {
    let d = new Date();
    let s = d.getSeconds() * 6;
    let m = d.getMinutes();
    if(this.fila.length > 0)
    {
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
