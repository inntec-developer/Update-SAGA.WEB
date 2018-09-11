import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ApiConection } from '../api-conection.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
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

  constructor(private _http: HttpClient) { }



  getComentariosCandidato(Id: any): Observable<any> {
    let params = new HttpParams().set('Id', Id)
    return this._http.get(this.UrlComentariosCandidato, { params: params });
  }

  getcomentariosVacante(Id: any): Observable<any> {
    let params = new HttpParams().set('Id', Id);
    return this._http.get(this.UrlComentariosVacante, { params: params });
  }

  addComentarioCandidato(data: any): Observable<any> {
    return this._http.post(this.UrlAddComentarioCandidato, data, httpOptions);
  }

  addComentarioVacante(data: any): Observable<any> {
    return this._http.post(this.UrlAddComentarioVacante, data, httpOptions);
  }
}
