
import { ApiConection } from './../api-conection.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable()
export class VacantesService {

  private URLGetInformeRequisiciones = ApiConection.ServiceUrl + ApiConection.GetInformeTracking;
  
  constructor(private _httpClient: HttpClient) { }

  GetInformeRequisiciones(clienteId): Observable<any> {
    let params = new HttpParams().set('cc', clienteId);
    return this._httpClient.get(this.URLGetInformeRequisiciones, {params: params});
  }

}
