import * as jwt_decode from 'jwt-decode';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AdminServiceService } from '../../../service/AdminServicios/admin-service.service';
import { ApiConection } from '../../../service';
import { AuthService } from '../../../service/auth/auth.service';
import { CustomValidators } from 'ng2-validation';
import { SettingsService } from '../../../core/settings/settings.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { INVALID } from '@angular/forms/src/model';
import { HttpClient } from '@angular/common/http';

//Modelos
import { password } from '../../../models/admin/password';
import { log } from 'util';


export interface DialogData {
  user: string;
}

const swal = require('sweetalert');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AdminServiceService, AuthService]
})
export class LoginComponent implements OnInit {

  valForm: FormGroup;
  loading = false;
  returnUrl: string;
  failLogin: any;
  noAccess: any;
  foto: string;
  Priv : Array<any> = [];
  email: string;

  constructor(
    private service: AdminServiceService,
    public settings: SettingsService,
    fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    public dialog: MatDialog) {

    this.valForm = fb.group({
      'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
      'password': [null, Validators.required]
    });
  }

  submitForm($ev: any, value: any) {
    $ev.preventDefault();
    for (const c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {
      this.login(value.email, value.password);
    }
  }

  login(email: string, password: string) {
    this.loading = true;
    const user = {
      email: email,
      password: password
    }
    this.authenticationService.login(user)
      .subscribe(
        data => {
          if (data !== 404 && data !== 406) {
            sessionStorage.setItem('access-token', data['token'])
            var decode = this.getDecodedAccessToken(sessionStorage.getItem('access-token'));
            debugger;
            this.Priv = JSON.parse(decode['Privilegios'])
            this.settings.user['id'] = decode['IdUsuario'];
            this.settings.user['nombre'] = decode['Nombre'];
            this.settings.user['usuario'] = decode['Usuario'];
            this.settings.user['email'] = decode['Email'];
            this.settings.user['clave'] = decode['Clave'];
            this.settings.user['tipoUsuarioId'] = decode['tipoUsuarioId'];
            this.settings.user['tipo'] = decode['Tipo'];
            this.settings.user['sucursal'] = decode['Sucursal'];
            this.settings.user['foto'] = ApiConection.ServiceUrlFotoUser + decode['Clvave'] + '.jpg';
            this.settings.user['privilegios'] = this.Priv;
            this.router.navigate(['/home']);
          }
          if (data === 404) {
            this.failLogin = true;
            this.noAccess = false;
            this.loading = false;
            setTimeout(() => {
              this.failLogin = false;
            }, 5000);
          }
          if (data === 406) {
            this.noAccess = true;
            this.failLogin = false;
            this.loading = false;
            setTimeout(() => {
              this.noAccess = false;
            }, 5000);
          }
        },
        error => {
          this.loading = false;
        });
  }

  ngOnInit() {
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    sessionStorage.clear();
  }

  getDecodedAccessToken(token: string): any {
    try {
        return jwt_decode(token);
    } catch (Error) {
        return null;
    }
  }

  Contrasena(): void {
    if (this.valForm.controls['email'].status === 'INVALID') {
      swal('¡No has ingresado un correo válido!', 'Válida la información', 'error');
    } else {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '400px',
        data: {user: this.valForm.get('email').value}
      });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.email = result;
    // });
    }
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  providers: [AdminServiceService]
})
export class DialogOverviewExampleDialog {

  Codigo = false;
  Contrasena: string;
  RContrasena: string;
  ICodigo: number;
  BCodigo: number;
  showPass: boolean;
  showPassR: boolean;
  showPassL: boolean;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: AdminServiceService) {}

    passw(value: any) {
     this.Contrasena = value;
    }

    passwr(value: any) {
      this.RContrasena = value;
     }

    code(value: number) {
      this.ICodigo = value;
    }

    Enviar() {
      if (this.Contrasena !== this.RContrasena) {
        swal('La contraseñas no coinciden', 'Revisa los datos ingresados', 'error');
        return;
      }
      this.service.EnviaCorreo(this.data.user, this.Contrasena)
      .subscribe(result => {
        this.BCodigo = result;
        this.Codigo = true;
      });
    }

    Confirmar(): void {
      if (this.ICodigo !== this.BCodigo) {
        swal('El código no es correcto', 'Revisa los datos ingresados', 'error');
        return;
      }
      const datos: password = new password();
      datos.email = this.data.user;
      datos.password = this.Contrasena;
      this.service.UpdatePassword(datos)
      .subscribe(data => {
       if (data === 1) {
        swal('Se ha restablecido correctamente la contraseña', 'Intenta ingresar de nuevo', 'success');
        this.dialogRef.close();
       } else {
        swal('Huo un error la restablecer la contraseña', 'Intenta de nuevo', 'error');
       }
    });
  }

}
