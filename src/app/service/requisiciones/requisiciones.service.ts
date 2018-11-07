import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { ApiConection } from '../api-conection.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class RequisicionesService {
  private urlGetViewDamfos = ApiConection.ServiceUrl + ApiConection.GetViewDamfos;
  private urlAddress = ApiConection.ServiceUrl + ApiConection.AddressCliente;
  private urlCreateRequi = ApiConection.ServiceUrl + ApiConection.CreateRequi;
  private urlGetRequisicionById = ApiConection.ServiceUrl + ApiConection.GetRequisicionById;
  private urlGetRequisicionByFolio = ApiConection.ServiceUrl + ApiConection.GetRequisicionByFolio;
  private urlGetDamfoById = ApiConection.ServiceUrl + ApiConection.Damfo290GetById;
  private urlGetDamfoRutasCamion = ApiConection.ServiceUrl + ApiConection.GetDamfoRutasCamion;
  private urlGetRequisicionesAll = ApiConection.ServiceUrl + ApiConection.GetRequisicionesAll;
  private urlGetRequiReclutador = ApiConection.ServiceUrl + ApiConection.GetRequiReclutador;
  private urlUpdateRequisicion = ApiConection.ServiceUrl + ApiConection.UpdateRequisicion;
  private urlDeleteRequisicion = ApiConection.ServiceUrl + ApiConection.DeleteRequisicion;
  private urlCancelRequisicion = ApiConection.ServiceUrl + ApiConection.CancelRequisicion;
  private urlReActivarRequisicion = ApiConection.ServiceUrl + ApiConection.ReActivarRequisicion;
  private urlAsignarRequisicion = ApiConection.ServiceUrl + ApiConection.AsignarRequisicion;
  private urlGetDireccionRequisicion = ApiConection.ServiceUrl + ApiConection.GetDireccionRequisicion;
  private urlGetRutasCamionRequi = ApiConection.ServiceUrl + ApiConection.GetRutasCamionRequisicion;
  private urlAddRutaCamion = ApiConection.ServiceUrl + ApiConection.AddRutaCamion;
  private urlUpdateRutaCamion = ApiConection.ServiceUrl + ApiConection.UpdateRutaCamion;
  private urlDeleteRutaCamion = ApiConection.ServiceUrl + ApiConection.DeleteRutaCamion;
  private urlUpdateVacantes = ApiConection.ServiceUrl + ApiConection.UpdateVacantes;
  private urlGetHorariosReequisicion = ApiConection.ServiceUrl + ApiConection.GetHorariosRequi;
  private urleGetVacantesDamgfo = ApiConection.ServiceUrl + ApiConection.GetVacantesDamfo;
  private urlGetHorariosRequiConteo = ApiConection.ServiceUrl + ApiConection.GetHorariosRequiConteo;
  private URLGetRequisicionesEstatus = ApiConection.ServiceUrl + ApiConection.GetRequisicioneEstatus;

  constructor(private http: Http, private _httpClient: HttpClient) { }
  // Recupera todos los damfos que esten dados de alta y se encuentren activos
  getDamgo290(): Observable<any> {
    return this.http.get(this.urlGetViewDamfos)
      .map(result => result.json())
      .catch(this.handleError);
  }
  // Recupera las direcciones del cliente que se seleccione para generar Requisicion
  getAddress(damfoId: string): Observable<any> {
    return this.http.get(this.urlAddress + damfoId)
      .map(result => result.json())
      .catch(this.handleError);
  }
  // Generea una nueva requisicion y posteriormente regresa el ID de la nueva requisicion.
  createNewRequi(data: any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.urlCreateRequi, JSON.stringify(data), options)
      .map(result => result.json())
      .catch(this.handleError);
  }
  // Recupera la informacion completa de la requisicion que se requiera
  getNewRequi(requisicionId: string): Observable<any> {
    return this.http.get(this.urlGetRequisicionById + requisicionId)
      .map(result => result.json())
      .catch(this.handleError);
  }
  getRequiFolio(folio: string): Observable<any> {
    return this.http.get(this.urlGetRequisicionByFolio + folio)
      .map(result => result.json())
      .catch(this.handleError);
  }
  // Recupera la información completa del DAMFO-290 que se requiera.
  getDamfoById(damfoId: string) {
    return this.http.get(this.urlGetDamfoById + damfoId)
      .map(result => result.json())
      .catch(this.handleError);
  }
  // Recuperar las rutas de camiones de las direccionaes relacionadas con el damfo - cliente
  getDamfoRutasCamion(clienteId: string): Observable<any> {
    let params = new HttpParams().set('Id', clienteId);
    return this._httpClient.get(this.urlGetDamfoRutasCamion, { params: params });
  }

  // Recupera la información de las requisiciones que se han generado.
  getRequisiciones(user: string): Observable<any> {
    return this.http.get(this.urlGetRequisicionesAll + user)
      .map(result => result.json())
      .catch(this.handleError);
  }
  // Recupera la información de las requisiciones que se han asignado al reclutador.
  getRequiReclutador(user: string): Observable<any> {
    return this.http.get(this.urlGetRequiReclutador + user)
      .map(result => result.json())
      .catch(this.handleError);
  }

  // Recuperar la direccion que se registro en la requisicion.
  getRequiDireccion(id: string): Observable<any> {
    let params = new HttpParams().set('id', id)
    return this._httpClient.get(this.urlGetDireccionRequisicion, { params: params });
  }

  GetRequisicionesEstatus(estatus, usuario): Observable<any> {
    let params = new HttpParams().set('estatus', estatus).set('ReclutadorId', usuario);
    return this._httpClient.get(this.URLGetRequisicionesEstatus, { params: params });
  }

  // ---------------------------------------------------------------------------------------------------------------
  // Crud para rutas de Camiones dentro de la requisición.
  getRequiRutasCamion(id: string): Observable<any> {
    let params = new HttpParams().set('Id', id);
    return this._httpClient.get(this.urlGetRutasCamionRequi, { params: params });
  }

  addRutaCamion(data: any): Observable<any> {
    return this._httpClient.post(this.urlAddRutaCamion, data, httpOptions);
  }

  updateRutaCamion(data: any): Observable<any> {
    return this._httpClient.post(this.urlUpdateRutaCamion, data, httpOptions);
  }

  deleteRutaCamion(data: any): Observable<any> {
    return this._httpClient.post(this.urlDeleteRutaCamion, data, httpOptions);
  }
  // ---------------------------------------------------------------------------------------------------------------
  getRequiHorarios(requisicionId: string) {
    return this.http.get(this.urlGetHorariosReequisicion + requisicionId)
      .map(result => result.json())
      .catch(this.handleError);
  }

  getVacantesDamfo(damfoId: string): Observable<any> {
    let params = new HttpParams().set('Id', damfoId);
    return this._httpClient.get(this.urleGetVacantesDamgfo, { params: params });
  }
  logError(urleGetVacantesDamgfo: string, error: any): any {
    throw new Error("Method not implemented.");
  }
  log(filename: any, data: any): any {
    throw new Error("Method not implemented.");
  }

  updateRequisicion(requi: any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.urlUpdateRequisicion, JSON.stringify(requi), options)
      .map(result => result.json())
      .catch(this.handleError);
  }

  updateVacanates(vacantes: any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.urlUpdateVacantes, JSON.stringify(vacantes), options)
      .map(result => result.json())
      .catch(this.handleError);
  }

  deleteRequisicion(requi: any): Observable<any> {
    let header = new Headers({ 'content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(this.urlDeleteRequisicion, JSON.stringify(requi), options)
      .map(result => result.json())
      .catch(this.handleError);
  }

  cancelRequisicion(requi: any): Observable<any> {
    let header = new Headers({ 'content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(this.urlCancelRequisicion, JSON.stringify(requi), options)
      .map(result => result.json())
      .catch(this.handleError);
  }

  reActivarRequisicion(requi: any): Observable<any> {
    let header = new Headers({ 'content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(this.urlReActivarRequisicion, JSON.stringify(requi), options)
      .map(result => result.json())
      .catch(this.handleError);
  }

  asignarRequisicion(asignar: any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.urlAsignarRequisicion, JSON.stringify(asignar), options)
      .map(result => result.json())
      .catch(this.handleError);
  }

  GetHorariosRequiConteo(requisicionId: any): Observable<any> {
    let params = new HttpParams().set('requisicionId', requisicionId);
    return this._httpClient.get(this.urlGetHorariosRequiConteo, { params: params });
  }

  // Muestra un error en consola y regresa el mismo al Frond-End en caso de que se genere el mismo.
  public handleError(error: any) {
    console.log('Error Internar Server', error);
    if (error instanceof Response) {
      return Observable.throw(error.json().error || 'Back-End server error');
    }
    return Observable.throw(error || 'Back-End server error');
  }
}
