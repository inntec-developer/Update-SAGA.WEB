import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { ApiConection } from '../api-conection.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class PostulateService {
  private UrlGetPostulados = ApiConection.ServiceUrl + ApiConection.getPostulados;
  private UrlGetProceso = ApiConection.ServiceUrl + ApiConection.getProcesoPostulados;
  private UrlSetProceso = ApiConection.ServiceUrl + ApiConection.setProcesoPostulado;
  private UrlSetStatusBolsa = ApiConection.ServiceUrl + ApiConection.setStatusBolsa;

  constructor(private _HttpClient: HttpClient) { }

  getPostulados(VacanteId : string) : Observable<any>{
    let params = new HttpParams().set('VacanteId', VacanteId);
    return this._HttpClient.get(this.UrlGetPostulados, { params: params })
  }

  GetProceso(VacanteId, ReclutadorId) : Observable<any>{
    let params = new HttpParams().set('VacanteId', VacanteId).set('ReclutadorId', ReclutadorId);
    return this._HttpClient.get(this.UrlGetProceso, { params: params })
  }

  SetProceso(data)
  {
    let params = new HttpParams().set('datos', data)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this._HttpClient.post(this.UrlSetProceso, data, httpOptions )
  }

  SetStatusBolsa(data)
  {
    let params = new HttpParams().set('datos', data)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this._HttpClient.post(this.UrlSetStatusBolsa, data, httpOptions )
  }

}
