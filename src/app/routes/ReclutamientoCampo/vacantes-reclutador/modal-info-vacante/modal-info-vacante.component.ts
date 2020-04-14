import { ReclutamientoCampoService } from './../../../../service/ReclutamientoCampo/reclutamiento-campo.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-info-vacante',
  templateUrl: './modal-info-vacante.component.html',
  styleUrls: ['./modal-info-vacante.component.scss']
})
export class ModalInfoVacanteComponent implements OnInit {
  @Input('requisicionId') requisicionId = '';
  requisicion: any = [];
  constructor(private servicio: ReclutamientoCampoService) { }

  ngOnInit() {
    this.GetInfoVacante();
  }

  GetInfoVacante() {
    this.servicio.GetInfoVacante(this.requisicionId).subscribe(data => {
      this.requisicion = data[0];
    });
  }

}
