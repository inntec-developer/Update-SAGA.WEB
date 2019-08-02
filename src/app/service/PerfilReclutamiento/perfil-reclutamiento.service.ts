import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ApiConection } from './../api-conection.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class PerfilReclutamientoService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('validation-token')
    })
  };

  private urlGetCliente = ApiConection.ServiceUrl + ApiConection.GetClientePerfilR;
  private urlGetInfoCliente = ApiConection.ServiceUrl + ApiConection.GetInfoCliente;
  private urlGetClienteId = ApiConection.ServiceUrl + ApiConection.GetClienteId;

  constructor(
    private _httpClient: HttpClient
  ) { }

  getClientes(busqueda: any): Observable<any> {
    const params = new HttpParams().set('busqueda', busqueda);
    return this._httpClient.get<any>(this.urlGetCliente, { params: params, headers: this.httpOptions.headers });
  }

  getInfoCliente(ClienteId: any): Observable<any> {
    const params = new HttpParams().set('ClienteId', ClienteId)
    return this._httpClient.get<any>(this.urlGetInfoCliente, { params: params, headers: this.httpOptions.headers });
  }

  getClienteId(perfilId: any) {
    const params = new HttpParams().set('PerfilId', perfilId);
    return this._httpClient.get<any>(this.urlGetClienteId, { params: params, headers: this.httpOptions.headers });
  }


}
