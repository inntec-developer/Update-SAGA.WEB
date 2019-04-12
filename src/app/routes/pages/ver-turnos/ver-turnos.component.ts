import { EnAtencionComponent } from './../../SistTickets/en-atencion/en-atencion.component';
import { Component, OnInit,ViewChild } from '@angular/core';

@Component({
  selector: 'app-ver-turnos',
  templateUrl: './ver-turnos.component.html',
  styleUrls: ['./ver-turnos.component.scss'],
  providers: [EnAtencionComponent]
})
export class VerTurnosComponent implements OnInit {

  carrusel: boolean = true;
  @ViewChild('lgModal') modal;

  constructor(private turno: EnAtencionComponent) { 
    setInterval(() => this.toggleModal(), 20000);
   
  }

  ngOnInit() {
  }

  toggleModal()
  {
    this.carrusel = !this.carrusel;
    if(!this.carrusel && this.turno.turnos.length > 0)
    {
      this.modal.hide();
    }
    else if(!this.carrusel && this.turno.turnos.length == 0)
    {
      this.carrusel = true;
      this.modal.show();
    }
  }

  toggleTurno()
  {
    if(this.turno.turnos.length == 0)
    {
      this.modal.show();
      this.carrusel = true;
    }
    else
    {
      this.modal.hide();
      this.carrusel = false;
    }
  }
}
