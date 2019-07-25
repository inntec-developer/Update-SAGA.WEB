import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
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
  @Output() LogOut:  EventEmitter<any> = new EventEmitter();
  @ViewChild('myCarousel') myCarousel: NgbCarousel;
  vacantes = [];
  showNavigationArrows = true;
  showNavigationIndicators = false;
  modalTicket: boolean = false;
  num = "";
  categorias: any[];
  categorias2 = [];
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
      this.num = data[0];

      swal("¡TURNO IMPRESO!", "Bienvenido " + data[1] + " . Por favor tome su turno impreso." + this.num + ". Si inició sesión se cerrará al imprimir turno", "success");
      this.LogOut.emit(data);

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
      var images = ['./../assets/img/ArteVacantes/DamsaVacantes_PP.jpg',
        './../assets/img/ArteVacantes/DamsaVacantes_PP1.jpg', './../assets/img/ArteVacantes/DamsaVacantes_PP2.jpg',
        './../assets/img/ArteVacantes/DamsaVacantes_PP3.jpg', './../assets/img/ArteVacantes/DamsaVacantes_PP4.jpg',
        './../assets/img/ArteVacantes/DamsaVacantes_PP5.jpg', './../assets/img/ArteVacantes/DamsaVacantes_PP6.jpg', './../assets/img/ArteVacantes/DamsaVacantes_PP7.jpg', './../assets/img/ArteVacantes/DamsaVacantes_PP8.jpg',
        './../assets/img/ArteVacantes/DamsaVacantes_PP17.jpg']

      this.dataSource = data;
      if(this.dataSource.length > 0)
      {
        this.dataSource = this.dataSource.filter(element => {
          if (element.cubierta > 0) {
  
            return element;
          }
  
  
        });
  
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
    
        for (var c = 0; c <= 7; c++) {
          this.dataSource[c].image = images[c];
        }

      // this.categorias2 = this.categorias.splice(11, this.categorias.length);
      // this.categorias = this.categorias.splice(0, 10);
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
