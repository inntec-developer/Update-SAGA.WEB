import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ApiConection } from './../api-conection.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class VacantesEmailService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('validation-token')
    })
  };

  constructor(
    private _httpClient: HttpClient
  ) { }

  private URLshowVacanteEmail = ApiConection.ServiceUrl + ApiConection.showVacantesEmails;

  showVacanteEmail(folio: any): Observable<any>{
    var params = new HttpParams().set('Folio', folio);
    return this._httpClient.get(this.URLshowVacanteEmail, {params: params, headers: this.httpOptions.headers});
  }
}
