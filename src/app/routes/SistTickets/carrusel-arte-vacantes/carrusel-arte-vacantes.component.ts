import { Component, OnInit, Input } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { SistTicketsService } from '../../../service/SistTickets/sist-tickets.service';

@Component({
  selector: 'app-carrusel-arte-vacantes',
  templateUrl: './carrusel-arte-vacantes.component.html',
  styleUrls: ['./carrusel-arte-vacantes.component.scss'],
  providers: [NgbCarouselConfig]
})
export class CarruselArteVacantesComponent implements OnInit {

 vacantes = [];
  images = [];
  showNavigationArrows = true;
  showNavigationIndicators = false;


  constructor(config: NgbCarouselConfig, private _service: SistTicketsService) {
  
    config.interval = 60000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = true;

console.log(this.vacantes) 
   this.images = ['./../assets/img/ArteVacantes/img01.png', 
   './../assets/img/ArteVacantes/img02.png', './../assets/img/ArteVacantes/img03.jpg',
    './../assets/img/ArteVacantes/img04.jpg', './../assets/img/ArteVacantes/img05.png', 
    './../assets/img/ArteVacantes/img06.png', './../assets/img/ArteVacantes/img07.png', './../assets/img/ArteVacantes/img08.png']
   }

  ngOnInit() {
this.GetVacantes();
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
