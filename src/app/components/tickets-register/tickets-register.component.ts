import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material';

const swal = require('sweetalert');
@Component({
  selector: 'app-tickets-register',
  templateUrl: './tickets-register.component.html',
  styleUrls: ['./tickets-register.component.scss']
})
export class TicketsRegisterComponent implements OnInit {

  public flagMX = true;
  public flagEU = false;
  public extranjero = false;
  public verLogin = false;
  public logeado: boolean;
  constructor(private dialog : MatDialogRef<TicketsRegisterComponent>) { }

  ngOnInit() {
    this.logeado = false;
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
