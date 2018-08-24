import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ApiConection } from '../api-conection.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class InfoCandidatoService {
  private UrlGetInfoCandidato = ApiConection.ServiceUrl + ApiConection.getInfoCandidato
  constructor(private _httpClient : HttpClient) { }

  getInfoCandidato(id : string) : Observable<any>{
    let params = new HttpParams().set('Id', id);
    return this._httpClient.get(this.UrlGetInfoCandidato, {params: params});
  }

}
