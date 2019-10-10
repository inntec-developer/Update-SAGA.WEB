import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ApiConection } from './../api-conection.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RequisicionesService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('validation-token')
    })
  };

  private urlGetViewDamfos = ApiConection.ServiceUrl + ApiConection.GetViewDamfos;
  private urlGetDamfoById = ApiConection.ServiceUrl + ApiConection.Damfo290GetById;
  private urlGetDamfoRutasCamion = ApiConection.ServiceUrl + ApiConection.GetDamfoRutasCamion;
  private urleGetVacantesDamgfo = ApiConection.ServiceUrl + ApiConection.GetVacantesDamfo;

  private urlAddress = ApiConection.ServiceUrl + ApiConection.AddressCliente;
  private urlCreateRequi = ApiConection.ServiceUrl + ApiConection.CreateRequi;
  private urlGetRequisicionById = ApiConection.ServiceUrl + ApiConection.GetRequisicionById;
  private urlGetRequisicionByFolio = ApiConection.ServiceUrl + ApiConection.GetRequisicionByFolio;
  private urlGetRequisicionesAll = ApiConection.ServiceUrl + ApiConection.GetRequisicionesAll;
  private urlGetRequiReclutador = ApiConection.ServiceUrl + ApiConection.GetRequiReclutador;
  private urlUpdateRequisicion = ApiConection.ServiceUrl + ApiConection.UpdateRequisicion;
  private urlDeleteRequisicion = ApiConection.ServiceUrl + ApiConection.DeleteRequisicion;
  private urlCancelRequisicion = ApiConection.ServiceUrl + ApiConection.CancelRequisicion;
  private urlAsignarRequisicion = ApiConection.ServiceUrl + ApiConection.AsignarRequisicion;
  private urlGetDireccionRequisicion = ApiConection.ServiceUrl + ApiConection.GetDireccionRequisicion;
  private urlGetRutasCamionRequi = ApiConection.ServiceUrl + ApiConection.GetRutasCamionRequisicion;
  private urlAddRutaCamion = ApiConection.ServiceUrl + ApiConection.AddRutaCamion;
  private urlUpdateRutaCamion = ApiConection.ServiceUrl + ApiConection.UpdateRutaCamion;
  private urlDeleteRutaCamion = ApiConection.ServiceUrl + ApiConection.DeleteRutaCamion;
  private urlUpdateVacantes = ApiConection.ServiceUrl + ApiConection.UpdateVacantes;
  private urlGetHorariosReequisicion = ApiConection.ServiceUrl + ApiConection.GetHorariosRequi;
  private urlGetHorariosRequiConteo = ApiConection.ServiceUrl + ApiConection.GetHorariosRequiConteo;
  private URLGetRequisicionesEstatus = ApiConection.ServiceUrl + ApiConection.GetRequisicioneEstatus;
  private URLGetInformeRequisiciones = ApiConection.ServiceUrl + ApiConection.GetInformeRequisiciones;
  private URLGetRequiEstadisticos = ApiConection.ServiceUrl + ApiConection.getRequiEstadisticos;
  private URLGetUltimoEstatusRequi = ApiConection.ServiceUrl + ApiConection.GetUltimoEstatusRequi;
  private URLExecProcedurePause = ApiConection.ServiceUrl + ApiConection.execProcedurePause;
  private URLExecProcedureSinCambios = ApiConection.ServiceUrl + ApiConection.execProcedureSinCambios;
  private URLExecProcedureSinAsignar = ApiConection.ServiceUrl + ApiConection.execProcedureSinAsignar;
  private URLExecProcedureVencidas = ApiConection.ServiceUrl + ApiConection.execProcedureVencidas;
  private URLExecProcedurePendientesPuro = ApiConection.ServiceUrl + ApiConection.execProcedurePendientesPuro;
  private URLGetRequiTipoRecl = ApiConection.ServiceUrl + ApiConection.GetRequiTipoRecl;
  private URLSendEmailRequiPuro = ApiConection.ServiceUrl + ApiConection.SendEmailRequiPuro;
  private URLSendEmailRedesSociales = ApiConection.ServiceUrl + ApiConection.SendEmailRedesSociales;
  private URLSendEmailNuevaRequisicion = ApiConection.ServiceUrl + ApiConection.SendEmailNuevaRequi;
  private URLPublicarNuevaRequisicion = ApiConection.ServiceUrl + ApiConection.PublicarNuevaRequisicion;
  private URLAddDtosFactura = ApiConection.ServiceUrl + ApiConection.AddDatosFactura;
  private URLGetReporte70 = ApiConection.ServiceUrl + ApiConection.GetReporte70;
  private URLGetAsignados = ApiConection.ServiceUrl + ApiConection.GetAsignados;
  private UrlGetRequisicionesHistorial = ApiConection.ServiceUrl + ApiConection.getRequisicionesHistorial;
  private URLGetRequisPendientes = ApiConection.ServiceUrl + ApiConection.GetRequisPendientes;
  private URLGetRequisicionPDF = ApiConection.ServiceUrl + ApiConection.GetRequisicionPDF;

  constructor(private http: Http, private _httpClient: HttpClient) { }
  // Recupera todos los damfos que esten dados de alta y se encuentren activos
  getDamgo290(): Observable<any> {
    return this._httpClient.get(this.urlGetViewDamfos, { headers: this.httpOptions.headers });
  }
  // Recupera las direcciones del cliente que se seleccione para generar Requisicion
  getAddress(damfoId: string): Observable<any> {
    let params = new HttpParams().set('Id', damfoId)
    return this._httpClient.get(this.urlAddress, { params: params, headers: this.httpOptions.headers });
  }
  // Generea una nueva requisicion y posteriormente regresa el ID de la nueva requisicion.
  createNewRequi(data: any): Observable<any> {
    return this._httpClient.post(this.urlCreateRequi, JSON.stringify(data), this.httpOptions);
  }
  // Recupera la informacion completa de la requisicion que se requiera
  getNewRequi(requisicionId: string): Observable<any> {
    let params = new HttpParams().set('Id', requisicionId);
    return this._httpClient.get(this.urlGetRequisicionById, { params: params, headers: this.httpOptions.headers });
  }
  getRequiFolio(folio: any): Observable<any> {
    let params = new HttpParams().set('folio', folio);
    return this._httpClient.get(this.urlGetRequisicionByFolio, { params: params, headers: this.httpOptions.headers });
  }
  // Recupera la información completa del DAMFO-290 que se requiera.
  getDamfoById(damfoId: string) {
    let params = new HttpParams().set('id', damfoId);
    return this._httpClient.get<any>(this.urlGetDamfoById, { params: params, headers: this.httpOptions.headers });
  }
  // Recuperar las rutas de camiones de las direccionaes relacionadas con el damfo - cliente
  getDamfoRutasCamion(clienteId: string): Observable<any> {
    let params = new HttpParams().set('Id', clienteId);
    return this._httpClient.get(this.urlGetDamfoRutasCamion, { params: params, headers: this.httpOptions.headers });
  }

  // Recupera la información de las requisiciones que se han generado.
  getRequisiciones(user: string): Observable<any> {
    let params = new HttpParams().set('propietario', user)
    return this._httpClient.get(this.urlGetRequisicionesAll, { params: params, headers: this.httpOptions.headers });
  }

  GetRequisicionesHistorial(propietario): Observable<any> {
    let params = new HttpParams().set('propietario', propietario);
    return this._httpClient.get(this.UrlGetRequisicionesHistorial, { params: params, headers: this.httpOptions.headers });
  }


  // Recupera la información de las requisiciones que se han asignado al reclutador.
  getRequiReclutador(user: string): Observable<any> {
    let params = new HttpParams().set('IdUsuario', user);
    return this._httpClient.get(this.urlGetRequiReclutador, { params: params, headers: this.httpOptions.headers });
  }

  // Recuperar la direccion que se registro en la requisicion.
  getRequiDireccion(id: string): Observable<any> {
    let params = new HttpParams().set('id', id)
    return this._httpClient.get(this.urlGetDireccionRequisicion, { params: params, headers: this.httpOptions.headers });
  }

  GetRequisicionesEstatus(estatus, usuario): Observable<any> {
    let params = new HttpParams().set('estatus', estatus).set('ReclutadorId', usuario);
    return this._httpClient.get(this.URLGetRequisicionesEstatus, { params: params, headers: this.httpOptions.headers });
  }

  GetUltimoEstatusRequi(RequisicionId): Observable<any> {
    let params = new HttpParams().set('RequisicionId', RequisicionId);
    return this._httpClient.get(this.URLGetUltimoEstatusRequi, { params: params, headers: this.httpOptions.headers });
  }


  GetRequiEstadisticos(usuario): Observable<any> {
    let params = new HttpParams().set('IdUsuario', usuario);
    return this._httpClient.get(this.URLGetRequiEstadisticos, { params: params, headers: this.httpOptions.headers });
  }
  GetRequisPendientes(): Observable<any> {
    return this._httpClient.get(this.URLGetRequisPendientes, { headers: this.httpOptions.headers });
  }
  // ---------------------------------------------------------------------------------------------------------------
  // Crud para rutas de Camiones dentro de la requisición.
  getRequiRutasCamion(id: string): Observable<any> {
    let params = new HttpParams().set('Id', id);
    return this._httpClient.get(this.urlGetRutasCamionRequi, { params: params, headers: this.httpOptions.headers });
  }

  addRutaCamion(data: any): Observable<any> {
    return this._httpClient.post(this.urlAddRutaCamion, data, this.httpOptions);
  }

  updateRutaCamion(data: any): Observable<any> {
    return this._httpClient.post(this.urlUpdateRutaCamion, data, this.httpOptions);
  }

  deleteRutaCamion(data: any): Observable<any> {
    return this._httpClient.post(this.urlDeleteRutaCamion, data, this.httpOptions);
  }
  // ---------------------------------------------------------------------------------------------------------------
  getRequiHorarios(requisicionId: string) {
    let params = new HttpParams().set('id', requisicionId)
    return this._httpClient.get(this.urlGetHorariosReequisicion, { params: params, headers: this.httpOptions.headers });
  }

  getVacantesDamfo(damfoId: string): Observable<any> {
    let params = new HttpParams().set('Id', damfoId);
    return this._httpClient.get(this.urleGetVacantesDamgfo, { params: params, headers: this.httpOptions.headers });
  }
  logError(urleGetVacantesDamgfo: string, error: any): any {
    throw new Error("Method not implemented.");
  }
  log(filename: any, data: any): any {
    throw new Error("Method not implemented.");
  }

  updateRequisicion(requi: any): Observable<any> {
    return this._httpClient.post(this.urlUpdateRequisicion, JSON.stringify(requi), this.httpOptions);
  }

  updateVacanates(vacantes: any): Observable<any> {
    return this._httpClient.post(this.urlUpdateVacantes, JSON.stringify(vacantes), this.httpOptions);
  }

  deleteRequisicion(requi: any): Observable<any> {
    return this._httpClient.post(this.urlDeleteRequisicion, JSON.stringify(requi), this.httpOptions);
  }

  cancelRequisicion(requi: any): Observable<any> {
    return this._httpClient.post(this.urlCancelRequisicion, JSON.stringify(requi), this.httpOptions);
  }

  asignarRequisicion(asignar: any): Observable<any> {
    return this._httpClient.post(this.urlAsignarRequisicion, JSON.stringify(asignar), this.httpOptions);
  }

  GetHorariosRequiConteo(requisicionId: any): Observable<any> {
    let params = new HttpParams().set('requisicionId', requisicionId);
    return this._httpClient.get(this.urlGetHorariosRequiConteo, { params: params, headers: this.httpOptions.headers });
  }

  GetInformeRequisiciones(reclutadorId: any): Observable<any> {
    let params = new HttpParams().set('reclutadorId', reclutadorId);
    return this._httpClient.get(this.URLGetInformeRequisiciones, { params: params, headers: this.httpOptions.headers });
  }

  GetAsignados(requisicionId: any): Observable<any> {
    let params = new HttpParams().set('requisicionId', requisicionId);
    return this._httpClient.get(this.URLGetAsignados, { params: params, headers: this.httpOptions.headers });
  }

  GetRequiTipoRecl(propietarioId: any, tipo): Observable<any> {
    let params = new HttpParams().set('propietario', propietarioId).set('tipo', tipo);
    return this._httpClient.get(this.URLGetRequiTipoRecl, { params: params, headers: this.httpOptions.headers });
  }

  SendEmailRequiPuro(IdRequisicion: any): Observable<any> {
    let params = new HttpParams().set('IdRequisicion', IdRequisicion);
    return this._httpClient.get(this.URLSendEmailRequiPuro, { params: params });
  }

  SendEmailRedesSociales(data: any): Observable<any> {
    return this._httpClient.post(this.URLSendEmailRedesSociales, data, this.httpOptions);
  }

  SendEmailNuevaRequi(data: any): Observable<any> {
    return this._httpClient.post(this.URLSendEmailNuevaRequisicion, data, this.httpOptions);
  }

  PublicarNuevaRequisicion(data: any): Observable<any> {
    const params = new HttpParams().set('Id', data);
    return this._httpClient.get(this.URLPublicarNuevaRequisicion, { params: params, headers: this.httpOptions.headers });
  }

  AddDatosFactura(datos): Observable<any> {
    return this._httpClient.post(this.URLAddDtosFactura, datos, this.httpOptions);
  }

  ExecProcedurePause(): Observable<any> {
    return this._httpClient.get(this.URLExecProcedurePause);
  }

  ExecProcedureSinCambios(): Observable<any> {
    return this._httpClient.get(this.URLExecProcedureSinCambios);
  }

  ExecProcedurePendientesPuro(): Observable<any> {
    return this._httpClient.get(this.URLExecProcedurePendientesPuro);
  }

  ExecProcedureSinAsignar(): Observable<any> {
    return this._httpClient.get(this.URLExecProcedureSinAsignar);
  }
  ExecProcedureVencidas(): Observable<any> {
    return this._httpClient.get(this.URLExecProcedureVencidas);
  }



  GetReporte70(clave: string, ofc: string, tipo: string, fini: string, ffin: string, emp: string,
    sol: string, trcl: string, cor: string, stus: string, recl: string,usuario:string): Observable<any> {
    return this._httpClient.get(this.URLGetReporte70 + '?clave=' + clave + '&ofc=' + ofc + '&tipo=' + tipo + '&fini=' + fini
      + '&ffin=' + ffin + '&emp=' + emp + '&sol=' + sol + '&trcl=' + trcl + '&cor=' + cor + '&stus=' + stus 
      + '&recl=' + recl + '&usuario='+usuario)
      .catch(this.handleError);
  }
  // Muestra un error en consola y regresa el mismo al Frond-End en caso de que se genere el mismo.
  public handleError(error: any) {
    console.log('Error Internar Server', error);
    if (error instanceof Response) {
      return Observable.throw(error.json().error || 'Back-End server error');
    }
    return Observable.throw(error || 'Back-End server error');
  }

  getRequisicionPDF(id: string): Observable<any> {
    const params = new HttpParams().set('RequisicionId', id);
    return this._httpClient.get(this.URLGetRequisicionPDF, { params: params, headers: this.httpOptions.headers });
  }
}
