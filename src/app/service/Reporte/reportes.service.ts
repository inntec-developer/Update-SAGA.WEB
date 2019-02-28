import { Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

import { Http, Response, RequestOptions, Headers, HttpModule } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ApiConection } from '../api-conection.service';

@Injectable()
export class ReportesService {
  private UrlInforme = ApiConection.ServiceUrl+ApiConection.GetInforme;

  constructor(private http: Http) {  }
  
  private handleError(error: any) {
    console.log('sever error:', error);
    if (error instanceof Response) {
        return Observable.throw(error.json().error || 'backend server error');
    }
    return Observable.throw(error || 'backend server error');
}



GetInforme(): Observable<any> {
    console.log('servicio')
return this.http.get(this.UrlInforme)
    .map(result => result.json())
    .catch(this.handleError);
}

// SetDetalle(RequiID:string,Idcampo:number,detalle:boolean): Observable<any> {
//   return this.http.get(this.UrlInforme + '?Requi='+RequiID+'&Idcampo='+Idcampo+'&detalle='+detalle)
//       .map(result => result.json())
//       .catch(this.handleError);
//   }
}
