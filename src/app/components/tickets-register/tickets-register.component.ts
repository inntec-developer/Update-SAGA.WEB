import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

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
      sessionStorage.setItem('candidatoId', $event.id);
      // swal("¡El registro se completó con éxito!" , '', "success");
      
      swal({
        title: "¡El registro se completó con éxito!",
        text: "Usuario: " + $event.username + " contraseña: " + $event.pass + " ¡Ya puedes empezar!" + " Se enviará notificación con usuario y contraseña para iniciar sesion en bolsa de trabajo DAMSA",
        type: "success",
      })
      this.dialog.close($event);

    }
    else
    {
      swal({
        title: "¡Registro Candidato!",
        text: "Ocurrió un error al intentar registrar candidato por favor intentelo de nuevo",
        type: "error",
      })

    }
  }

}
