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
  activeId = 1;
  showNavigationArrows = false;
  showNavigationIndicators = false;

  constructor(config: NgbCarouselConfig, private _service: SistTicketsService) {

    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;

    // setInterval(() => this.timeWait(), 60000 * this.vacantes.length );
  }

  ngOnInit() {
this.GetVacantes();
  }

  timeWait() {
    this.GetVacantes();
    this.activeId = 1;
    // this.myCarousel.activeId = '1';
    // this.myCarousel.cycle();
  }

  GetVacantes() {
    this._service.GetVacantes().subscribe(data => {
      this.vacantes = data;
      // this.myCarousel.activeId = '1';
    });
  }

}
