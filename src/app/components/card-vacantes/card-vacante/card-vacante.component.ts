import { CardService } from '../../../service/SeguimientoVacante/CardService.service';
import { ApiConection } from '../../../service/api-conection.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-vacante',
  templateUrl: './card-vacante.component.html',
  styleUrls: ['./card-vacante.component.scss']
})
export class CardVacanteComponent implements OnInit {

  @Input() ClientId;

  logo = ApiConection.ServiceUrlFoto + 'utilerias/img/user/WorkTeam.jpg'
  Datos = [];
  constructor( private _service: CardService ) { }

  GetDtosCard()
  {
    this._service.GetDtosCard(this.ClientId).subscribe( data =>
      {
        this.Datos = data;
        console.log(this.Datos);

        
      }
    )

  }
  ngOnInit() {
    this.GetDtosCard();
  }

}
