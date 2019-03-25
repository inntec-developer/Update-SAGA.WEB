import { Component, OnInit, Input } from '@angular/core';
import { SistTicketsService } from './../../../service/SistTickets/sist-tickets.service';

@Component({
  selector: 'app-fila-tickets',
  templateUrl: './fila-tickets.component.html',
  styleUrls: ['./fila-tickets.component.scss']
})
export class FilaTicketsComponent implements OnInit {

  @Input() cita: any = 2;
  @Input() verTiempo: boolean = false;
  @Input() moduloId;

  fila = [];

  constructor(private _service: SistTicketsService) { 
    setInterval(() => this.GetFilaTickets(), 1000);
  }

  ngOnInit() {
    this.GetFilaTickets();
  }

  public GetFilaTickets()
  {
    this._service.GetFilaTickets(1, sessionStorage.getItem('id')).subscribe( data => {

        this.fila = data;
    })
  }

  

}
