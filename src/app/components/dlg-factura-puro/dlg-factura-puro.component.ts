import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RequisicionesService } from '../../service';
@Component({
  selector: 'app-dlg-factura-puro',
  templateUrl: './dlg-factura-puro.component.html',
  styleUrls: ['./dlg-factura-puro.component.scss'],
  providers: [RequisicionesService]
})
export class DlgFacturaPuroComponent implements OnInit {

  porcentaje = 0;
  monto = 0;
  perContratado = 0;
  montoContratado = 0;
  loading = false;
  asignar = false;
  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private service: RequisicionesService,
   private dialog: MatDialogRef<DlgFacturaPuroComponent>) { }

  ngOnInit() {
  }

  AddDtosFactura()
  {
    this.loading = true;
    let estatus = 44;
    let dtos = {RequisicionId: this.data.id, Porcentaje: this.porcentaje,
       Monto: this.monto, PerContratado: this.perContratado,
        MontoContratado: this.montoContratado };
    
      if(this.asignar)
      {
        estatus = 45;
      }
    this.service.AddDatosFactura(dtos).subscribe(data =>{
      this.loading = false;
        this.dialog.close({Ok: data, estatus: estatus});
      
    });
    
    
  }

}
