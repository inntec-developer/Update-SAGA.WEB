import { EnAtencionComponent } from './../../SistTickets/en-atencion/en-atencion.component';
import { Component, OnInit,ViewChild } from '@angular/core';
import { SistTicketsService } from '../../../service/SistTickets/sist-tickets.service';

@Component({
  selector: 'app-ver-turnos',
  templateUrl: './ver-turnos.component.html',
  styleUrls: ['./ver-turnos.component.scss'],
  providers: [EnAtencionComponent]
})
export class VerTurnosComponent implements OnInit {
  turnos = [];
  carrusel = false;
  num = 0;

  constructor(private _service: SistTicketsService) {
    setInterval(() => this.toggleTurno(), 10000);
    setInterval(() => this.toggleModal(), 100000);
  }

  ngOnInit() {
    this.GetTicketEnAtencion();
  }

  GetTicketEnAtencion() {
    this._service.GetTicketEnAtencion().subscribe(data => {
      this.turnos = data;
      if (this.turnos.length > 0 && this.turnos.length > this.num) {
        this.carrusel = false;
        this.num = this.turnos.length;
      } else if (this.turnos.length < this.num) {
        this.num = this.turnos.length;
      }
    });
  }
  toggleModal() {
    this.carrusel = true;
  }

  toggleTurno() {
    this.GetTicketEnAtencion();
  }
}
