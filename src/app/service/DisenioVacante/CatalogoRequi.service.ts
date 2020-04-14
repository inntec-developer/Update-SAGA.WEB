
import { Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ApiConection } from '../api-conection.service';

@Injectable()
export class Requis {
// Url de servicios.
private Url = ApiConection.ServiceUrl+ApiConection.getRequis;



constructor(private http: HttpClient) {  }

getRequis(): Observable<any> {
   return this.http.get(this.Url);
}

}
