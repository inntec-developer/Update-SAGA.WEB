import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

import { NgxSpinnerService } from 'ngx-spinner';
import { SistTicketsService } from '../../../service/SistTickets/sist-tickets.service';

const swal = require('sweetalert');
@Component({
  selector: 'app-carrusel-vacantes',
  templateUrl: './carrusel-vacantes.component.html',
  styleUrls: ['./carrusel-vacantes.component.scss'],
  providers: [NgbCarouselConfig]

})
export class CarruselVacantesComponent implements OnInit {

  @ViewChild('myCarousel') myCarousel: NgbCarousel;
  vacantes = [];
  showNavigationArrows = true;
  showNavigationIndicators = false;
  modalTicket: boolean = false;
  num = "";
  categorias: any[];
  dataSource = [];
  activeId;
  constructor(config: NgbCarouselConfig, private _service: SistTicketsService, private spinner: NgxSpinnerService) {
    config.interval = 10000;
    config.wrap = false;
    config.pauseOnHover = true;

  }

  ngOnInit() {
    this.GetVacantes();


  }

  GenerarTicket(row) {
    swal({
      title: "¿ESTÁS SEGURO?",
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
      window.onkeydown = null;
      window.onfocus = null;
      if (isConfirm) {

        let candidatoId = "00000000-0000-0000-0000-000000000000";

        if(sessionStorage.getItem('candidatoId'))
        {
           candidatoId = sessionStorage.getItem('candidatoId');
        }


    this._service.GetTicketSinCita(row.id, candidatoId).subscribe(data => {
      this.num = data;

      swal("¡Ticket Impreso!", this.num, "success");
      sessionStorage.removeItem('candidatoId');

    });


      }
      else {
        this.modalTicket = false;
        swal("Cancelado", "No se realizó ningún cambio", "error");
      }
    });
  }

  GetVacantes() {

    this._service.GetVacantes().subscribe(data => {
      var images = ['./../assets/img/ArteVacantes/img01.png',
        './../assets/img/ArteVacantes/img02.png', './../assets/img/ArteVacantes/img03.jpg',
        './../assets/img/ArteVacantes/img04.jpg', './../assets/img/ArteVacantes/img05.png',
        './../assets/img/ArteVacantes/img06.png', './../assets/img/ArteVacantes/img07.png', './../assets/img/ArteVacantes/img08.png']

      this.dataSource = data;
      if(this.dataSource.length > 0)
      {
      var color = 0;
      this.categorias = Array.from(new Set(this.dataSource.map(s => s.areaId)))
      .map(id => {
        color +=1;
        if(color > 7)
        {
          color = 1;
        }
        return {
          id: id,
          categoria: this.dataSource.find(s => s.areaId === id).categoria,
          icono: this.dataSource.find(s => s.areaId === id).icono,
          color: color
        }
      });
      this.dataSource = this.dataSource.filter(element => {
        if (element.cubierta > 0) {

          return element;
        }


      });

      for (var c = 0; c <= 7; c++) {
        this.dataSource[c].image = images[c];
      }

      this.vacantes = this.dataSource;
    }
    });
  }

  FiltrarCategoria(id, mocos) {
    if (id == 0) {
      this.vacantes = this.dataSource;
    }
    else {
      var filtro = this.dataSource.filter(item => {
        if (item.areaId === id) {
          return item;
        }
      });

    this.vacantes = filtro;
  }
  this.activeId = this.vacantes[0].id;
  this.myCarousel.activeId = this.vacantes[0].id;
  this.myCarousel.cycle();


  //   setTimeout(() => {
  //     /** spinner ends after 5 seconds */
  //     this.spinner.hide();
  // }, 5000);

  }

}
