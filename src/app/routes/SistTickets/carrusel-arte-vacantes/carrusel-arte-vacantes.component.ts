import { config } from 'rxjs';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbCarouselConfig, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { SistTicketsService } from '../../../service/SistTickets/sist-tickets.service';

@Component({
  selector: 'app-carrusel-arte-vacantes',
  templateUrl: './carrusel-arte-vacantes.component.html',
  styleUrls: ['./carrusel-arte-vacantes.component.scss'],
  providers: [NgbCarouselConfig]
})
export class CarruselArteVacantesComponent implements OnInit {

  @ViewChild('myCarousel') myCarousel: NgbCarousel;
 vacantes = [];
 activeId;
  showNavigationArrows = false;
  showNavigationIndicators = false;

  images = [{ id:1, img:'./../assets/img/ArteVacantes/img01.png'}, 
  {id: 2, img:'./../assets/img/ArteVacantes/img02.png'}, {id:3, img:'./../assets/img/ArteVacantes/img03.jpg'},
   {id: 4, img: './../assets/img/ArteVacantes/img04.jpg'},{id:5, img: './../assets/img/ArteVacantes/img05.png'}, 
   {id: 6, img: './../assets/img/ArteVacantes/img06.png'}, {id: 7, img: './../assets/img/ArteVacantes/img07.png'}, {id: 8, img: './../assets/img/ArteVacantes/img08.png'}];
  

  constructor(private config: NgbCarouselConfig, private _service: SistTicketsService) {
  
    config.interval = 5000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;

    setInterval(() => this.timeWait(), 60000);
  }

  ngOnInit() {

  }

  timeWait()
  {
    this.images = this.images;
    this.activeId = 1;
    this.myCarousel.activeId = '1';
    this.myCarousel.cycle();
  }

  GetVacantes()
  {

    this._service.GetVacantes().subscribe(data => {
      this.vacantes = data;
    });
  }

}
