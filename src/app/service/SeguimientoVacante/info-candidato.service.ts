import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

import { ApiConection } from './../api-conection.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { _createDefaultCookieXSRFStrategy } from '@angular/http/src/http_module';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class InfoCandidatoService {
  private UrlGetInfoCandidato = ApiConection.ServiceUrl + ApiConection.getInfoCandidato;
  private UrlGetMisVacantes = ApiConection.ServiceUrl + ApiConection.getMisVacantes;
  private UrlPostulaciones = ApiConection.ServiceUrl + ApiConection.getPostulaciones;
  private UrlApartarCandidato = ApiConection.ServiceUrl + ApiConection.setApartarCandidato;
  private UrlLiberarCandidato = ApiConection.ServiceUrl + ApiConection.setLiberarCandidato;

  
  constructor(private _httpClient : HttpClient,) { }

  getInfoCandidato(id : string) : Observable<any>{
    let params = new HttpParams().set('Id', id);
    return this._httpClient.get(this.UrlGetInfoCandidato, {params: params});
  }
  getMisVacantes(id : string) : Observable<any>{
    let params =  new HttpParams().set('Id', id);
    return this._httpClient.get(this.UrlGetMisVacantes, {params: params});
  }

  getPostulaciones(id : string) : Observable<any>{
    let params = new HttpParams().set('Id', id);
    return this._httpClient.get(this.UrlPostulaciones, {params: params});
  }

  setApartarCandidato(data : any ) : Observable<any> {
    return this._httpClient.post(this.UrlApartarCandidato, data, httpOptions);
  }

  setLiberarCandidato(data: any) : Observable<any>{
    let params = new HttpParams().set('Id', data);
    return this._httpClient.get(this.UrlLiberarCandidato,{ params: params});
  }

}
