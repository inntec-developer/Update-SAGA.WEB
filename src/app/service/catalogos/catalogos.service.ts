import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiConection } from './../api-conection.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CatalogosService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('validation-token')
    })
  };

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
private UrlGetEstadoCivil = ApiConection.ServiceUrl + ApiConection.GetEstadoCivil;
  private UrlGetInstBancaria = ApiConection.ServiceUrl + ApiConection.GetBancos;
  private UrlGetMotContratacion = ApiConection.ServiceUrl + ApiConection.GetMotContratacion;
  private UrlGetGrupoSanguineo = ApiConection.ServiceUrl + ApiConection.GetGrupoSanguineo;
  private UrlGetEscolaridades = ApiConection.ServiceUrl + ApiConection.GetEscolaridades;
  private UrlGetFormaPago = ApiConection.ServiceUrl + ApiConection.GetFormaPago;
  /*Menu de catalogos */
  private UrlMenuCatalogos = ApiConection.ServiceUrl + ApiConection.getCatalogos;
  private UrlCatalogos = ApiConection.ServiceUrl + ApiConection.getCatalogosComplete;
  private UrlCatalogoCrud = ApiConection.ServiceUrl + ApiConection.postCatalogos;
  private UrlCatalogoFilter = ApiConection.ServiceUrl + ApiConection.FilterCatalogos;
  private UrlGetCatalgoForId = ApiConection.ServiceUrl + ApiConection.GetCatalogoForId;

  constructor(private _httpClient: HttpClient) { }

  getOficinaMunicipio(mun: string, es: string): Observable<any> {
    let params = new HttpParams().set('estado', es).set('municipio', mun);
    return this._httpClient.get(this.UrlGetMunicipioOfi, {params: params, headers: this.httpOptions.headers});
  }

  getOficinaColonia(col: string, mun: string): Observable<any> {
    let params = new HttpParams().set('municipio', mun).set('colonia', col);
    return this._httpClient.get(this.UrlGetColoniaOfi, {params: params, headers: this.httpOptions.headers});
  }

  getOficinaEstado(id: string): Observable<any> {
    let params = new HttpParams().set('id', id);
    return this._httpClient.get(this.UrlGetEstadoOfi, {params: params, headers: this.httpOptions.headers});
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
    return this._httpClient.get(this.UrlGetAgregarOfi, {params: params, headers: this.httpOptions.headers});
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
      return this._httpClient.get(this.UrlAlterOficina, {params: params, headers: this.httpOptions.headers});
    }

  EliminarOficina(id: string): Observable<any>{
    let params = new HttpParams().set('id', id);
    return this._httpClient.get(this.UrlDeleteOficina , {params: params, headers: this.httpOptions.headers})
  }

  getSucursales(fil: string): Observable<any>{
    let params = new HttpParams().set('filtro', fil);
    return this._httpClient.get(this.UrlGetSucursal , {params: params, headers: this.httpOptions.headers})
  }

  getPreguntasFrecuentes(): Observable<any>{
    return this._httpClient.get(this.UrlGetPreguntasFrecuentes, {headers: this.httpOptions.headers})
  }

  addPreguntasFrecuentes(pregunta:string,repuesta:string) : Observable<any>{
    let params = new HttpParams().set('pregunta', pregunta).set('repuesta',repuesta);
    return this._httpClient.get(this.UrlAddPreguntasFrecuentes, {params: params, headers: this.httpOptions.headers});
  }

  GuardarPreguntasFrecuentes(id:string,pregunta:string,repuesta:string,activo:string) : Observable<any>{
    let params = new HttpParams().set('pregunta', pregunta).set('repuesta',repuesta).set('activo',activo).set('id',id);
    return this._httpClient.get(this.UrlalterPreguntasFrecuentes, {params: params, headers: this.httpOptions.headers});
  }

  EliminarPreguntasFrecuentes(id:string) : Observable<any>{
    let params = new HttpParams().set('id', id);
    return this._httpClient.get(this.UrlDeletePreguntasFrecuentes, {params: params, headers: this.httpOptions.headers});
  }

  getDocumentosDamsa() : Observable<any>{
    return this._httpClient.get(this.urlGetDocumentosDamsa, {headers: this.httpOptions.headers})
  }

  getPrestacionesLey() : Observable<any>{
    return this._httpClient.get(this.urlGetPrestacionesLey, {headers: this.httpOptions.headers});
  }

  getPrioridades() : Observable<any>{
    return this._httpClient.get(this.UrlGetPrioridades, {headers: this.httpOptions.headers});
  }

  getEstatusRequi(tipoMov : any) : Observable<any>{
    let params = new HttpParams().set('tipoMov', tipoMov);
    return this._httpClient.get(this.UrlGetEstatusRequi, {params: params, headers: this.httpOptions.headers});
  }

  getMotivosLiberacion() : Observable<any>{
    return this._httpClient.get(this.UrlGetMotivosLiberacion, {headers: this.httpOptions.headers});
  }

  getActividadesReclutador() : Observable<any>{
    return this._httpClient.get(this.UrlActividadesReclutador, {headers: this.httpOptions.headers});
  }

  getTipoTelefono() : Observable<any>{
    return this._httpClient.get(this.UrlGetTipoTelefono, {headers: this.httpOptions.headers});
  }

  getTipoDireccion() : Observable<any>{
return this._httpClient.get(this.UrlGetTipoDireccion, {headers: this.httpOptions.headers});
  }

  /* Catalogos para Prospectos / Clientes */

  getGiroEmp(): Observable<any>{
    return this._httpClient.get(this.UrlGetGiroEmpresa, {headers : this.httpOptions.headers});
  }

  getActividadEmp(giroId: any): Observable<any>{
    let params= new HttpParams().set('GiroId', giroId);
    return this._httpClient.get(this.UrlGetActividadEmpresa, {params: params, headers: this.httpOptions.headers});
  }

  getTamanioEmp(): Observable<any>{
    return this._httpClient.get(this.UrlGetTamanioEmpresa, {headers: this.httpOptions.headers});
  }

  getTipoEmp(): Observable<any>{
    return this._httpClient.get(this.UrlGetTipoEmpresa, {headers: this.httpOptions.headers});
  }

  getTipoBase(): Observable<any>{
    return this._httpClient.get(this.UrlGetTipoBase, {headers: this.httpOptions.headers});
  }

  /* Catalogos de locaciones */
  getPais(): Observable<any> {
    return this._httpClient.get(this.UrlGetPais, {headers: this.httpOptions.headers});
  }

  getEstado(PaisId: any): Observable<any> {
    const params = new HttpParams().set('PaisId', PaisId);
    return this._httpClient.get(this.UrlGetEstado, {params: params, headers: this.httpOptions.headers});
  }

  getMunicipio(EstadoId: any): Observable<any>{
    let params= new HttpParams().set('EstadoId', EstadoId);
    return this._httpClient.get(this.UrlGetMunicipio, {params: params, headers: this.httpOptions.headers});
  }

  getColonias(MunicipioId: any): Observable<any>{
    const params = new HttpParams().set('MunicipioId', MunicipioId);
    return this._httpClient.get(this.UrlGetColonia, {params: params, headers: this.httpOptions.headers});
  }

  getForCP(cp: any): Observable<any>{
    const params = new HttpParams().set('CP', cp);
    return this._httpClient.get(this.UrlGetForCP, {params: params, headers: this.httpOptions.headers});
  }

  getCatalogos(): Observable<any>{
    return this._httpClient.get(this.UrlMenuCatalogos, {headers: this.httpOptions.headers});
  }

  getCatalogo(IdCatalogo: any): Observable<any> {
    const params = new HttpParams().set('IdCatalogo', IdCatalogo);
    return this._httpClient.get(this.UrlCatalogos, {params: params, headers: this.httpOptions.headers});
  }

  getCatalogoFilter(Params: any): Observable<any> {
    return this._httpClient.post<any>(this.UrlCatalogoFilter, Params, this.httpOptions);
  }

  GetCatalogoBancos(): Observable<any> {
    return this._httpClient.get(this.UrlGetInstBancaria, {headers: this.httpOptions.headers});
  }
  GetMotContratacion(): Observable<any> {
    return this._httpClient.get(this.UrlGetMotContratacion, {headers: this.httpOptions.headers});
  }
  GetEstadoCivil(): Observable<any> {
    return this._httpClient.get(this.UrlGetEstadoCivil, {headers: this.httpOptions.headers});
  }
  GetGrupoSanguineo(): Observable<any> {
    return this._httpClient.get(this.UrlGetGrupoSanguineo, {headers: this.httpOptions.headers});
  }
  GetEscolaridades(): Observable<any> {
    return this._httpClient.get(this.UrlGetEscolaridades, {headers: this.httpOptions.headers});
  }

  GetFormaPago(): Observable<any> {
    return this._httpClient.get(this.UrlGetFormaPago, {headers: this.httpOptions.headers});
  }
  GuardaCatalogo(Catalogo: any): Observable<any> {
    return this._httpClient.post<any>(this.UrlCatalogoCrud , Catalogo, this.httpOptions);
  }

  EditCatalogo(): Observable<any> {
    return;
  }

  getCatalogoForId(IdCatalogo: any): Observable<any> {
    const params = new HttpParams().set('IdCatalogo', IdCatalogo);
    return this._httpClient.get<any>(this.UrlGetCatalgoForId, {params: params, headers: this.httpOptions.headers});
  }
}
