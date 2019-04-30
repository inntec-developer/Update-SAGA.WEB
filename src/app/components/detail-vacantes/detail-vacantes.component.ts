import { Component, Input, OnInit } from '@angular/core';

import { ApiConection } from '../../service/api-conection.service';
import { DetailService } from '../../service/SeguimientoVacante/DetailService.service';

@Component({
  selector: 'app-detail-vacantes',
  templateUrl: './detail-vacantes.component.html',
  styleUrls: ['./detail-vacantes.component.scss']
})
export class DetailVacantesComponent implements OnInit {

  @Input('RequisicionId') RequisicionId;
  public Datos = [];
  public observacionesRequi: any;
   step = 0;


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  constructor(private _service: DetailService ) { }

  GetDtosDetail() {

    this._service.GetDtosDetail(this.RequisicionId).subscribe(data => {
      this.Datos = data;
      this.observacionesRequi = data['requisicion']['observacionesRequi'] || null;
      this.Datos.length = 1;
    }
    );
  }
  ngOnInit() {
    this.GetDtosDetail();
  }
}
