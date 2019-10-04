import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

import { Headers, Http, RequestOptions, Response, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ApiConection } from './../api-conection.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { saveAs } from 'file-saver';

@Injectable()
export class AdminServiceService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('validation-token')
    })
  };
  // Url de servicios.
  private Url = ApiConection.ServiceUrl+ApiConection.getDtosPersonal;
  private UrlGetEntidadesUG = ApiConection.ServiceUrl+ApiConection.getEntidadesUG;
  private UrlGetEntidades = ApiConection.ServiceUrl+ApiConection.getEntidades;
  private UrlTiposUsuarios = ApiConection.ServiceUrl+ApiConection.getTiposUsuarios;
  private UrlAddRol = ApiConection.ServiceUrl+ApiConection.addRol;
  private UrlAddGrupo = ApiConection.ServiceUrl+ApiConection.addGrupo;
  private UrlAddUserGroup = ApiConection.ServiceUrl+ApiConection.addUserGroup;
  private UrlAddGroupRol = ApiConection.ServiceUrl+ApiConection.addGroupRol;
  private UrlGetDepas = ApiConection.ServiceUrl+ApiConection.getDepartamentos;
  private UrlAddUser = ApiConection.ServiceUrl+ApiConection.addUser;
  private UrlLogIn = ApiConection.ServiceUrl+ApiConection.login;
  private UrlUdActivo = ApiConection.ServiceUrl+ApiConection.udActivoUser;
  private UrlGetByDepa = ApiConection.ServiceUrl+ApiConection.getUsuariosByDepa;
  private UrlGetGrupos = ApiConection.ServiceUrl+ApiConection.GetGrupos;
  private UrlGetGruposRoles = ApiConection.ServiceUrl+ApiConection.getGruposRoles;
  private UrlGetRoles = ApiConection.ServiceUrl+ApiConection.GetRoles;
  private UrlUpdateUsuario = ApiConection.ServiceUrl+ApiConection.updateUsuario;
  private UrlUpdateGrupo = ApiConection.ServiceUrl+ApiConection.updateGrupo;
  private UrlUpdateActivo = ApiConection.ServiceUrl+ApiConection.updateActivo;
  private UrlUpdateRoles = ApiConection.ServiceUrl+ApiConection.updateRoles;
  private UrlDeleteGrupo = ApiConection.ServiceUrl+ApiConection.deleteGrupo;
  private UrlDeleteRoles = ApiConection.ServiceUrl+ApiConection.deleteRoles;
  private UrlDeleteUsuario = ApiConection.ServiceUrl+ApiConection.deleteUsuario;
  private UrlGetTreeRoles = ApiConection.ServiceUrl+ApiConection.getTreeRoles;
  private UrlGetEstructuraRoles = ApiConection.ServiceUrl+ApiConection.getEstructuraRoles;
  private UrlGetPrivilegios = ApiConection.ServiceUrl+ApiConection.getPrivilegios;
  private UrlUpdatePrivilegios = ApiConection.ServiceUrl+ApiConection.modificarPrivilegios;
  private UrlGetUsuarioByGrupo = ApiConection.ServiceUrl+ApiConection.getUsuariosByGrupo;
  private UrlDeleteUserGroup = ApiConection.ServiceUrl+ApiConection.deleteUserGroup;
  private UrlDeleteUserRol = ApiConection.ServiceUrl+ApiConection.deleteUserRol;
  private UrlGetStruct = ApiConection.ServiceUrl+ApiConection.getStruct;
  private UrlUploadImage = ApiConection.ServiceUrl+ApiConection.uploadImage;
  private UrlValidarEmail = ApiConection.ServiceUrl+ApiConection.validarEmail;
  private UrlGetFiles = ApiConection.ServiceUrl+ApiConection.getFiles;
  private UrlGetImage = ApiConection.ServiceUrl+ApiConection.getImage;
  private UrlSendEmailRegister = ApiConection.ServiceUrl+ApiConection.sendEmailRegister;
  private UrlDownloadFiles = ApiConection.ServiceUrl+ApiConection.downloadFiles;
  private UrlDeleteFiles = ApiConection.ServiceUrl+ApiConection.deleteFiles;
  private UrlViewFile = ApiConection.ServiceUrl + ApiConection.viewFile;
  private UrlUploadFile = ApiConection.ServiceUrl + ApiConection.uploadFile;
  private UrlGetLideres = ApiConection.ServiceUrl + ApiConection.getLideres;
  private UrlGetOficinas = ApiConection.ServiceUrl + ApiConection.getOficinas;
  private UrlGetByUsuario = ApiConection.ServiceUrl + ApiConection.GetByUsuario;
  private UrlSendEmail = ApiConection.ServiceUrl + ApiConection.EnviaCorreo;
  private UrlUpdatePassword = ApiConection.ServiceUrl + ApiConection.updatePassword;
  private UrlGetBGArte = ApiConection.ServiceUrl + ApiConection.GetBGArte;
  private UrlGuardarArte = ApiConection.ServiceUrl + ApiConection.GuardarArte;
  private UrlUploadBG = ApiConection.ServiceUrl + ApiConection.UploadBG;
  private UrlUploadAnexos = ApiConection.ServiceUrl + ApiConection.UploadAnexos;
  constructor(private _httpClient: HttpClient ) {

  }

  UploadImg( file: File, name: any): Observable<any>
  {
    let formData = new FormData();
    formData.append('image', file, name );
    return this._httpClient.post(this.UrlUploadImage, formData );
  }

  GetFiles(candidatoId, ruta): Observable<any> {
     const params = new HttpParams().set('entidadId', candidatoId).set('ruta', ruta);

     return this._httpClient.get(this.UrlGetFiles, {params: params});
  }

  GetBGArte(): Observable<any>
  {
    return this._httpClient.get(this.UrlGetBGArte);
  }

  GuardarArte(Arte): Observable<any>
  {
    return this._httpClient.post(this.UrlGuardarArte, Arte, this.httpOptions);
  }

  GetBG(nombre): Observable<any>
  {
     let params = new HttpParams().set('ruta', nombre);
     return this._httpClient.get(this.UrlGetImage, {params: params});
  }

  GetPdf(ruta): Observable<any>
  {
    let params = new HttpParams().set('ruta', ruta);
    return this._httpClient.get(this.UrlViewFile, {params: params, responseType: 'blob'});
  }

  DownloadFiles(ruta) : Observable<any>
  {
    let params = new HttpParams().set('file', ruta);
    return this._httpClient.get(this.UrlDownloadFiles, {params: params, responseType: 'blob'});
  }
  DeleteFiles(ruta) : Observable<any>
  {
    let params = new HttpParams().set('file', ruta);
    return this._httpClient.get(this.UrlDeleteFiles, {params: params});
  }
  UploadFile( file: File, candidatoId ) : Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name + '_' + candidatoId );
    return this._httpClient.post(this.UrlUploadFile, formData );
  }
  UploadAnexos( file: File, damfoId ): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name + '_' + damfoId );
    return this._httpClient.post(this.UrlUploadAnexos, formData );
  }
  UploadBG( file: File ): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name );
    return this._httpClient.post(this.UrlUploadBG, formData );
  }
  downloadImage(ruta): Observable<any>
  {
    let httpHeaders = new HttpHeaders({
     'Access-Control-Allow-Origin': 'https://websb.damsa.com.mx',
     'Content-Type': 'image/*.*'
    })

    let params = new HttpParams().set('ruta', ruta);
     return this._httpClient.get(ApiConection.ServiceUrlFileManager + '/img/ArteRequi/Arte/' + ruta, {headers: httpHeaders, responseType: "blob"});
  }

  downloadPDF(url):  Observable<any> {
    return this._httpClient.get(ApiConection.ServiceUrlFileManager + 'pdf/' + url, {responseType: "blob"});
  }

  GetImage(ruta): string {
    return ApiConection.ServiceUrlFileManager + 'Files/users/' + ruta;
  }

  getPersonas(user: any): Observable<any>
  {
      let params = new HttpParams().set('user', user);
     return this._httpClient.get(this.Url, {params: params, headers: this.httpOptions.headers});
  }

  SendEmailRegister(data: any): Observable<any>{
    return this._httpClient.post(this.UrlSendEmailRegister, JSON.stringify(data), this.httpOptions);
  }

  GetEntidades(): Observable<any>
  {
     return this._httpClient.get(this.UrlGetEntidades, {headers:  this.httpOptions.headers});
  }

  GetEntidadesUG(id): Observable<any>
  {
    let params =  new HttpParams().set('id', id);
     return this._httpClient.get(this.UrlGetEntidadesUG, {params: params, headers: this.httpOptions.headers});
  }

  getDepas(): Observable<any>
  {
     return this._httpClient.get(this.UrlGetDepas);
  }

  getTipos(): Observable<any>
  {
     return this._httpClient.get(this.UrlTiposUsuarios, {headers: this.httpOptions.headers});
  }

  getGrupos(): Observable<any>
  {
     return this._httpClient.get(this.UrlGetGrupos, {headers: this.httpOptions.headers});
  }

  UpdateActivo(cell): Observable<any> {
    return this._httpClient.post(this.UrlUpdateActivo, cell, this.httpOptions);
  }

  getGruposRoles(): Observable<any>
  {
     return this._httpClient.get(this.UrlGetGruposRoles, {headers: this.httpOptions.headers});
  }

  getRoles(): Observable<any>
  {
     return this._httpClient.get(this.UrlGetRoles, {headers: this.httpOptions.headers});
  }

  GetSession(mail :any, pass: any): Observable<any>{
    let params = new HttpParams().set('p', pass).set('e', mail);
    return this._httpClient.get(this.UrlLogIn, {params: params});
  }

  GetUsuarioByGrupo(GrupoId: string): Observable<any>{
    let params = new HttpParams().set('id', GrupoId)
    return this._httpClient.get(this.UrlGetUsuarioByGrupo, {params: params, headers: this.httpOptions.headers});
  }

  GetTreeRoles(): Observable<any>
  {
     return this._httpClient.get(this.UrlGetTreeRoles, {headers: this.httpOptions.headers});
  }

  GetStruct(): Observable<any>
  {
     return this._httpClient.get(this.UrlGetStruct);
  }

  GetEstructuraRoles( rol ): Observable<any>
  {
    let params = new HttpParams().set('rol', rol);
     return this._httpClient.get(this.UrlGetEstructuraRoles, {params: params, headers: this.httpOptions.headers});
  }

  GetPrivilegios( id: any): Observable<any>
  {
    let params = new HttpParams().set('idUser', id);
     return this._httpClient.get(this.UrlGetPrivilegios, {params: params, headers: this.httpOptions.headers});
  }

  GetUsuariosByDepa(id :any): Observable<any>{
    let params = new HttpParams().set('id', id);
    return this._httpClient.get(this.UrlGetByDepa, {params: params, headers: this.httpOptions.headers});
  }

  addGrupos(data: any): Observable<any>{
    return this._httpClient.post(this.UrlAddGrupo, JSON.stringify(data), this.httpOptions);
  }

  addUserGroup(data: any): Observable<any>{
    return this._httpClient.post(this.UrlAddUserGroup, JSON.stringify(data), this.httpOptions);
  }

  AddGroupRol(data: any): Observable<any>{
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this._httpClient.post(this.UrlAddGroupRol, JSON.stringify(data), this.httpOptions);
  }

  AddRoles(data: any): Observable<any>{
    return this._httpClient.post(this.UrlAddRol, JSON.stringify(data), this.httpOptions)
  }

  AddUsers(data: any): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this._httpClient.post(this.UrlAddUser, JSON.stringify(data), httpOptions);
  }

  UDActivoUsers(id :any, v: any): Observable<any>{
    let params = new HttpParams().set('id', id).set('v', v)
    return this._httpClient.get(this.UrlUdActivo, {params: params, headers: this.httpOptions.headers});
  }

  UpdateUsuario(data: any) : Observable<any>
  {
    return this._httpClient.post(this.UrlUpdateUsuario, JSON.stringify(data), this.httpOptions )

  }

  UpdateGrupo(data: any) : Observable<any>
  {
    return this._httpClient.post(this.UrlUpdateGrupo, data, this.httpOptions);

  }
  UpdateRoles(data: any) : Observable<any>
  {
    return this._httpClient.post(this.UrlUpdateRoles, JSON.stringify(data), this.httpOptions);
  }

  UpdatePrivilegios(data: any) : Observable<any>
  {
    return this._httpClient.post(this.UrlUpdatePrivilegios, data, this.httpOptions);
  }

  DeleteGrupo(data: any) : Observable<any>
  {
    return this._httpClient.post(this.UrlDeleteGrupo, JSON.stringify(data), this.httpOptions);
  }
  DeleteRoles(data: any) : Observable<any>
  {
    let params =  new HttpParams().set('id', data);
    return this._httpClient.get(this.UrlDeleteRoles, {params: params, headers: this.httpOptions.headers});
  }
  DeleteUsuario(data: any) : Observable<any>
  {
    let params =  new HttpParams().set('entidadId', data);
    return this._httpClient.get(this.UrlDeleteUsuario, {params: params, headers: this.httpOptions.headers});
  }
  DeleteUserGroup(data: any) : Observable<any>
  {
    return this._httpClient.post(this.UrlDeleteUserGroup, JSON.stringify(data), this.httpOptions);
  }
  DeleteUserRol(data: any) : Observable<any>
  {
    return this._httpClient.post(this.UrlDeleteUserRol, JSON.stringify(data), this.httpOptions)
  }

  GetByUsuario(depto: string): Observable<any>{
    let params = new HttpParams().set('depto', depto);
    return this._httpClient.get(this.UrlGetByUsuario, {params: params, headers: this.httpOptions.headers});
  }
  GetLideres() : Observable<any>
  {
    return this._httpClient.get(this.UrlGetLideres);
  }

  GetOficinas(): Observable<any>{
    return this._httpClient.get(this.UrlGetOficinas);
  }

  UpdatePassword(data: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this._httpClient.post(this.UrlUpdatePassword, JSON.stringify(data), httpOptions);
  }
  EnviaCorreo(correo: string, pass: string): Observable<any> {
    let params = new HttpParams().set('correo', correo).set('pass', pass);
    return this._httpClient.get(this.UrlSendEmail, {params: params});
  }
}
