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

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

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
  private UrlLogIn = ApiConection.ServiceUrl+ApiConection.login;
  private UrlUdActivo = ApiConection.ServiceUrl+ApiConection.udActivoUser;
  private UrlGetByDepa = ApiConection.ServiceUrl+ApiConection.getUsuariosByDepa;
  private UrlGetGrupos = ApiConection.ServiceUrl+ApiConection.GetGrupos;
  private UrlGetGruposRoles = ApiConection.ServiceUrl+ApiConection.getGruposRoles
  private UrlGetRoles = ApiConection.ServiceUrl+ApiConection.GetRoles;
  private UrlUpdateUsuario = ApiConection.ServiceUrl+ApiConection.updateUsuario;
  private UrlUpdateGrupo = ApiConection.ServiceUrl+ApiConection.updateGrupo;
  private UrlUpdateActivo = ApiConection.ServiceUrl+ApiConection.updateActivo;
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
  private UrlGetImage = ApiConection.ServiceUrl+ApiConection.getImage;
  private UrlSendEmailRegister = ApiConection.ServiceUrl+ApiConection.sendEmailRegister;
  private UrlDownloadFiles = ApiConection.ServiceUrl+ApiConection.downloadFiles;
  private UrlViewFile = ApiConection.ServiceUrl + ApiConection.viewFile;
  private UrlUploadFile = ApiConection.ServiceUrl + ApiConection.uploadFile;
  private UrlGetLideres = ApiConection.ServiceUrl + ApiConection.getLideres;
  private UrlGetOficinas = ApiConection.ServiceUrl + ApiConection.getOficinas;
  private UrlGetByUsuario = ApiConection.ServiceUrl + ApiConection.GetByUsuario;
  private UrlSendEmail = ApiConection.ServiceUrl + ApiConection.EnviaCorreo;
  private UrlUpdatePassword = ApiConection.ServiceUrl + ApiConection.updatePassword;

  // Error.
  private handleError(error: any) {
         console.log('sever error:', error);
         if (error instanceof Response) {
             return Observable.throw(error.json().error || 'backend server error');
         }
         return Observable.throw(error || 'backend server error');
     }


  constructor(private http: Http, private _httpClient: HttpClient ) {

  }

  UploadImg( file: File, name: any) : Observable<any>
  {
    let formData = new FormData();
    formData.append('image', file, name );
    let headers = new Headers({'Content-Type': 'image/*.*'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.UrlUploadImage, formData ).map(result => result.json());
  }

  GetFiles(candidatoId): Observable<any>
  {

    let httpHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': 'https://websb.damsa.com.mx'
     })

     let params = new HttpParams().set('entidadId', candidatoId)

     return this._httpClient.get(this.UrlGetFiles, {params: params});
  }

  GetImage(ruta): string
  {
    return ApiConection.ServiceUrlFileManager + 'Files/users/' + ruta;
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

  UploadFile( file: File, candidatoId ) : Observable<any>
  {
    let formData = new FormData();
    formData.append('file', file, file.name + '_' + candidatoId );

    return this.http.post(this.UrlUploadFile, formData ).map(result => result.json());
  }

  downloadImage(ruta): Observable<any>
  {
    // let ruta = "utilerias/img/user/08155cc8-3568-e811-80e1-9e274155325e.jpeg";

    let httpHeaders = new HttpHeaders({
     'Access-Control-Allow-Origin': 'https://websb.damsa.com.mx',
     'Content-Type': 'image/*.*'
    })

    let params = new HttpParams().set('ruta', ruta);
    //let options = new RequestOptions({headers: httpHeaders, params: params, responseType: ResponseContentType.Blob });
      // return this.http.get(ruta, options)
      // .map(res => res.blob())
      //   .catch(this.handleError)


     return this._httpClient.get(ApiConection.ServiceUrlFileManager + '/img/user/' + ruta, {headers: httpHeaders, responseType: "blob"});
    //  return this._httpClient.get(ApiConection.ServiceUrlFoto + ruta, {responseType: "blob"});


    // return this._httpClient.get(this.UrlGetImage, { headers: httpHeaders,
    //   params: params
    //   })

  }

  downloadPDF(url):  Observable<any> {
    return this._httpClient.get(ApiConection.ServiceUrlFileManager + 'pdf/' + url, {responseType: "blob"});
  }

  getPersonas(user: any): Observable<any>
  {
      let params = new HttpParams().set('user', user);
     return this._httpClient.get(this.Url, {params: params});
  }

  SendEmailRegister(data: any): Observable<any>{

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.UrlSendEmailRegister, JSON.stringify(data), options)
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

  UpdateActivo(cell): Observable<any>
  {
    let params = new HttpParams().set('Id', cell.id);

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.UrlUpdateActivo, JSON.stringify(cell), options)
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
    return this.http.get(this.UrlLogIn + '?p='+ pass + '&e=' + mail)
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
    console.log(data)
    let params = new HttpParams().set('datos', data)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this._httpClient.post(this.UrlUpdateUsuario, JSON.stringify(data), httpOptions )

    // let headers = new Headers({'Content-Type': 'application/json'});
    // let options = new RequestOptions({headers: headers});
    // return this.http.post(this.UrlUpdateUsuario, JSON.stringify(data), options)
    //         .map(result => result.json())
    //         .catch(this.handleError);

  }

  UpdateGrupo(data: any) : Observable<any>
  {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this._httpClient.post(this.UrlUpdateGrupo, data, httpOptions);

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
    return this._httpClient.post(this.UrlUpdatePrivilegios, data, httpOptions);
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

  GetByUsuario(tipo: number): Observable<any>{
    let params = new HttpParams().set('tipo', tipo.toString());
    return this._httpClient.get(this.UrlGetByUsuario, {params: params});
  }
  GetLideres() : Observable<any>
  {
    return this._httpClient.get(this.UrlGetLideres);
  }

  GetOficinas(): Observable<any>{
    return this._httpClient.get(this.UrlGetOficinas);
  }

  UpdatePassword(data: any): Observable<any> {
    const params = new HttpParams().set('datos', data)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this._httpClient.post(this.UrlUpdatePassword, JSON.stringify(data), httpOptions);
  }
  EnviaCorreo(correo: string, pass: string): Observable<any> {
    let params = new HttpParams().set('correo', correo).set('pass', pass);
    return this._httpClient.get(this.UrlSendEmail, {params: params});
  }
}
