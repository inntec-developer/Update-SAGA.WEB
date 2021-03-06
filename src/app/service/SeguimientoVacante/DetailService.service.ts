import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ApiConection } from '../api-conection.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DetailService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('validation-token')
    })
  };

  // Url de servicios.
  private UrlDtsDetail = ApiConection.ServiceUrl + ApiConection.getDtosDetail;

  constructor(private _HttpClient: HttpClient ) {

  }

  GetDtosDetail(VacanteId: any): Observable<any> {
    let params = new HttpParams().set('VacanteId', VacanteId);
    return this._HttpClient.get(this.UrlDtsDetail, { params: params, headers: this.httpOptions.headers });
  }
}
