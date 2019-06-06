import 'rxjs/add/operator/map'

import * as jwt_decode from "jwt-decode";

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ApiConection } from '../api-conection.service';
import { FooterRowOutlet } from '@angular/cdk/table';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { SettingsService } from '../../core/settings/settings.service';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AuthService {

  private UrlLogIn = ApiConection.ServiceUrl + ApiConection.login;
  private UrlGetUser = ApiConection.ServiceUrl + ApiConection.GetUser;
  private UrlValidarEmail = ApiConection.ServiceUrl + ApiConection.validarEmail;
  private UrlValidarDAL = ApiConection.ServiceUrl + ApiConection.validarDAL;
  Priv: Array<any> = [];

  MessageError: any;

  constructor(private _httpClient: HttpClient, private settings: SettingsService, private router: Router, ) { }

  login(user: any): Observable<any> {
    return this._httpClient.post(this.UrlLogIn, user, httpOptions).pipe(map(user => user));
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('access-token');
  }

  getUser(user: any) {
    return this._httpClient.post(this.UrlGetUser, user, httpOptions).pipe(map(data => data));;
  }

  public isUserActive(email: string): Observable<any> {
    let params = new HttpParams().set('e', email);
    return this._httpClient.get(this.UrlValidarEmail, { params: params }).pipe(map(data => data));
  }

  public isUserDAL(dal: string): Observable<any> {
    let params = new HttpParams().set('dal', dal)
    return this._httpClient.get(this.UrlValidarDAL, { params: params })
      .pipe(map(data => data));
  }

  public isAuthenticated(): boolean {
    if (sessionStorage.getItem('access-token') != null) {
      if (this.settings.user['id'] == '') {
        var decode = this.getDecodedAccessToken(sessionStorage.getItem('access-token'));
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
        this.settings.user['lider'] = decode['Lider'];
        this.settings.user['liderId'] = decode['LiderId'];
        this.settings.user['privilegios'] = this.Priv;
      }
      return true;
    }
    else {
      return false;
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }

  public getToken(): string {
    return sessionStorage.getItem('access-token');
  }

}
