import { SistTicketsService } from './../../../service/SistTickets/sist-tickets.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogShowRequiComponent } from '../../recl/vacantes/vacantes/components/dialogs/dialog-show-requi/dialog-show-requi.component';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-seguimiento-ticket',
  templateUrl: './seguimiento-ticket.component.html',
  styleUrls: ['./seguimiento-ticket.component.scss']
})
export class SeguimientoTicketComponent implements OnInit {

  fila = [];
  ticket = [];
finalizar = false;
atender = false;
date = new Date;
timeW;
  postulaciones: any = [];

  constructor( private _service: SistTicketsService, private _Router: Router, private dialog: MatDialog) { 
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
      console.log(this.postulaciones)
    })
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
      this.GetTicket(ticketId)
    })
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
}
