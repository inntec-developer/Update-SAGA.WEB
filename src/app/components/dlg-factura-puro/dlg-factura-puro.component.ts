import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RequisicionesService } from '../../service';

@Component({
  selector: 'app-dlg-factura-puro',
  templateUrl: './dlg-factura-puro.component.html',
  styleUrls: ['./dlg-factura-puro.component.scss'],
  providers: [RequisicionesService]
})
export class DlgFacturaPuroComponent implements OnInit {

  porcentaje = 0.00001;
  monto = 0;
  perContratado = 0;
  montoContratado = 0;
  loading = false;
  asignar = false;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private service: RequisicionesService,
    private dialog: MatDialogRef<DlgFacturaPuroComponent>) {

  }

  ngOnInit() {
    this.Calcular();
  }

  Calcular() {
    if (this.porcentaje === 0) {
      this.porcentaje = 0.00001;
    }

    this.monto = this.round(this.porcentaje * (this.data.sueldoMaximo * this.data.vacantes) / 100, 4);
    this.perContratado = 100 - this.porcentaje;
    this.montoContratado = this.round((this.data.sueldoMaximo * this.data.vacantes) - this.monto, 4);

  }
  AddDtosFactura() {
    this.loading = true;
    let estatus = 44;
    let dtos = {
      RequisicionId: this.data.id, Porcentaje: this.porcentaje,
      Monto: this.monto, PerContratado: this.perContratado,
      MontoContratado: this.montoContratado
    };

    if (this.porcentaje < 50) {
      estatus = 46;
    }

    this.service.AddDatosFactura(dtos).subscribe(data => {
      this.loading = false;
      this.dialog.close({ Ok: data, estatus: estatus, porcentaje: this.porcentaje });
    });

  }

  round(value, precision): any {
    const rounder = Math.pow(10, precision);
    return (Math.round(value * rounder) / rounder).toFixed(precision);
  }

}
