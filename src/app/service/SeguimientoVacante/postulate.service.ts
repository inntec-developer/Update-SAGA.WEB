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
export class PostulateService {
  private UrlGetPostulados = ApiConection.ServiceUrl + ApiConection.getPostulados;
  constructor(private _HttpClient: HttpClient) { }

  getPostulados(VacanteId : string) : Observable<any>{
    let params = new HttpParams().set('VacanteId', VacanteId);
    return this._HttpClient.get(this.UrlGetPostulados, { params: params })
  }
}
