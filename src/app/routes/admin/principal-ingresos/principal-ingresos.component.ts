import { AdminServiceService } from './../../../service/AdminServicios/admin-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal-ingresos',
  templateUrl: './principal-ingresos.component.html',
  styleUrls: ['./principal-ingresos.component.scss']
})
export class PrincipalIngresosComponent implements OnInit {
  totalCubiertos = 0;
  totalIngresos = 0;
  constructor(private service: AdminServiceService, private _Router: Router) { }

  ngOnInit() {
    this.GetTotales();
  }

  GetTotales() {
    this.service.GetTotales().subscribe(result => {
      this.totalCubiertos = result.total;
      this.totalIngresos =  result.ingresos;
      // result.reduce(function (valorAnterior, valorActual, indice, vector) {
      //     return valorAnterior + valorActual.ingresos;
      //   }, 0);
  });
}
Cubiertos() {
  this._Router.navigate(['/admin/filesContratados'], { skipLocationChange: true });
}
Ingresos() {
  this._Router.navigate(['/admin/filesContratados', 1], { skipLocationChange: true });
}
Gafetes() {
  this._Router.navigate(['/admin/generarGafetes'], { skipLocationChange: true });
}
Contratos() {
  this._Router.navigate(['/admin/generarContrato'], { skipLocationChange: true });
}
}
