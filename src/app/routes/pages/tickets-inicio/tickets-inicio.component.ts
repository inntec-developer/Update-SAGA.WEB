import { Component, OnInit } from '@angular/core';
import { SistTicketsService } from '../../../service/SistTickets/sist-tickets.service';
import { RequisicionesService } from '../../../service';
import { TicketsRegisterComponent } from '../../../components/tickets-register/tickets-register.component';
import { MatDialog } from '@angular/material';
const swal = require('sweetalert');

@Component({
  selector: 'app-tickets-inicio',
  templateUrl: './tickets-inicio.component.html',
  styleUrls: ['./tickets-inicio.component.scss'],
  providers: [RequisicionesService]
})
export class TicketsInicioComponent implements OnInit {

  folio = 0;
  num = '';
  dataSource: any = [];
  btnCita = false;
  constructor(private _service: SistTicketsService, private service: RequisicionesService, private dialog: MatDialog,) { }

  ngOnInit() {
    sessionStorage.removeItem('candidatoId');
  }

  GenerarTicket()
  {
    this._service.GetTicketConCita(this.folio).subscribe(data => {
      if(data==404)
      {
        swal("¡No hay citas registradas para el folio " + this.folio + "!", '', "error");
        this.btnCita = false;
        this.folio = 0;
      }
      else if(data == 200)
      {
        swal("¡Ya hay un ticket impreso para el folio " + this.folio + "!", '', "warning");
        this.btnCita = false;
        this.folio = 0;
      }
      else if(data == 204)
      {
        swal("¡Se canceló tu cita con el folio " + this.folio + "!. Pasó tu tiempo limite", '', "warning");
        this.btnCita = false;
        this.folio = 0;
      }
      else if(data==417)
      {
        swal("¡Ocurrió un error al intentar imprimir ticket!", '', "error");
        this.btnCita = false;
        this.folio = 0;
      }
      else
      {
      this.num = data;
      swal("¡Ticket Impreso!", this.num, "success");
      this.btnCita = false;
      this.folio = 0;
      }
    })

  }

  // GenerarTicketSinCita(requisicionId)
  // {
  //   let candidatoId = "00000000-0000-0000-0000-000000000000";

  //   if(sessionStorage.getItem('candidatoId'))
  //   {
  //      candidatoId = sessionStorage.getItem('candidatoId');
  //   }
  
  //   this._service.GetTicketSinCita(requisicionId, candidatoId).subscribe(data => {
  //     this.num = data;
  //   })

  // }

  
  GetMisVacantes() {
    this.service.getRequiReclutador(sessionStorage.getItem('id')).subscribe(data => {
      this.dataSource = data;
    });
  }


  Registrar()
  {
    let dialog = this.dialog.open(TicketsRegisterComponent, {
      width: 'auto',
      height: 'auto',

    });
  }
}
