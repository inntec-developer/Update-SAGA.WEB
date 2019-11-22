import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
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
  private urlGetCostosByDamfo = ApiConection.ServiceUrl + ApiConection.GetCostosByDamfo;
  constructor(private _httpClient: HttpClient) { }

  GetCostos(): Observable<any> {
    return this._httpClient.get<any>(this.urlGetCostos, {headers: this.httpOptions.headers});
  }
  GetCostosByDamfo(damfoId): Observable<any> {
    const params = new HttpParams().set('damfoId', damfoId );
    return this._httpClient.get<any>(this.urlGetCostosByDamfo, {params: params, headers: this.httpOptions.headers});
  }
}
