import { ApiConection } from './../api-conection.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class KioscoServiceService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('validation-token')
    })
  };

  URLPostulacionKiosco = ApiConection.ServiceUrl + ApiConection.PostulacionKiosco;

  constructor(private _httpClient: HttpClient) { }

  PostulacionKiosco(datos): Observable<any>
  {
    
    let params = new HttpParams().set('datos', datos);

    return this._httpClient.post(this.URLPostulacionKiosco, datos, this.httpOptions);
  }
}
