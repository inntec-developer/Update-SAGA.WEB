import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { ApiConection } from './../api-conection.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminServiceService {

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
  private UrlGetSession = ApiConection.ServiceUrl+ApiConection.getSession;
  private UrlUdActivo = ApiConection.ServiceUrl+ApiConection.udActivoUser;
  private UrlGetByDepa = ApiConection.ServiceUrl+ApiConection.getUsuariosByDepa;
  private UrlGetGrupos = ApiConection.ServiceUrl+ApiConection.GetGrupos;
  private UrlGetGruposRoles = ApiConection.ServiceUrl+ApiConection.getGruposRoles
  private UrlGetRoles = ApiConection.ServiceUrl+ApiConection.GetRoles;
  private UrlUpdateUsuario = ApiConection.ServiceUrl+ApiConection.updateUsuario;
  private UrlUpdateGrupo = ApiConection.ServiceUrl+ApiConection.updateGrupo;
  private UrlUpdateRoles = ApiConection.ServiceUrl+ApiConection.updateRoles;
  private UrlDeleteGrupo = ApiConection.ServiceUrl+ApiConection.deleteGrupo;
  private UrlDeleteRoles = ApiConection.ServiceUrl+ApiConection.deleteRoles;
  private UrlGetTreeRoles = ApiConection.ServiceUrl+ApiConection.getTreeRoles;
  private UrlGetEstructuraRoles = ApiConection.ServiceUrl+ApiConection.getEstructuraRoles;
  private UrlGetPrivilegios = ApiConection.ServiceUrl+ApiConection.getPrivilegios;
  private UrlUpdatePrivilegios = ApiConection.ServiceUrl+ApiConection.modificarPrivilegios;
  private UrlGetUsuarioByGrupo = ApiConection.ServiceUrl+ApiConection.getUsuariosByGrupo;
  private UrlDeleteUserGroup = ApiConection.ServiceUrl+ApiConection.deleteUserGroup;
  private UrlDeleteUserRol = ApiConection.ServiceUrl+ApiConection.deleteUserRol;
  private UrlGetStruct = ApiConection.ServiceUrl+ApiConection.getStruct;
  private UrlUploadImage = ApiConection.ServiceUrl+ApiConection.uploadImage;
  private UrlAddSeccion = ApiConection.ServiceUrl+ApiConection.addSeccion;
  private UrlValidarEmail = ApiConection.ServiceUrl+ApiConection.validarEmail;
  private UrlGetFiles = ApiConection.ServiceUrl+ApiConection.getFiles;

  // Error.
  private handleError(error: any) {
         console.log('sever error:', error);
         if (error instanceof Response) {
             return Observable.throw(error.json().error || 'backend server error');
         }
         return Observable.throw(error || 'backend server error');
     }


  constructor(private http: Http ) {

  }

  UploadImg( file: File, name: any) : Observable<any>
  {
    let formData = new FormData();
    formData.append('image', file, name );
    let headers = new Headers({'Content-Type': 'image/.*'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.UrlUploadImage, formData ).map(result => result.json());
  }

  GetFiles(): Observable<any>
  {
     return this.http.get(this.UrlGetFiles)
         .map(result => result.json())
         .catch(this.handleError);
  }
 
  getPersonas(): Observable<any>
  {
     return this.http.get(this.Url)
         .map(result => result.json())
         .catch(this.handleError);
  }

  GetEntidades(): Observable<any>
  {
     return this.http.get(this.UrlGetEntidades)
         .map(result => result.json())
         .catch(this.handleError);
  }

  GetEntidadesUG(id): Observable<any>
  {
     return this.http.get(this.UrlGetEntidadesUG + '?id=' + id)
         .map(result => result.json())
         .catch(this.handleError);
  }
  getDepas(): Observable<any>
  {
     return this.http.get(this.UrlGetDepas)
         .map(result => result.json())
         .catch(this.handleError);
  }

  getTipos(): Observable<any>
  {
     return this.http.get(this.UrlTiposUsuarios)
         .map(result => result.json())
         .catch(this.handleError);
  }

  getGrupos(): Observable<any>
  {
     return this.http.get(this.UrlGetGrupos)
         .map(result => result.json())
         .catch(this.handleError);
  }

  getGruposRoles(): Observable<any>
  {
     return this.http.get(this.UrlGetGruposRoles)
         .map(result => result.json())
         .catch(this.handleError);
  }

  getRoles(): Observable<any>
  {
     return this.http.get(this.UrlGetRoles)
         .map(result => result.json())
         .catch(this.handleError);
  }

  GetSession(mail :any, pass: any): Observable<any>{
    return this.http.get(this.UrlGetSession + '?p='+ pass + '&e=' + mail)
            .map(result => result.json())
            .catch(this.handleError);
  }

  GetUsuarioByGrupo(GrupoId: string): Observable<any>{
    return this.http.get(this.UrlGetUsuarioByGrupo + '?id='+ GrupoId)
            .map(result => result.json())
            .catch(this.handleError);
  }
  
  GetTreeRoles(): Observable<any>
  {
     return this.http.get(this.UrlGetTreeRoles)
         .map(result => result.json())
         .catch(this.handleError);
  }

  GetStruct(): Observable<any>
  {
     return this.http.get(this.UrlGetStruct)
         .map(result => result.json())
         .catch(this.handleError);
  }

  GetEstructuraRoles( rol ): Observable<any>
  {
     return this.http.get(this.UrlGetEstructuraRoles + '?rol=' + rol)
         .map(result => result.json())
         .catch(this.handleError);
  }

  GetPrivilegios( id: any): Observable<any>
  {
     return this.http.get(this.UrlGetPrivilegios + '?idUser='+ id)
         .map(result => result.json())
         .catch(this.handleError);
  }

  GetUsuariosByDepa(id :any): Observable<any>{
    return this.http.get(this.UrlGetByDepa + '?id='+ id)
            .map(result => result.json())
            .catch(this.handleError);
  }

  addGrupos(data: any): Observable<any>{
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.UrlAddGrupo, JSON.stringify(data), options)
            .map(result => result.json())
            .catch(this.handleError);
  }

  AddSeccion(data: any): Observable<any>{
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.UrlAddSeccion, JSON.stringify(data), options)
            .map(result => result.json())
            .catch(this.handleError);
  }

  addUserGroup(data: any): Observable<any>{
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.UrlAddUserGroup, JSON.stringify(data), options)
            .map(result => result.json())
            .catch(this.handleError);
  }
  
  AddGroupRol(data: any): Observable<any>{
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.UrlAddGroupRol, JSON.stringify(data), options)
            .map(result => result.json())
            .catch(this.handleError);
  }

  AddRoles(data: any): Observable<any>{
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.UrlAddRol, JSON.stringify(data), options)
            .map(result => result.json())
            .catch(this.handleError);
  }

  AddUsers(data: any): Observable<any>{
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.UrlAddUser, JSON.stringify(data), options)
            .map(result => result.json())
            .catch(this.handleError);
  }

  UDActivoUsers(id :any, v: any): Observable<any>{
    return this.http.get(this.UrlUdActivo + '?id='+ id + '&v=' + v)
            .map(result => result.json())
            .catch(this.handleError);
  }

  UpdateUsuario(data: any) : Observable<any>
  {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.UrlUpdateUsuario, JSON.stringify(data), options)
            .map(result => result.json())
            .catch(this.handleError);

  }

  UpdateGrupo(data: any) : Observable<any>
  {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.UrlUpdateGrupo, JSON.stringify(data), options)
            .map(result => result.json())
            .catch(this.handleError);

  }
  UpdateRoles(data: any) : Observable<any>
  {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.UrlUpdateRoles, JSON.stringify(data), options)
            .map(result => result.json())
            .catch(this.handleError);

  }

  UpdatePrivilegios(data: any) : Observable<any>
  {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.UrlUpdatePrivilegios, JSON.stringify(data), options)
            .map(result => result.json())
            .catch(this.handleError);

  }
  DeleteGrupo(data: any) : Observable<any>
  {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.UrlDeleteGrupo, JSON.stringify(data), options)
            .map(result => result.json())
            .catch(this.handleError);

  }
  DeleteRoles(data: any) : Observable<any>
  {
    return this.http.get(this.UrlDeleteRoles + '?id=' + data)
            .map(result => result.json())
            .catch(this.handleError);
  }

  DeleteUserGroup(data: any) : Observable<any>
  {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.UrlDeleteUserGroup, JSON.stringify(data), options)
            .map(result => result.json())
            .catch(this.handleError);

  }
  DeleteUserRol(data: any) : Observable<any>
  {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.UrlDeleteUserRol, JSON.stringify(data), options)
            .map(result => result.json())
            .catch(this.handleError);

  }


}
