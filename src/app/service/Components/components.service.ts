import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

import { ApiConection } from '../api-conection.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

@Injectable()
export class ComponentsService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('validation-token')
    })
  };
  private urlGetUserGroup = ApiConection.ServiceUrl + ApiConection.GetUserGroup;
  private urlGetUserGroupL = ApiConection.ServiceUrl + ApiConection.GetUserGroupL;
  private urlGetCalendarEvent = ApiConection.ServiceUrl + ApiConection.GetCalendarioEvent;
  private urlAddCalendarEvent = ApiConection.ServiceUrl + ApiConection.AddCalendarioEvent;
  private urlUpdateCalendarEvent = ApiConection.ServiceUrl + ApiConection.UpdateCalendarioEvent;
  private urlDeleteCalendarEvent = ApiConection.ServiceUrl + ApiConection.DeleteCalendarioEvent;
  private UrlCulminarEvent = ApiConection.ServiceUrl + ApiConection.CulminarEvent;

  // Alertas del Sistema General
  private UrlGetAlertStm = ApiConection.ServiceUrl + ApiConection.GetAlertStm;
  private UrlGetAllAletStm = ApiConection.ServiceUrl + ApiConection.GetAllAlertStm;
  private UrlDeleteAlertStm = ApiConection.ServiceUrl + ApiConection.DeleteAlertStm;

  // Graficas
  private UrlGetVacantesInicioPA = ApiConection.ServiceUrl + ApiConection.GraficPAVacantes;
  private UrlGetRequisicionesGPA = ApiConection.ServiceUrl + ApiConection.GetRequisicionesGPA;

  //Candidatos
  private UrlGetRPTCandidatoVacante = ApiConection.ServiceUrl + ApiConection.GetRepoteCandidatos;

  //Indicador Grafica
  private UrlVacanteCubierta = ApiConection.ServiceUrl + ApiConection.getCubiertaG;
  private UrlVacanteActiva = ApiConection.ServiceUrl + ApiConection.getActivaG;
  private UrlVacantePorVencer = ApiConection.ServiceUrl + ApiConection.getPorvencerG;
  private UrlVacanteVencida = ApiConection.ServiceUrl + ApiConection.getVencidasG;
  private UrlVacanteResumen = ApiConection.ServiceUrl + ApiConection.getResumenG;

  //Indicadores de Inicio

  private UrlGetPerfil = ApiConection.ServiceUrl + ApiConection.getPerfiles;
  private UrlGetFolios = ApiConection.ServiceUrl + ApiConection.getFolios;
  private UrlGetPosiciones = ApiConection.ServiceUrl + ApiConection.getPosiciones;
  private UrlGetPosicionesActivas = ApiConection.ServiceUrl + ApiConection.getPosicionesActivas;
  private UrlGetCandidatos = ApiConection.ServiceUrl + ApiConection.getCandidatos;
  private UrlGetCandidatosIncio = ApiConection.ServiceUrl + ApiConection.getCandidatosInicio;

  constructor(private _httpClient: HttpClient) { }


  getVResumen(data: any): Observable<any> {
    let params = new HttpParams().set('usuario', data);
    return this._httpClient.get(this.UrlVacanteResumen, { params: params, headers: this.httpOptions.headers});
  }

  getVCubierta(data: any): Observable<any> {
    let params = new HttpParams().set('usuario', data);
    return this._httpClient.get(this.UrlVacanteCubierta, { params: params, headers: this.httpOptions.headers});
  }
  getVActiva(data: any): Observable<any> {
    let params = new HttpParams().set('usuario', data);
    return this._httpClient.get(this.UrlVacanteActiva, { params: params, headers: this.httpOptions.headers});
  }
  getVPorVencer(data: any): Observable<any> {
    let params = new HttpParams().set('usuario', data);
    return this._httpClient.get(this.UrlVacantePorVencer, { params: params, headers: this.httpOptions.headers});
  }
  getVVencida(data: any): Observable<any> {
    let params = new HttpParams().set('usuario', data);
    return this._httpClient.get(this.UrlVacanteVencida, { params: params, headers: this.httpOptions.headers});
  }

  getUserGroup(): Observable<any> {
    return this._httpClient.get(this.urlGetUserGroup, {headers: this.httpOptions.headers});
  }

  getUserGroupL(): Observable<any> {
    return this._httpClient.get(this.urlGetUserGroupL, {headers: this.httpOptions.headers});
  }

  getCalendarEvent(data: any): Observable<any> {
    let params = new HttpParams().set('userId', data);
    return this._httpClient.get(this.urlGetCalendarEvent, { params: params, headers: this.httpOptions.headers});
  }

  addCalendarEvent(data: any): Observable<any> {
    return this._httpClient.post(this.urlAddCalendarEvent, data, this.httpOptions);
  }

  updateCalendarEvent(data: any): Observable<any> {
    return this._httpClient.post(this.urlUpdateCalendarEvent, data, this.httpOptions);
  }

  deleteCalendarEvent(data: any): Observable<any> {
    return this._httpClient.post(this.urlDeleteCalendarEvent, data, this.httpOptions);
  }

  culminarElement(data: any): Observable<any> {
    let params = new HttpParams().set('Id', data);
    return this._httpClient.get(this.UrlCulminarEvent, { params: params, headers: this.httpOptions.headers});
  }

  getAlertStm(data: string): Observable<any> {
    let params = new HttpParams().set('Id', data);
    return this._httpClient.get<any>(this.UrlGetAlertStm, { params: params, headers: this.httpOptions.headers});
  }

  getAllAlertStm(data: string): Observable<any> {
    let params = new HttpParams().set('Id', data);
    return this._httpClient.get(this.UrlGetAllAletStm, { params: params, headers: this.httpOptions.headers});
  }

  deleteAlertStm(Id: any, all: any): Observable<any> {
    let params = new HttpParams().set('Id', Id).set('all', all);
    return this._httpClient.get(this.UrlDeleteAlertStm, { params: params, headers: this.httpOptions.headers});
  }

  getGraficaVPA(data: any): Observable<any> {
    let params = new HttpParams().set('UsuarioId', data);
    return this._httpClient.get(this.UrlGetVacantesInicioPA, { params: params, headers: this.httpOptions.headers})
      .map(result => result);
  }

  getRequiGraficaPA(estado: any, usuarioId: any): Observable<any> {
    let params = new HttpParams().set('estado', estado).set('UsuarioId', usuarioId);
    return this._httpClient.get(this.UrlGetRequisicionesGPA, { params: params, headers: this.httpOptions.headers})
      .map(result => result);
  }

  getRPTCandVacante(vacateId: any): Observable<any> {
    let params = new HttpParams().set('VacanteId', vacateId);
    return this._httpClient.get(this.UrlGetRPTCandidatoVacante, { params: params, headers: this.httpOptions.headers})
      .map(result => result);
  }

  getPerfiles(): Observable<any> {
    return this._httpClient.get(this.UrlGetPerfil, this.httpOptions)
      .map(result => result);
  }

  getFolios(usuario: any): Observable<any> {
    return this._httpClient.post(this.UrlGetFolios, usuario, this.httpOptions)
      .map(result => result);
  }

  getPosiciones(usuario: any): Observable<any> {
    return this._httpClient.post(this.UrlGetPosiciones, usuario, this.httpOptions)
      .map(result => result);
  }

  getPosicionesActivas(usuario: any): Observable<any> {
    return this._httpClient.post(this.UrlGetPosicionesActivas, usuario, this.httpOptions)
      .map(result => result);
  }

  getCandidatos(): Observable<any> {
    return this._httpClient.get(this.UrlGetCandidatos, this.httpOptions)
      .map(result => result);
  }

  getCandidatosInicio(): Observable<any> {
    return this._httpClient.get(this.UrlGetCandidatosIncio, this.httpOptions)
      .map(result => result);
  }
}
