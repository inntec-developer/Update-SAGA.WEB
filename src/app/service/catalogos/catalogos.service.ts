import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

import { Headers, Http, HttpModule, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ApiConection } from './../api-conection.service';
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
export class CatalogosService {

  private urlGetDocumentosDamsa = ApiConection.ServiceUrl + ApiConection.GetDocumentosDamsa;
  private urlGetPrestacionesLey = ApiConection.ServiceUrl + ApiConection.GetPrestacionesLey;
  private UrlGetPrioridades = ApiConection.ServiceUrl + ApiConection.GetPrioridades;
  private UrlGetEstatusRequi = ApiConection.ServiceUrl + ApiConection.GetEstatusRequi;
  private UrlGetMotivosLiberacion = ApiConection.ServiceUrl + ApiConection.GetMotivosLiberacion;
  private UrlActividadesReclutador = ApiConection.ServiceUrl + ApiConection.GetTiposActividadesRecl;

  private UrlGetTipoTelefono = ApiConection.ServiceUrl + ApiConection.GetTipoTelefono;
  private UrlGetTipoDireccion = ApiConection.ServiceUrl + ApiConection.GetTipoDireccion;

  /* Catalogos para Prospectos / Clientes */
  private UrlGetActividadEmpresa = ApiConection.ServiceUrl + ApiConection.GetActividadesEmp;
  private UrlGetGiroEmpresa = ApiConection.ServiceUrl + ApiConection.GetGiroEmp;
  private UrlGetTamanioEmpresa = ApiConection.ServiceUrl + ApiConection.GetTamanioEmp;
  private UrlGetTipoEmpresa = ApiConection.ServiceUrl + ApiConection.GetTipoEmp;
  private UrlGetTipoBase = ApiConection.ServiceUrl + ApiConection.GetTipoBase;

  /* Catalogo de locaciones */
  private UrlGetPais = ApiConection.ServiceUrl + ApiConection.GetPais;
  private UrlGetEstado = ApiConection.ServiceUrl + ApiConection.GetEstado;
  private UrlGetMunicipio = ApiConection.ServiceUrl + ApiConection.GetMunicipio;
  private UrlGetColonia = ApiConection.ServiceUrl + ApiConection.GetColonia;
  private UrlGetForCP = ApiConection.ServiceUrl + ApiConection.GetForCP;

   
  constructor(private _httpClient: HttpClient) { }

  getDocumentosDamsa() : Observable<any>{
    return this._httpClient.get(this.urlGetDocumentosDamsa)
  }

  getPrestacionesLey() : Observable<any>{
    return this._httpClient.get(this.urlGetPrestacionesLey);
  }

  getPrioridades() : Observable<any>{
    return this._httpClient.get(this.UrlGetPrioridades);
  }

  getEstatusRequi(tipoMov : any) : Observable<any>{
    let params = new HttpParams().set('tipoMov', tipoMov);
    return this._httpClient.get(this.UrlGetEstatusRequi, {params: params});
  }

  getMotivosLiberacion() : Observable<any>{
    return this._httpClient.get(this.UrlGetMotivosLiberacion);
  }

  getActividadesReclutador() : Observable<any>{
    return this._httpClient.get(this.UrlActividadesReclutador);
  }

  getTipoTelefono() : Observable<any>{
    return this._httpClient.get(this.UrlGetTipoTelefono);
  }

  getTipoDireccion() : Observable<any>{
return this._httpClient.get(this.UrlGetTipoDireccion);
  }

  /* Catalogos para Prospectos / Clientes */

  getGiroEmp(): Observable<any>{
    return this._httpClient.get(this.UrlGetGiroEmpresa);
  }

  getActividadEmp(giroId: any) : Observable<any>{
    let params= new HttpParams().set('GiroId', giroId);
    return this._httpClient.get(this.UrlGetActividadEmpresa, {params: params});
  }

  getTamanioEmp() : Observable<any>{
    return this._httpClient.get(this.UrlGetTamanioEmpresa);
  }

  getTipoEmp() : Observable<any>{
    return this._httpClient.get(this.UrlGetTipoEmpresa);
  }

  getTipoBase() : Observable<any>{
    return this._httpClient.get(this.UrlGetTipoBase);
  }

  /* Catalogos de locasiones */
  getPais(): Observable<any>{
    return this._httpClient.get(this.UrlGetPais);
  }

  getEstado(PaisId: any): Observable<any>{
    let params= new HttpParams().set('PaisId', PaisId);
    return this._httpClient.get(this.UrlGetEstado, {params: params});
  }
  getMunicipio(EstadoId: any): Observable<any>{
    let params= new HttpParams().set('EstadoId', EstadoId);
    return this._httpClient.get(this.UrlGetMunicipio, {params: params});
  }

  getColonias(MunicipioId: any): Observable<any>{
    let params= new HttpParams().set('MunicipioId', MunicipioId);
    return this._httpClient.get(this.UrlGetColonia, {params: params});
  }
  getForCP(cp: any): Observable<any>{
    let params = new HttpParams().set('CP', cp);
    return this._httpClient.get(this.UrlGetForCP, {params: params});
  }



  

}
