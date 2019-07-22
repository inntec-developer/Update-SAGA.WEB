import { KioscoServiceService } from './../../../service/Kiosco/kiosco-service.service';
import { SettingsService } from './../../../core/settings/settings.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

import { SistTicketsService } from '../../../service/SistTickets/sist-tickets.service';
const swal = require('sweetalert');
@Component({
  selector: 'app-inicio-kiosco',
  templateUrl: './inicio-kiosco.component.html',
  styleUrls: ['./inicio-kiosco.component.scss'],
  providers: [NgbCarouselConfig]
})
export class InicioKioscoComponent implements OnInit {

  verLogin = true;
  logeado: boolean = false;
  usuario: string = "";
  user = "";
  pass = "";
  @ViewChild('myCarousel') myCarousel: NgbCarousel;
  @ViewChild('lgModal') modal;

  vacantes = [];
  showNavigationArrows = true;
  showNavigationIndicators = false;
  modalTicket: boolean = false;
  num = "";
  categorias: any[];
  dataSource: any;
  activeId: any;
  search: any;

  constructor(config: NgbCarouselConfig, 
    private _service: SistTicketsService,
    private _kioscoService: KioscoServiceService,
    private settings: SettingsService
  ) {
    config.interval = 10000;
    config.wrap = false;
    config.pauseOnHover = true;

  }

  ngOnInit() {
    this.GetVacantes();
  }

  GetVacantes() {

    this._service.GetVacantes().subscribe(data => {
      var images = ['./../assets/img/ArteVacantes/img01.png',
        './../assets/img/ArteVacantes/img02.png', './../assets/img/ArteVacantes/img03.jpg',
        './../assets/img/ArteVacantes/img04.jpg', './../assets/img/ArteVacantes/img05.png',
        './../assets/img/ArteVacantes/img06.png', './../assets/img/ArteVacantes/img07.png', './../assets/img/ArteVacantes/img08.png'];

      this.dataSource = data;
      if (this.dataSource.length > 0) {
        var color = 0;
        this.categorias = Array.from(new Set(this.dataSource.map(s => s.areaId)))
          .map(id => {
            color += 1;
            if (color > 7) {
              color = 1;
            }
            return {
              id: id,
              categoria: this.dataSource.find(s => s.areaId === id).categoria,
              icono: this.dataSource.find(s => s.areaId === id).icono,
              color: color,
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

  GenerarTicket(row) {
    swal({
      title: "¿ESTAS SEGURO?",
      text: "¡Se se está postulando a la vacante de " + row.vBtra + "!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ec2121",
      confirmButtonText: "¡Si, postularme!",
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

        this._kioscoService.PostulacionKiosco({requisicionId: row.id, candidatoId: candidatoId}).subscribe(data => {
          this.num = data[0];

          swal("¡POSTULACIÓN!", "La postulación se registró con éxito ", "success");

        });


      }
      else {
        this.modalTicket = false;
        swal("Cancelado", "No se realizó ningún cambio", "error");
      }
    });
  }

  Login(usuario, pass)
  {
    this._service.LoginBolsa(usuario, pass).subscribe(data => {

      if(data == 300)
      {
        swal("¡Error en la contraseña!", '', "error");
        this.user = "";
        this.pass = "";
      }
      else if(data == 404)
      {
        swal("¡El usuario no se encuentra!", '', "error");
        this.user = "";
        this.pass = "";
      }
      else
      {
        swal("¡Gracias por iniciar sesión!", '', "success");
        this.usuario = data[0].usuario;
        sessionStorage.setItem('candidatoId', data[0].personaId);
        this.logeado = true;
        this.verLogin = false;
      }
    })
  }
  LogOut()
  {
    sessionStorage.removeItem('candidatoId');
    this.logeado = false;
    this.verLogin = true;
    this.user = "";
    this.usuario = "";
    this.pass = "";
  }

  public Search(data: any) {

    this.search = data.target.value;
    let tempArray: Array<any> = [];

    let colFiltar: Array<any> = [{ title: "vBtra" }];

    this.dataSource.forEach(function (item) {
      let flag = false;
      colFiltar.forEach(function (c) {
        if (item[c.title].toString().toLowerCase().match(data.target.value.toLowerCase())) {
          flag = true;
        }
      });

      if (flag) {
        tempArray.push(item)
      }
    });

    this.vacantes = tempArray;

    this.activeId = this.vacantes[0].id;
    this.myCarousel.activeId = this.vacantes[0].id;
    this.myCarousel.cycle();
  }
}
