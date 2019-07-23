import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ApiConection } from './api-conection.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class CheckVertionSistemService {

  private URLCheckVertionSistem = ApiConection.ServiceUrl + ApiConection.CheckVertionSistem;

  constructor(private _httpClient: HttpClient) { }

  checkVertionSistem(version :string): Observable<any>{
    let params = new HttpParams().set('version', version);
    return this._httpClient.get<any>(this.URLCheckVertionSistem, {params: params});
  }
}
