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

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class ComponentsService {
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
  private UrlDeleteAlertStm = ApiConection.ServiceUrl +ApiConection.DeleteAlertStm;

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

  constructor(private _httpClient : HttpClient) { }


  getVCubierta(data: any) : Observable<any>{
    let params = new HttpParams().set('usuario', data);
    return this._httpClient.get(this.UrlVacanteCubierta, {params: params});
  }
  getVActiva(data: any) : Observable<any>{
    let params = new HttpParams().set('usuario', data);
    return this._httpClient.get(this.UrlVacanteActiva, {params: params});
  }
  getVPorVencer(data: any) : Observable<any>{
    let params = new HttpParams().set('usuario', data);
    return this._httpClient.get(this.UrlVacantePorVencer, {params: params});
  }
  getVVencida(data: any) : Observable<any>{
    let params = new HttpParams().set('usuario', data);
    return this._httpClient.get(this.UrlVacanteVencida, {params: params});
  }

  getUserGroup() : Observable<any>{
    return this._httpClient.get(this.urlGetUserGroup);
  }

  getUserGroupL() : Observable<any>{
    return this._httpClient.get(this.urlGetUserGroupL);
  }

  getCalendarEvent(data: any) : Observable<any>{
    let params = new HttpParams().set('userId', data);
    return this._httpClient.get(this.urlGetCalendarEvent, {params: params});
  }

  addCalendarEvent(data: any) : Observable<any>{
    return this._httpClient.post(this.urlAddCalendarEvent, data, httpOptions);
  }

  updateCalendarEvent(data: any) : Observable<any>{
    return this._httpClient.post(this.urlUpdateCalendarEvent, data, httpOptions);
  }

  deleteCalendarEvent(data: any) : Observable<any>{
    return this._httpClient.post(this.urlDeleteCalendarEvent, data, httpOptions);
  }

  culminarElement(data: any) : Observable<any>{
    let params = new HttpParams().set('Id', data);
    return this._httpClient.get(this.UrlCulminarEvent, {params: params});
  }

  getAlertStm(data: string) : Observable<any>{
    let params =  new HttpParams().set('Id', data);
    return this._httpClient.get(this.UrlGetAlertStm, {params: params});
  }

  getAllAlertStm(data: string) : Observable<any>{
    let params =  new HttpParams().set('Id', data);
    return this._httpClient.get(this.UrlGetAllAletStm, {params: params});
  }

  deleteAlertStm(Id: any,  all: any) : Observable<any>{
    let params = new HttpParams().set('Id', Id).set('all', all);
    return this._httpClient.get(this.UrlDeleteAlertStm, {params: params});
  }

  getGraficaVPA(data: any) : Observable<any>{
    let params = new HttpParams().set('UsuarioId', data);
    return this._httpClient.get(this.UrlGetVacantesInicioPA, {params: params})
    .map(result => result);
  }

  getRequiGraficaPA(estado:any, usuarioId: any) : Observable<any>{
    let params = new HttpParams().set('estado', estado).set('UsuarioId', usuarioId);
    return this._httpClient.get(this.UrlGetRequisicionesGPA, {params: params})
    .map(result => result);
  }

  getRPTCandVacante(vacateId: any) : Observable<any>{
    let params = new HttpParams().set('VacanteId', vacateId);
    return this._httpClient.get(this.UrlGetRPTCandidatoVacante, {params: params})
    .map(result => result);
  }
  //Muestra un error en consola y regresa el mismo al Frond-End en caso de que se genere el mismo.
  public handleError(error: any ){
    console.log('Error Internar Server', error);
    if(error instanceof Response){
      return Observable.throw(error.json().error || 'Back-End server error');
    }
    return Observable.throw(error || 'Back-End server error');
  }



}
