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

  images = ['./../assets/img/ArteVacantes/img01.png', 
  './../assets/img/ArteVacantes/img02.png', './../assets/img/ArteVacantes/img03.jpg',
   './../assets/img/ArteVacantes/img04.jpg', './../assets/img/ArteVacantes/img05.png', 
   './../assets/img/ArteVacantes/img06.png', './../assets/img/ArteVacantes/img07.png', './../assets/img/ArteVacantes/img08.png'];
  

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
    this.activeId = this.images[0];
    this.images = this.images;
    this.myCarousel.cycle();

  }

  GetVacantes()
  {

    this._service.GetVacantes().subscribe(data => {
      this.vacantes = data;


  // for(var i = 0; i <= 7; i++)
  // {
  //   this.vacantes[i].image = this.images[i];
  // }

   
    });
  }

}
