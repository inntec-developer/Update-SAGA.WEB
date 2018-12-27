import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

import { Headers, Http, HttpModule, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ApiConection } from './../api-conection.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class CatalogosService {

  private urlGetDocumentosDamsa = ApiConection.ServiceUrl + ApiConection.GetDocumentosDamsa;
  private urlGetPrestacionesLey = ApiConection.ServiceUrl + ApiConection.GetPrestacionesLey;
  private UrlGetPrioridades = ApiConection.ServiceUrl + ApiConection.GetPrioridades;
  private UrlGetEstatusRequi = ApiConection.ServiceUrl + ApiConection.GetEstatusRequi;
  private UrlGetMotivosLiberacion = ApiConection.ServiceUrl + ApiConection.GetMotivosLiberacion;
  private UrlActividadesReclutador = ApiConection.ServiceUrl + ApiConection.GetTiposActividadesRecl;

  constructor(private _httpClient: HttpClient) { }

  getDocumentosDamsa() : Observable<any>{
    return this._httpClient.get(this.urlGetDocumentosDamsa)
  }

  getPrestacionesLey() : Observable<any>{
    return this._httpClient.get(this.urlGetPrestacionesLey);
  }

  getPrioridades() : Observable<any>{
    return this._httpClient.get(this.UrlGetPrioridades);
  }

  getEstatusRequi(tipoMov : any) : Observable<any>{
    let params = new HttpParams().set('tipoMov', tipoMov);
    return this._httpClient.get(this.UrlGetEstatusRequi, {params: params});
  }

  getMotivosLiberacion() : Observable<any>{
    return this._httpClient.get(this.UrlGetMotivosLiberacion);
  }

  getActividadesReclutador() : Observable<any>{
    return this._httpClient.get(this.UrlActividadesReclutador);
  }

  

}
