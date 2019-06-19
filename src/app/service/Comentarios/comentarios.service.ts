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
import { Observable } from 'rxjs/Rx';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem('valation-token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  /**
   *
   */
  private UrlComentariosCandidato = ApiConection.ServiceUrl + ApiConection.ComentariosCandidato;
  private UrlAddComentarioCandidato = ApiConection.ServiceUrl + ApiConection.AddComentariosCandidato;
  private UrlComentariosVacante = ApiConection.ServiceUrl + ApiConection.ComentariosVacante;
  private UrlAddComentarioVacante = ApiConection.ServiceUrl + ApiConection.AddComentariosVacante;
  private URLAddComentariosNR = ApiConection.ServiceUrl + ApiConection.AddComentarioNR;
  private URLAddRespuesta = ApiConection.ServiceUrl + ApiConection.AddRespuesta;

  constructor(private _http: HttpClient) { }



  getComentariosCandidato(Id: any): Observable<any> {
    let params = new HttpParams().set('Id', Id)
    return this._http.get(this.UrlComentariosCandidato, { params: params, headers: httpOptions.headers });
  }

  getComentariosVacante(Id: any): Observable<any> {
    let params = new HttpParams().set('Id', Id);
    return this._http.get(this.UrlComentariosVacante, { params: params, headers: httpOptions.headers });
  }

  addComentarioCandidato(data: any): Observable<any> {
    return this._http.post(this.UrlAddComentarioCandidato, data, httpOptions);
  }

  addComentarioVacante(data: any): Observable<any> {
    return this._http.post(this.UrlAddComentarioVacante, data, httpOptions);
  }

  AddComentariosNR(data) : Observable<any> {
    return this._http.post(this.URLAddComentariosNR, data, httpOptions );
}

  AddRespuesta(data) : Observable<any> {
    return this._http.post(this.URLAddRespuesta, data, httpOptions );
  }
}
