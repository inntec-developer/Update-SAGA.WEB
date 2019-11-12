import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ApiConection } from '..';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CostosService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('validation-token')
    })
  };

  private urlGetCostos = ApiConection.ServiceUrl + ApiConection.GetCostos;
  constructor(private _httpClient: HttpClient) { }

  GetCostos(): Observable<any> {
    return this._httpClient.get<any>(this.urlGetCostos, {headers: this.httpOptions.headers});
  }
}
