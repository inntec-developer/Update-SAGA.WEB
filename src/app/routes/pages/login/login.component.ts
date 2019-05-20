import * as jwt_decode from "jwt-decode";

import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AdminServiceService } from '../../../service/AdminServicios/admin-service.service';
import { ApiConection } from "../../../service";
import { AuthService } from '../../../service/auth/auth.service';
import { CustomValidators } from 'ng2-validation';
import { SettingsService } from '../../../core/settings/settings.service';

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

  constructor(
    private service: AdminServiceService,
    public settings: SettingsService,
    fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService) {

    this.valForm = fb.group({
      'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
      'password': [null, Validators.required]
    });
  }

  submitForm($ev: any, value: any) {
    $ev.preventDefault();
    for (let c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {
      this.login(value.email, value.password)
    }
  }

  login(email: string, password: string) {
    this.loading = true;
    var user = {
      email: email,
      password: password
    }
    this.authenticationService.login(user)
      .subscribe(
        data => {
          if (data != 404 && data != 406) {
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
          if (data == 404) {
            this.failLogin = true;
            this.noAccess = false;
            this.loading = false;
            setTimeout(() => {
              this.failLogin = false;
            }, 5000);
          }
          if (data == 406) {
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
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }


}
