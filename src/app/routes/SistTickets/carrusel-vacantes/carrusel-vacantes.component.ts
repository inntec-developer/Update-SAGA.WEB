import { Component, OnInit } from '@angular/core';
import { SistTicketsService } from '../../../service/SistTickets/sist-tickets.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carrusel-vacantes',
  templateUrl: './carrusel-vacantes.component.html',
  styleUrls: ['./carrusel-vacantes.component.scss'],
  providers: [NgbCarouselConfig]
})
export class CarruselVacantesComponent implements OnInit {

  vacantes = [];
  showNavigationArrows = false;
  showNavigationIndicators = false;


  constructor(config: NgbCarouselConfig, private _service: SistTicketsService) { 
    config.interval = 2000;
    config.wrap = true;
  }

  ngOnInit() {
    this.GetVacantes();
   
  
  }


  GetVacantes()
  {

    this._service.GetVacantes().subscribe(data => {
      this.vacantes = data;
      console.log(this.vacantes)
    })
  }

}
