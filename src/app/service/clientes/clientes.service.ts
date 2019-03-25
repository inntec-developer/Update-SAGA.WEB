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
export class ClientesService {
  private UrlGetProspectos = ApiConection.ServiceUrl + ApiConection.GetProspectos;
  private UrlGetClientes = ApiConection.ServiceUrl + ApiConection.GetClientes;
  private UrlAddProspecto = ApiConection.ServiceUrl + ApiConection.AddProspectos;
  constructor(private _httpClient: HttpClient) { }

  getProspectos() : Observable<any>{
    return this._httpClient.get(this.UrlGetProspectos);
  }

  getClientes() : Observable <any>{
    return this._httpClient.get(this.UrlGetClientes);
  }

  addProspecto(data: any) : Observable<any>{
    return this._httpClient.post(this.UrlAddProspecto, data, httpOptions);
  }

}
