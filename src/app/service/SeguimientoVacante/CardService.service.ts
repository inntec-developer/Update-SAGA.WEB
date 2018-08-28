import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';



import { ApiConection } from '../api-conection.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CardService {

  // Url de servicios.
  private UrlDtsCard = ApiConection.ServiceUrl+ApiConection.getDtosCard;

  constructor(private _HttpClient: HttpClient ) {

  }


  GetDtosCard(ClientId: any): Observable<any>
  {
    let params = new HttpParams().set('ClientId', ClientId);
    return this._HttpClient.get(this.UrlDtsCard, { params: params })
  }
}