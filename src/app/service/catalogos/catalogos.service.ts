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
import { debug } from 'util';
import { HttpParamsOptions } from '@angular/common/http/src/params';

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

  /* Catalogo de preguntas frecuentes */
  private UrlGetPreguntasFrecuentes = ApiConection.ServiceUrl + ApiConection.GetPreguntasFrecuentes;

  private UrlAddPreguntasFrecuentes = ApiConection.ServiceUrl + ApiConection.AddPreguntasFrecuentes;
  private UrlalterPreguntasFrecuentes = ApiConection.ServiceUrl + ApiConection.alterPreguntasFrecuentes;
  private UrlDeletePreguntasFrecuentes = ApiConection.ServiceUrl + ApiConection.deletePreguntasFrecuentes;

  /* Catalogo de Oficinas */
  private UrlGetSucursal = ApiConection.ServiceUrl + ApiConection.GetSucursal;
  private UrlGetAgregarOfi = ApiConection.ServiceUrl + ApiConection.AddOficina;
  private UrlGetEstadoOfi = ApiConection.ServiceUrl + ApiConection.GetEstadoOfi;
  private UrlGetMunicipioOfi = ApiConection.ServiceUrl + ApiConection.GetMunicipioOfi;
  private UrlGetColoniaOfi = ApiConection.ServiceUrl + ApiConection.GetColoniaOfi;
  private UrlDeleteOficina = ApiConection.ServiceUrl + ApiConection.deleteOficina;
  private UrlAlterOficina = ApiConection.ServiceUrl + ApiConection.alterOficina;

  /*Menu de catalogos */
  private UrlMenuCatalogos = ApiConection.ServiceUrl + ApiConection.getCatalogos;
  private UrlCatalogos = ApiConection.ServiceUrl + ApiConection.getCatalogosComplete;
  private UrlCatalogoCrud = ApiConection.ServiceUrl + ApiConection.postCatalogos;
  private UrlCatalogoFilter = ApiConection.ServiceUrl + ApiConection.FilterCatalogos;

  constructor(private _httpClient: HttpClient, private http: Http) { }

  getOficinaMunicipio(mun: string, es: string): Observable<any> {
    let params = new HttpParams().set('estado', es).set('municipio', mun);
    return this._httpClient.get(this.UrlGetMunicipioOfi, {params: params});
  }

  getOficinaColonia(col: string, mun: string): Observable<any> {
    let params = new HttpParams().set('municipio', mun).set('colonia', col);
    return this._httpClient.get(this.UrlGetColoniaOfi, {params: params});
  }

  getOficinaEstado(id: string): Observable<any> {
    let params = new HttpParams().set('id', id);
    return this._httpClient.get(this.UrlGetEstadoOfi, {params: params});
  }

  GuardarOficina(nom:string,est:string,mun:string,col:string,cp:string,calle:string,num:string,tel:string
  ,email:string,lat:string,lon:string,tipo:string) : Observable<any>{
    let params = new HttpParams().set
    ('nombre', nom).set
    ('estado',est).set
    ('municipio',mun).set
    ('colonia',col).set
    ('cp',cp).set
    ('calle',calle).set
    ('numero',num).set
    ('telefono',tel).set
    ('email',email).set
    ('latitud',lat).set
    ('longitud',lon).set
    ('tipoOfi',tipo);
    return this._httpClient.get(this.UrlGetAgregarOfi, {params: params});
  }

  EditarOficina(nom:string,est:string,mun:string,col:string,cp:string,calle:string,num:string,tel:string
    ,email:string,lat:string,lon:string,tipo:string,activo:string,id:string) : Observable<any>{
      let params = new HttpParams().set
      ('nombre', nom).set
      ('estado',est).set
      ('municipio',mun).set
      ('colonia',col).set
      ('cp',cp).set
      ('calle',calle).set
      ('numero',num).set
      ('telefono',tel).set
      ('email',email).set
      ('latitud',lat).set
      ('longitud',lon).set
      ('tipoOfi',tipo).set
      ('activo',activo).set
      ('id',id);
      return this._httpClient.get(this.UrlAlterOficina, {params: params});
    }

  EliminarOficina(id: string): Observable<any>{
    let params = new HttpParams().set('id', id);
    return this._httpClient.get(this.UrlDeleteOficina , {params: params})
  }

  getSucursales(fil: string): Observable<any>{
    let params = new HttpParams().set('filtro', fil);
    return this._httpClient.get(this.UrlGetSucursal , {params: params})
  }

  getPreguntasFrecuentes(): Observable<any>{
    return this._httpClient.get(this.UrlGetPreguntasFrecuentes)
  }

  addPreguntasFrecuentes(pregunta:string,repuesta:string) : Observable<any>{
    let params = new HttpParams().set('pregunta', pregunta).set('repuesta',repuesta);
    return this._httpClient.get(this.UrlAddPreguntasFrecuentes, {params: params});
  }

  GuardarPreguntasFrecuentes(id:string,pregunta:string,repuesta:string,activo:string) : Observable<any>{
    let params = new HttpParams().set('pregunta', pregunta).set('repuesta',repuesta).set('activo',activo).set('id',id);
    return this._httpClient.get(this.UrlalterPreguntasFrecuentes, {params: params});
  }

  EliminarPreguntasFrecuentes(id:string) : Observable<any>{
    let params = new HttpParams().set('id', id);
    return this._httpClient.get(this.UrlDeletePreguntasFrecuentes, {params: params});
  }

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

  getActividadEmp(giroId: any): Observable<any>{
    let params= new HttpParams().set('GiroId', giroId);
    return this._httpClient.get(this.UrlGetActividadEmpresa, {params: params});
  }

  getTamanioEmp(): Observable<any>{
    return this._httpClient.get(this.UrlGetTamanioEmpresa);
  }

  getTipoEmp(): Observable<any>{
    return this._httpClient.get(this.UrlGetTipoEmpresa);
  }

  getTipoBase(): Observable<any>{
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

  getCatalogos(): Observable<any>{
    return this._httpClient.get(this.UrlMenuCatalogos);
  }

  getCatalogo(IdCatalogo: any): Observable<any> {
    let params= new HttpParams().set('IdCatalogo', IdCatalogo);
    return this._httpClient.get(this.UrlCatalogos, {params: params});
  }

  getCatalogoFilter(Params: any): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
    });

    let options = {
      headers: httpHeaders
    };
    return this._httpClient.post<any>(this.UrlCatalogoFilter, Params, options);
  }

  GuardaCatalogo(Catalogo: any): Observable<any> {
    debugger;
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
    });

    let options = {
      headers: httpHeaders
    };
    return this._httpClient.post<any>(this.UrlCatalogoCrud , Catalogo, options);
  }

  EditCatalogo(): Observable<any> {
    return;
  }
}
