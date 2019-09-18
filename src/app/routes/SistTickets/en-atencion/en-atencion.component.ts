import { Component, OnInit } from '@angular/core';

import { SistTicketsService } from './../../../service/SistTickets/sist-tickets.service';

@Component({
  selector: 'app-en-atencion',
  templateUrl: './en-atencion.component.html',
  styleUrls: ['./en-atencion.component.scss']
})
export class EnAtencionComponent implements OnInit {
 turnos: any = [];

  constructor(private _service: SistTicketsService) {
    setInterval(() => this.GetTicketEnAtencion(), 10000);
   }

  ngOnInit() {
    this.GetTicketEnAtencion();
  }

  GetTicketEnAtencion() {
    this._service.GetTicketEnAtencion().subscribe(data => {
      this.turnos = data;
    });
  }
}
