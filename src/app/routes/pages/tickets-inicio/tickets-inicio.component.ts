import { Component, OnInit } from '@angular/core';
import { SistTicketsService } from '../../../service/SistTickets/sist-tickets.service';
import { RequisicionesService } from '../../../service';
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

  constructor(private _service: SistTicketsService, private service: RequisicionesService) { }

  ngOnInit() {
    this.GetMisVacantes();
  }

  GenerarTicket()
  {
    this._service.GetTicketConCita(this.folio).subscribe(data => {
      this.num = data;
      swal("¡Ticket Impreso!", this.num, "success");
    })

  }

  GenerarTicketSinCita(requisicionId)
  {
    this._service.GetTicketSinCita(requisicionId).subscribe(data => {
      this.num = data;
    })

  }

  
  GetMisVacantes() {
    this.service.getRequiReclutador(sessionStorage.getItem('id')).subscribe(data => {
      this.dataSource = data;
      console.log(this.dataSource)
    });
  }


}
