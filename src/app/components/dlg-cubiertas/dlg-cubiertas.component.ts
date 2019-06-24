import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
const swal = require('sweetalert');
@Component({
  selector: 'app-dlg-cubiertas',
  templateUrl: './dlg-cubiertas.component.html',
  styleUrls: ['./dlg-cubiertas.component.scss']
})
export class DlgCubiertasComponent implements OnInit {

  seleccion = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialogRef<DlgCubiertasComponent>) { }

  ngOnInit() {
  }

  CubrirFolio()
  {
    if(this.seleccion > 0)
    {
      let estatus = this.data.filter(e => {
        if(e.id === this.seleccion)
        {
          return e
        }
      });

      swal({
        title: "¿ESTÁS SEGURO?",
        text: "¡La requisición cambiará a estatus " + estatus[0].descripcion.toUpperCase(),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ec2121",
        confirmButtonText: "¡Si, cambiar estatus!",
        cancelButtonColor: "#ec2121",
        cancelButtonText: "¡No, cancelar!",
        closeOnConfirm: true,
        closeOnCancel: true
      }, (isConfirm) => {
        window.onkeydown = null;
        window.onfocus = null;
        if (isConfirm) 
        {  
          this.dialog.close(estatus[0]);
        }
        else
        {
          swal("ESTATUS", "NO SE REALIZÓ NINGUN CAMBIO", 'warning');
        }
      });
     }
  }

  

  CloseDlg()
  {
    this.dialog.close(0);
  }
}
