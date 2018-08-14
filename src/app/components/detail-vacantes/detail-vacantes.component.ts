import { DetailService } from '../../service/SeguimientoVacante/DetailService.service';
import { ApiConection } from '../../service/api-conection.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail-vacantes',
  templateUrl: './detail-vacantes.component.html',
  styleUrls: ['./detail-vacantes.component.scss']
})
export class DetailVacantesComponent implements OnInit {

  @Input() VacanteId;
  Datos = [];

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
    this._service.GetDtosDetail(this.VacanteId).subscribe(data => {
      this.Datos = data;
      console.log(this.Datos);
    }
    );
  }
  ngOnInit() {
    this.GetDtosDetail();
  }
}
