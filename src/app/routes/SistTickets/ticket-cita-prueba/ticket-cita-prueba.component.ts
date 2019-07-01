import { Component, OnInit } from '@angular/core';

import { RequisicionesService } from '../../../service';
import { SettingsService } from './../../../core/settings/settings.service';
import { SistTicketsService } from '../../../service/SistTickets/sist-tickets.service';

const swal = require('sweetalert');
@Component({
  selector: 'app-ticket-cita-prueba',
  templateUrl: './ticket-cita-prueba.component.html',
  styleUrls: ['./ticket-cita-prueba.component.scss'],
  providers: [RequisicionesService]
})
export class TicketCitaPruebaComponent implements OnInit {
folio = 0;
num = '';
  dataSource: any = [];
  constructor(
    private _service: SistTicketsService,
    private service: RequisicionesService,
    private settings: SettingsService
    ) { }

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

  // GenerarTicketSinCita(requisicionId)
  // {
  //   this._service.GetTicketSinCita(requisicionId, req).subscribe(data => {
  //     this.num = data;
  //   })

  // }


  GetMisVacantes() {
    this.service.getRequiReclutador(this.settings.user['id']).subscribe(data => {
      this.dataSource = data;
    });
  }

}
