import { EquiposTrabajoService } from './../../../service/EquiposDeTrabajo/equipos-trabajo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pantalla-gg',
  templateUrl: './pantalla-gg.component.html',
  styleUrls: ['./pantalla-gg.component.scss']
})
export class PantallaGGComponent implements OnInit {

  reporte = [];
  constructor(private _service: EquiposTrabajoService) { }

  ngOnInit() {
    this.GetRport();
  }

  GetRport() 
  {
    this._service.GetRportGG().subscribe(data => {
      this.reporte = data;
      console.log(this.reporte)
    })

  }


}
