import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carrusel-arte-vacantes',
  templateUrl: './carrusel-arte-vacantes.component.html',
  styleUrls: ['./carrusel-arte-vacantes.component.scss'],
  providers: [NgbCarouselConfig]
})
export class CarruselArteVacantesComponent implements OnInit {

  showNavigationArrows = false;
  showNavigationIndicators = false;
  images = ['./../assets/img/ArteVacantes/img01.png', 
    './../assets/img/ArteVacantes/img02.png', './../assets/img/ArteVacantes/img03.jpg',
     './../assets/img/ArteVacantes/img04.jpg', './../assets/img/ArteVacantes/img05.png', 
     './../assets/img/ArteVacantes/img06.png', './../assets/img/ArteVacantes/img07.png', './../assets/img/ArteVacantes/img08.png']

  constructor(config: NgbCarouselConfig) {
    config.interval = 4000;
    config.wrap = true;
   }

  ngOnInit() {
  }

}
