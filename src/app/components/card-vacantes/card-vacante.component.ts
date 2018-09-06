import { CardService } from './../../service/SeguimientoVacante/CardService.service';
import { ApiConection } from './../../service/api-conection.service';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-card-vacante',
  templateUrl: './card-vacante.component.html',
  styleUrls: ['./card-vacante.component.scss']
})
export class CardVacanteComponent implements OnInit, AfterViewInit {

  @Input() ClientId;

  logo = ApiConection.ServiceUrlFoto + 'utilerias/img/user/WorkTeam.jpg'
  Datos = [];
  constructor( private _service: CardService ) { }

  GetDtosCard()
  {
    var ext = [];
    this._service.GetDtosCard(this.ClientId).subscribe( data =>
      {
        this.Datos = data;
      }
    )

  }
  ngOnInit() {
    setTimeout(() => {
      this.GetDtosCard();
    }, 1000);
    
  }

  ngAfterViewInit()
  {
   

  }

}
