import { CardService } from './../../service/SeguimientoVacante/CardService.service';
import { ApiConection } from './../../service/api-conection.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-vacante',
  templateUrl: './card-vacante.component.html',
  styleUrls: ['./card-vacante.component.scss']
})
export class CardVacanteComponent implements OnInit {

  @Input() ClientId;
  @Input() RequisicionId;

  logo = ApiConection.ServiceUrlFoto + 'utilerias/img/user/WorkTeam.jpg'
  Datos = [];
  UserData = [];

  constructor( private _service: CardService ) { }

  GetDtosCard()
  {
    var ext = [];
    this._service.GetDtosCard(this.ClientId, this.RequisicionId).subscribe( data =>
      {
        this.Datos = data;
        console.log(this.Datos)
        this.Datos[0]['asignados'].forEach(element =>{
          var aux = element.data;
          element.foto = ApiConection.ServiceUrlFoto + element.foto;
          aux.forEach(e => {
            e.foto = ApiConection.ServiceUrlFoto + e.foto;
          });
      
          element.data = aux;
        });

        console.log(this.Datos)
      }
    )

  }

  GetUserData(user)
  {
    if(this.Datos.length > 0)
    {
      var idx = this.Datos.findIndex(x => x.entidadId === user.entidadId );
      if(idx > -1)
      {
        this.UserData = this.Datos[idx]['data'];
      }
    }


  }
  ngOnInit() {

if(this.ClientId)
{
      this.GetDtosCard();
}

    
  }



}
