import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

import { SistTicketsService } from '../../../service/SistTickets/sist-tickets.service';

@Component({
  selector: 'app-inicio-kiosco',
  templateUrl: './inicio-kiosco.component.html',
  styleUrls: ['./inicio-kiosco.component.scss'],
  providers: [NgbCarouselConfig]
})
export class InicioKioscoComponent implements OnInit {

  verLogin = true;

  @ViewChild('myCarousel') myCarousel: NgbCarousel;
  vacantes = [];
  showNavigationArrows = true;
  showNavigationIndicators = false;
  modalTicket: boolean = false;
num = "";
  categorias: any[];
  dataSource: any;
  activeId;
  constructor(config: NgbCarouselConfig, private _service: SistTicketsService) {
    config.interval = 10000;
    config.wrap = false;
    config.pauseOnHover = true;

  }

  ngOnInit() {
    this.GetVacantes();


  }

  GetVacantes()
  {

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
            color += 1;
            if (color > 7) {
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

  FiltrarCategoria(id, mocos)
  {
    if(id==0)
    {
      this.vacantes = this.dataSource;
    }
    else
    {
    var filtro = this.dataSource.filter( item => {
      if( item.areaId === id )
      {
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
