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
export class PostulateService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('validation-token')
    })
  };

  private UrlGetPostulados = ApiConection.ServiceUrl + ApiConection.getPostulados;
  private UrlGetProceso = ApiConection.ServiceUrl + ApiConection.getProcesoPostulados;
  private UrlSetProceso = ApiConection.ServiceUrl + ApiConection.setProcesoPostulado;
  private UrlSetProcesoVacante = ApiConection.ServiceUrl + ApiConection.setProcesoVacante;
  private UrlSetStatusBolsa = ApiConection.ServiceUrl + ApiConection.setStatusBolsa;
  private UrlSendEmailCandidato = ApiConection.ServiceUrl + ApiConection.sendEmailCandidato;
  private UrlSendEmailContratados = ApiConection.ServiceUrl + ApiConection.sendEmailContratados;
  private UrlSendEmailsNoContrado = ApiConection.ServiceUrl + ApiConection.sendEmailNoContratado;
  private UrlGetConteoVacante = ApiConection.ServiceUrl + ApiConection.getConteoVacante;
  private UrlRegistrarCandidatos = ApiConection.ServiceUrl + ApiConection.registrarCandidatos;
  private UrlValidarEmailCandidato = ApiConection.ServiceUrl + ApiConection.validarEmailCandidato;
  private UrlValidarTelCandidato = ApiConection.ServiceUrl + ApiConection.validarTelCandidato;
  private UrlGetCandidatosCubiertos = ApiConection.ServiceUrl + ApiConection.getCandidatosCubiertos;
  private UrlCubrirMasivos = ApiConection.ServiceUrl + ApiConection.cubrirMasivos;

  constructor(private _HttpClient: HttpClient) { }

  ValidarEmailCandidato(email: string): Observable<any> {
    let params = new HttpParams().set('email', email);
    return this._HttpClient.get(this.UrlValidarEmailCandidato, {params: params, headers: this.httpOptions.headers })
  }
  ValidarTelCandidato(lada, telefono): Observable<any> {
    const params = new HttpParams().set('lada', lada).set('telefono', telefono);
    return this._HttpClient.get(this.UrlValidarTelCandidato, {params: params, headers: this.httpOptions.headers })
  }
  RegistrarCandidatos(data)
  {
    return this._HttpClient.post(this.UrlRegistrarCandidatos, data, this.httpOptions )
  }
  getPostulados(VacanteId : string) : Observable<any>{
    let params = new HttpParams().set('VacanteId', VacanteId);
    return this._HttpClient.get(this.UrlGetPostulados, { params: params, headers: this.httpOptions.headers })
  }

  GetProceso(VacanteId, ReclutadorId) : Observable<any>{
    let params = new HttpParams().set('VacanteId', VacanteId).set('ReclutadorId', ReclutadorId);
    return this._HttpClient.get(this.UrlGetProceso, { params: params, headers: this.httpOptions.headers })
  }

  GetConteoVacante(VacanteId, ClienteId) : Observable<any>{
    let params = new HttpParams().set('RequisicionId', VacanteId).set('ClienteId', ClienteId);
    return this._HttpClient.get(this.UrlGetConteoVacante, { params: params, headers: this.httpOptions.headers })
  }

  GetCandidatosCubiertos(requisicionId): Observable<any> {
    let params = new HttpParams().set('requisicionId', requisicionId);
    return this._HttpClient.get(this.UrlGetCandidatosCubiertos, { params: params, headers: this.httpOptions.headers })
  }
  CubrirMasivos(data) {
    return this._HttpClient.post(this.UrlCubrirMasivos, data, this.httpOptions );
  }

  SetProcesoVacante(data) {
    return this._HttpClient.post(this.UrlSetProcesoVacante, data, this.httpOptions )
  }

  SetProceso(data) {
    return this._HttpClient.post(this.UrlSetProceso, data, this.httpOptions )
  }

  SetStatusBolsa(data)
  {
    return this._HttpClient.post(this.UrlSetStatusBolsa, data, this.httpOptions )
  }

  SendEmailCandidato(data)
  {
    return this._HttpClient.post(this.UrlSendEmailCandidato, data, this.httpOptions )
  }
  SendEmailContratados(data)
  {
    return this._HttpClient.post(this.UrlSendEmailContratados, data, this.httpOptions )
  }

  SendEmailsNoContratado(data)
  {
    return this._HttpClient.post(this.UrlSendEmailsNoContrado, data, this.httpOptions )
  }

}
