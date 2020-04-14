
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ApiConection } from './../api-conection.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('validation-token')
    })
  };
  /**
   *
   */
  private UrlComentariosCandidato = ApiConection.ServiceUrl + ApiConection.ComentariosCandidato;
  private UrlAddComentarioCandidato = ApiConection.ServiceUrl + ApiConection.AddComentariosCandidato;
  private UrlComentariosVacante = ApiConection.ServiceUrl + ApiConection.ComentariosVacante;
  private UrlAddComentarioVacante = ApiConection.ServiceUrl + ApiConection.AddComentariosVacante;
  private UrlDeleteComentarioVacante = ApiConection.ServiceUrl + ApiConection.DeleteComentariosVacante;
  private UrlUpdateComentarioVacante = ApiConection.ServiceUrl + ApiConection.UpdateComentariosVacante;
  private URLAddComentariosNR = ApiConection.ServiceUrl + ApiConection.AddComentarioNR;
  private URLAddRespuesta = ApiConection.ServiceUrl + ApiConection.AddRespuesta;

  constructor(private _http: HttpClient) { }

  getComentariosCandidato(Id: any): Observable<any> {
    let params = new HttpParams().set('Id', Id)
    return this._http.get(this.UrlComentariosCandidato, { params: params, headers: this.httpOptions.headers });
  }

  getComentariosVacante(Id: any): Observable<any> {
    const params = new HttpParams().set('Id', Id);
    return this._http.get(this.UrlComentariosVacante, { params: params, headers: this.httpOptions.headers });
  }
  addComentarioCandidato(data: any): Observable<any> {
    return this._http.post(this.UrlAddComentarioCandidato, data, this.httpOptions);
  }
  addComentarioVacante(data: any): Observable<any> {
    return this._http.post(this.UrlAddComentarioVacante, data, this.httpOptions);
  }
  DeleteComentarioVacante(data: any): Observable<any> {
    return this._http.post(this.UrlDeleteComentarioVacante, data, this.httpOptions);
  }
  UpdateComentarioVacante(data: any): Observable<any> {
    return this._http.post(this.UrlUpdateComentarioVacante, data, this.httpOptions);
  }
  AddComentariosNR(data): Observable<any> {
    return this._http.post(this.URLAddComentariosNR, data, this.httpOptions);
  }

  AddRespuesta(data): Observable<any> {
    return this._http.post(this.URLAddRespuesta, data, this.httpOptions);
  }
}
