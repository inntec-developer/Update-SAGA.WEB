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
export class PerfilReclutamientoService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('validation-token')
    })
  };

  private urlGetCliente = ApiConection.ServiceUrl + ApiConection.GetClientePerfilR;
  private urlGetInfoCliente = ApiConection.ServiceUrl + ApiConection.GetInfoCliente;
  private urlGetClienteId = ApiConection.ServiceUrl + ApiConection.GetClienteId;
  private urlGetInfoPerfil = ApiConection.ServiceUrl + ApiConection.GetInfoPerfil;
  private urlGetAnexosPerfil = ApiConection.ServiceUrl + ApiConection.GetAnexosPerfil;

  private urlAddEscolaridad = ApiConection.ServiceUrl + ApiConection.AddEscolaridad;
  private urlEditEscolaridad = ApiConection.ServiceUrl + ApiConection.EditEscolaridad;
  private urlDeleteEscolaridad = ApiConection.ServiceUrl + ApiConection.DeleteEscolaridad;

  private urlCrudBeneficio = ApiConection.ServiceUrl + ApiConection.CrudBeneficio;
  private urlCrudHorarios = ApiConection.ServiceUrl + ApiConection.CrudHorario;
  private UrlCrudActividades = ApiConection.ServiceUrl + ApiConection.CrudActividades;
  private urlCrudObservaciones = ApiConection.ServiceUrl + ApiConection.CrudObservaciones;
  private urlCrudPsicometriaDamsa = ApiConection.ServiceUrl + ApiConection.CrudPsicometriaDamsa;
  private urlCrudPsicometriaCliente = ApiConection.ServiceUrl + ApiConection.CrudPsicometriaCliente;
  private urlCrudDocumentos = ApiConection.ServiceUrl + ApiConection.CrudDocumentos;
  private urlCrudProcesos = ApiConection.ServiceUrl + ApiConection.CrudProcesos;
  private urlCrudPrestaciones = ApiConection.ServiceUrl + ApiConection.CrudPrestaciones;
  private urlCrudCompCardinales = ApiConection.ServiceUrl + ApiConection.CrudCompCardinales;
  private urlCrudCompAreas = ApiConection.ServiceUrl + ApiConection.CrudCompAreas;
  private urlCrudCompGerenciales = ApiConection.ServiceUrl + ApiConection.CrudCompGerenciales

  constructor(
    private _httpClient: HttpClient
  ) { }

  getClientes(busqueda: any): Observable<any> {
    const params = new HttpParams().set('busqueda', busqueda);
    return this._httpClient.get<any>(this.urlGetCliente, { params: params, headers: this.httpOptions.headers });
  }

  getInfoCliente(ClienteId: any): Observable<any> {
    const params = new HttpParams().set('ClienteId', ClienteId)
    return this._httpClient.get<any>(this.urlGetInfoCliente, { params: params, headers: this.httpOptions.headers });
  }

  getClienteId(perfilId: any): Observable<any> {
    const params = new HttpParams().set('PerfilId', perfilId);
    return this._httpClient.get<any>(this.urlGetClienteId, { params: params, headers: this.httpOptions.headers });
  }

  getInfoPerfil(perfilId: any): Observable<any> {
    const params = new HttpParams().set('PerfilId', perfilId);
    return this._httpClient.get<any>(this.urlGetInfoPerfil, { params: params, headers: this.httpOptions.headers });
  }

  getAnexosPerfil(perfilId: any): Observable<any> {
    const params = new HttpParams().set('PerfilId', perfilId);
    return this._httpClient.get<any>(this.urlGetAnexosPerfil, { params: params, headers: this.httpOptions.headers });
  }

  addEscolaridad(data: any): Observable<any> {
    return this._httpClient.post<any>(this.urlAddEscolaridad, data, this.httpOptions);
  }

  editEscolaridad(data: any): Observable<any> {
    return this._httpClient.post<any>(this.urlEditEscolaridad, data, this.httpOptions);
  }

  deleteEscolaridad(data: any): Observable<any> {
    return this._httpClient.post<any>(this.urlDeleteEscolaridad, data, this.httpOptions);
  }

  CrudBeneficio(data: any): Observable<any> {
    return this._httpClient.post<any>(this.urlCrudBeneficio, data, this.httpOptions);
  }

  CrudHorarios(data: any): Observable<any> {
    return this._httpClient.post<any>(this.urlCrudHorarios, data, this.httpOptions);
  }

  CrudActividad(data: any): Observable<any> {
    return this._httpClient.post<any>(this.UrlCrudActividades, data, this.httpOptions);
  }

  CrudObservacion(data: any): Observable<any>{
    return this._httpClient.post<any>(this.urlCrudObservaciones, data, this.httpOptions);
  }

  CrudPsicometriaDamsa(data: any) :Observable<any>{
    return this._httpClient.post<any>(this.urlCrudPsicometriaDamsa, data, this.httpOptions);
  }

  CrudPsicometriaCliente(data: any) : Observable<any>{
    return this._httpClient.post<any>(this.urlCrudPsicometriaCliente, data, this.httpOptions);
  }

  CrudDocumentos(data: any) : Observable<any>{
    return this._httpClient.post<any>(this.urlCrudDocumentos, data, this.httpOptions);
  }

  CrudProcesos(data:any) : Observable<any>{
    return this._httpClient.post<any>(this.urlCrudProcesos, data, this.httpOptions);
  }

  CrudPrestaciones(data:any) : Observable<any>{
    return this._httpClient.post<any>(this.urlCrudPrestaciones, data, this.httpOptions);
  }

  CrudCompCardinales(data: any): Observable<any>{
    return this._httpClient.post<any>(this.urlCrudCompCardinales, data, this.httpOptions);
  }

  CrudCompAreas(data: any): Observable<any>{
    return this._httpClient.post<any>(this.urlCrudCompAreas, data, this.httpOptions);
  }

  CrudCompGerenciales(data: any): Observable<any>{
    return this._httpClient.post<any>(this.urlCrudCompGerenciales, data, this.httpOptions);
  }

}
