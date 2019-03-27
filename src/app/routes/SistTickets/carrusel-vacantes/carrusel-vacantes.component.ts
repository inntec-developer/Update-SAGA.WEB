import { Component, OnInit } from '@angular/core';
import { SistTicketsService } from '../../../service/SistTickets/sist-tickets.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

const swal = require('sweetalert');
@Component({
  selector: 'app-carrusel-vacantes',
  templateUrl: './carrusel-vacantes.component.html',
  styleUrls: ['./carrusel-vacantes.component.scss'],
  providers: [NgbCarouselConfig]

})
export class CarruselVacantesComponent implements OnInit {

  vacantes = [];
  showNavigationArrows = true;
  showNavigationIndicators = false;
  modalTicket: boolean = false;
num = "";

  constructor(config: NgbCarouselConfig, private _service: SistTicketsService) { 
    config.interval = 10000;
    config.wrap = false;
    config.pauseOnHover = true;
  }

  ngOnInit() {
    this.GetVacantes();
   
  
  }

  GenerarTicket(row)
  {
    swal({
      title: "¿ESTAS SEGURO?",
      text: "¡Se generará ticket para entrevista! para la vacante de " + row.vBtra,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ec2121",
      confirmButtonText: "¡Si, imprimir ticket!",
      cancelButtonColor: "#ec2121",
      cancelButtonText: "¡No, cancelar!",
      closeOnConfirm: false,
      closeOnCancel: false
    }, (isConfirm) => {

      if (isConfirm) {
      

    this._service.GetTicketSinCita(row.id).subscribe(data => {
      this.num = data;

      swal("¡Ticket Impreso!", this.num, "success");

    });

        
      }
      else {
        this.modalTicket = false;
        swal("Cancelado", "No se realizó ningún cambio", "error");
      }

    });

  }

  GetVacantes()
  {

    this._service.GetVacantes().subscribe(data => {
      var images = ['./../assets/img/ArteVacantes/img01.png', 
      './../assets/img/ArteVacantes/img02.png', './../assets/img/ArteVacantes/img03.jpg',
       './../assets/img/ArteVacantes/img04.jpg', './../assets/img/ArteVacantes/img05.png', 
       './../assets/img/ArteVacantes/img06.png', './../assets/img/ArteVacantes/img07.png', './../assets/img/ArteVacantes/img08.png']
      
      this.vacantes = data;
      for(var c = 0; c <= 7; c++)
      {
        this.vacantes[c].image = images[c];
      }
      console.log(this.vacantes)
    })
  }

}
