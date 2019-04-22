
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
const swal = require('sweetalert');
@Component({
  selector: 'app-tickets-register',
  templateUrl: './tickets-register.component.html',
  styleUrls: ['./tickets-register.component.scss']
})
export class TicketsRegisterComponent implements OnInit {

  flagMX = true;
  flagEU = false;
  extranjero = false;
  verLogin = false;
  constructor(private dialog : MatDialogRef<TicketsRegisterComponent>) { }

  ngOnInit() {
  }

  registrarUsuario($event)
  {
    if($event != 417)
    {
      sessionStorage.setItem('candidatoId', $event);
      swal("¡El registro se completó con éxito!" , '', "success");
      this.dialog.close();

    }
  }

}
