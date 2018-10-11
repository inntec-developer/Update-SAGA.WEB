import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

import { Headers, Http, HttpModule, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ApiConection } from './../api-conection.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CatalogosService {

  private urlGetDocumentosDamsa = ApiConection.ServiceUrl + ApiConection.GetDocumentosDamsa;
  private urlGetPrestacionesLey = ApiConection.ServiceUrl + ApiConection.GetPrestacionesLey;
  private UrlGetPrioridades = ApiConection.ServiceUrl + ApiConection.GetPrioridades;
  private UrlGetEstatusRequi = ApiConection.ServiceUrl + ApiConection.GetEstatusRequi;
  private UrlGetMotivosLiberacion = ApiConection.ServiceUrl + ApiConection.GetMotivosLiberacion;

  constructor(private _http: HttpClient) { }

  getDocumentosDamsa() : Observable<any>{
    return this._http.get(this.urlGetDocumentosDamsa)
  }

  getPrestacionesLey() : Observable<any>{
    return this._http.get(this.urlGetPrestacionesLey);
  }

  getPrioridades() : Observable<any>{
    return this._http.get(this.UrlGetPrioridades);
  }

  getEstatusRequi(tipoMov : any) : Observable<any>{
    let params = new HttpParams().set('tipoMov', tipoMov);
    return this._http.get(this.UrlGetEstatusRequi, {params: params});
  }

  getMotivosLiberacion() : Observable<any>{
    return this._http.get(this.UrlGetMotivosLiberacion);
  }

  /*********************TOMA EL ERROR ¡DEJAR ESTA SECCION DE CODIGO EN LA PARTE FINAL! *********************************************/
  //Muestra un error en consola y regresa el mismo al Frond-End en caso de que se genere el mismo.
  public handleError(error: any ){
    console.log('Error Internar Server', error);
    if(error instanceof Response){
      return Observable.throw(error.json().error || 'Back-End server error');
    }
    return Observable.throw(error || 'Back-End server error');
  }

}
