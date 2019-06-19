import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

import { Headers, Http, HttpModule, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { ApiConection } from './../api-conection.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem('valation-token')
  })
};

@Injectable()
export class ClientesService {
  private UrlGetProspectos = ApiConection.ServiceUrl + ApiConection.GetProspectos;
  private UrlGetClientes = ApiConection.ServiceUrl + ApiConection.GetClientes;
  private UrlAddProspecto = ApiConection.ServiceUrl + ApiConection.AddProspectos;
  private UrlHacerCliente = ApiConection.ServiceUrl + ApiConection.HacerCliente;
  private UrlGetCliente = ApiConection.ServiceUrl + ApiConection.GetCliente;
  private UrlEditInfoGeneral = ApiConection.ServiceUrl + ApiConection.EditInfoGeneral;
  private UrlAddDireccionCliente = ApiConection.ServiceUrl + ApiConection.AddDireccionCliente;
  private UrlEditDireccionCliente = ApiConection.ServiceUrl + ApiConection.EditDireccionCliente;
  private UrlDeleteDireccionCliente = ApiConection.ServiceUrl + ApiConection.DeleteDireccionCliente;
  private UrlAddTelefonoCliente = ApiConection.ServiceUrl + ApiConection.AddTelefonoCliente;
  private UrlEditTelefonoCliente = ApiConection.ServiceUrl + ApiConection.EditTelefonoCliente;
  private UrlDeleteTelefonoCliente = ApiConection.ServiceUrl + ApiConection.DeleteTelefonoCliente;
  private UrlAddCorreoCliente = ApiConection.ServiceUrl + ApiConection.AddEmailCliente;
  private UrlEditCorreoCliente = ApiConection.ServiceUrl + ApiConection.EditEmailCliente;
  private UrlDeleteCorreoCliente = ApiConection.ServiceUrl + ApiConection.DeleteEmailCliente;
  private UrlAddContactoCliente = ApiConection.ServiceUrl + ApiConection.AddContactoCliente;
  private UrlEditContactoCliente = ApiConection.ServiceUrl + ApiConection.EditContactoCliente;
  private UrlDeleteContacocliente = ApiConection.ServiceUrl + ApiConection.DeleteContactoCliente;
  private UrlCRUDTelefonContacto = ApiConection.ServiceUrl + ApiConection.CRUDTelefonContacto;
  private UrlCRUDContactoCorreo = ApiConection.ServiceUrl + ApiConection.CRUDContactoCorreo;
  private UrlCoincidenciaCliente = ApiConection.ServiceUrl + ApiConection.CoincidenciaCliente;



  constructor(private _httpClient: HttpClient) { }

  getProspectos(): Observable<any> {
    return this._httpClient.get(this.UrlGetProspectos, httpOptions);
  }

  getClientes(): Observable<any> {
    return this._httpClient.get(this.UrlGetClientes, httpOptions);
  }

  addProspecto(data: any): Observable<any> {
    return this._httpClient.post(this.UrlAddProspecto, data, httpOptions);
  }

  hacerCliente(data: any): Observable<any> {
    return this._httpClient.post(this.UrlHacerCliente, data, httpOptions);
  }

  getCliente(clienteId: any): Observable<any> {
    let params = new HttpParams().set('ClienteId', clienteId);
    return this._httpClient.get(this.UrlGetCliente, { params: params, headers: httpOptions.headers });
  }

  editInfoGeneral(data): Observable<any> {
    return this._httpClient.post(this.UrlEditInfoGeneral, data, httpOptions);
  }

  addDireccion(data): Observable<any> {
    return this._httpClient.post(this.UrlAddDireccionCliente, data, httpOptions);
  }

  editDireccion(data): Observable<any> {
    return this._httpClient.post(this.UrlEditDireccionCliente, data, httpOptions);
  }

  deleteDireccion(direccionId): Observable<any> {
    let params = new HttpParams().set('DireccionId', direccionId);
    return this._httpClient.get(this.UrlDeleteDireccionCliente, { params: params, headers: httpOptions.headers });
  }

  addTelefono(data): Observable<any> {
    return this._httpClient.post(this.UrlAddTelefonoCliente, data, httpOptions);
  }

  editTelefono(data): Observable<any> {
    return this._httpClient.post(this.UrlEditTelefonoCliente, data, httpOptions);
  }

  deleteTelefono(telefonoId): Observable<any> {
    let params = new HttpParams().set('TelefonoId', telefonoId)
    return this._httpClient.get(this.UrlDeleteTelefonoCliente, { params: params, headers: httpOptions.headers });
  }

  addCorreo(data): Observable<any> {
    return this._httpClient.post(this.UrlAddCorreoCliente, data, httpOptions);
  }

  editCorreo(data): Observable<any> {
    return this._httpClient.post(this.UrlEditCorreoCliente, data, httpOptions);
  }

  deleteCorreo(CorreoId): Observable<any> {
    let params = new HttpParams().set('EmailId', CorreoId);
    return this._httpClient.get(this.UrlDeleteCorreoCliente, { params: params, headers: httpOptions.headers })
  }

  addContacto(data): Observable<any> {
    return this._httpClient.post(this.UrlAddContactoCliente, data, httpOptions)
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }

  editContacto(data): Observable<any> {
    return this._httpClient.post(this.UrlEditContactoCliente, data, httpOptions)
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }

  deleteContacto(ContactoId): Observable<any> {
    let params = new HttpParams().set('ContactoId', ContactoId);
    return this._httpClient.get(this.UrlDeleteContacocliente, { params: params, headers: httpOptions.headers })
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }

  crudTelefonContacto(data: any): Observable<any> {
    return this._httpClient.post(this.UrlCRUDTelefonContacto, data, httpOptions)
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }

  crudCorreoContacto(data: any): Observable<any> {
    return this._httpClient.post(this.UrlCRUDContactoCorreo, data, httpOptions)
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }

  coincidenciaCliente(data: any): Observable<any> {
    return this._httpClient.post(this.UrlCoincidenciaCliente, data, httpOptions)
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }
}
