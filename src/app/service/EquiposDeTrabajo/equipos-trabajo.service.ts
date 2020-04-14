import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ApiConection } from './../api-conection.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsService } from '../../core/settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class EquiposTrabajoService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('validation-token')
    })
  };
  private UrlGetRporGG = ApiConection.ServiceUrl + ApiConection.GetRportGG;
  private UrlGetRporTable = ApiConection.ServiceUrl + ApiConection.GetRportTable;
  private UrlGetRportClientes = ApiConection.ServiceUrl + ApiConection.GetRportClientes;
  private UrlGetInfoClientes = ApiConection.ServiceUrl + ApiConection.GetInformeClientes;
  private UrlGetRporTableClientes = ApiConection.ServiceUrl + ApiConection.GetRportTableClientes;

  constructor(private _httpClient: HttpClient, private settings: SettingsService) { }

  GetRportGG(gg): Observable<any> {
    const params = new HttpParams().set('gg', gg);

    return this._httpClient.get(this.UrlGetRporGG, {params: params, headers: this.httpOptions.headers});
  }

  GetRportTable(usuario, orden): Observable<any> {
    const params = new HttpParams().set('usuario', usuario).set('orden', orden);

    return this._httpClient.get(this.UrlGetRporTable, {params: params});
  }

  GetRportClientes(usuarioId): Observable<any> {
    const params = new HttpParams().set('usuarioId', usuarioId);

    return this._httpClient.get(this.UrlGetRportClientes, {params: params});
  }
  GetInformeClientes(clienteId): Observable<any> {
    const params = new HttpParams().set('cc', clienteId);

    return this._httpClient.get(this.UrlGetInfoClientes, {params: params});
  }

  GetRportTableClientes(usuarioId, orden): Observable<any> {
    const params = new HttpParams().set('usuarioId', usuarioId).set('orden', orden);

    return this._httpClient.get(this.UrlGetRporTableClientes, {params: params});
  }
}
