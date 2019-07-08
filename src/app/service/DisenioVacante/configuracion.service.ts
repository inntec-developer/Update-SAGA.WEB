import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

import { Headers, Http, HttpModule, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ApiConection } from '../api-conection.service';
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
export class ConfiguracionService {
// Url de servicios.
private UrlResumen = ApiConection.ServiceUrl+ApiConection.setResumen;
private UrlDetalle = ApiConection.ServiceUrl+ApiConection.setDetalle;
private UrlPublicar = ApiConection.ServiceUrl+ApiConection.updatePublicar;
private UrlGuardar = ApiConection.ServiceUrl+ApiConection.GuardarConfi;

// Error.
private handleError(error: any) {
       console.log('sever error:', error);
       if (error instanceof Response) {
           return Observable.throw(error.json().error || 'backend server error');
       }
       return Observable.throw(error || 'backend server error');
   }

constructor(private http: Http, private _httpClient: HttpClient) {  }
SetDetalle(RequiID:string,Idcampo:number,detalle:boolean): Observable<any> {
   return this.http.get(this.UrlDetalle + '?Requi='+RequiID+'&Idcampo='+Idcampo+'&detalle='+detalle)
       .map(result => result.json())
       .catch(this.handleError);
}

SetResumen(RequiID:string,Idcampo:number,detalle:boolean): Observable<any> {
   return this.http.get(this.UrlResumen + '?Requi='+RequiID+'&Idcampo='+Idcampo+'&resumen='+detalle)
       .map(result => result.json())
       .catch(this.handleError);
}

// UpdatePublicar2(RequiID:string, lista:any[]): Observable<any> {
//    return this.http.post(this.UrlPublicar + '?Requi='+RequiID+'&ListadoJson='+lista)
//        .map(result => result.json())
//        .catch(this.handleError);
// }


// UpdatePublicar(data: any, requi: string): Observable<any>{
//   let headers = new Headers({'Content-Type' : 'application/json'});
//   let options = new RequestOptions({headers: headers});
//   return this.http.post(this.UrlPublicar, JSON.stringify(data), options )
//           .map(result => result.json())
//           .catch(this.handleError);
// }



UpdatePublicar(data: any, requi: string): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
    });
    var obj = {
      ListaPublicar: data,
      RequiId: requi
    }
    // let options = {
    //   headers: httpHeaders
    // };
    return this._httpClient.post(this.UrlPublicar, obj, httpOptions);
  }



GuardarPublicacion(data: any): Observable<any>{
    let headers = new Headers({'Content-Type' : 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.UrlGuardar, JSON.stringify(data), options )
            .map(result => result.json())
            .catch(this.handleError);
  }

}
