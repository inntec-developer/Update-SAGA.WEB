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
  private UrlEmpresa = ApiConection.ServiceUrl+ApiConection.GetEmpresas;
  private UrlUsuario = ApiConection.ServiceUrl+ApiConection.GetUsuario;
  private UrlEstatu = ApiConection.ServiceUrl+ApiConection.GetEstatusRep;
  private UrlOficina = ApiConection.ServiceUrl+ApiConection.GetOficinas;

  constructor(private http: Http) {  }
  
  private handleError(error: any) {
    console.log('sever error:', error);
    if (error instanceof Response) {
        return Observable.throw(error.json().error || 'backend server error');
    }
    return Observable.throw(error || 'backend server error');
}



GetInforme(clave:string,ofc:string,tipo:string,fini:string,ffin:string,emp:string,
    sol:string,trcl:string,cor:string,stus:string,recl:string): Observable<any> {
    console.log('servicio')
return this.http.get(this.UrlInforme + '?clave='+clave+'&ofc='+ofc+'&tipo='+tipo+'&fini='+fini
    +'&ffin='+ffin+'&emp='+emp+'&sol='+sol+'&trcl='+trcl+'&cor='+cor+'&stus='+stus+'&recl='+recl)
    .map(result => result.json())
    .catch(this.handleError);
}

GetEmpresas(): Observable<any> {
    console.log('servicio')
return this.http.get(this.UrlEmpresa)
    .map(result => result.json())
    .catch(this.handleError);
}

GetUsuario(): Observable<any> {
    console.log('servicio')
return this.http.get(this.UrlUsuario)
    .map(result => result.json())
    .catch(this.handleError);
}

GetEstatusRep(): Observable<any> {
    console.log('servicio')
return this.http.get(this.UrlEstatu)
    .map(result => result.json())
    .catch(this.handleError);
}

// SetDetalle(RequiID:string,Idcampo:number,detalle:boolean): Observable<any> {
//   return this.http.get(this.UrlInforme + '?Requi='+RequiID+'&Idcampo='+Idcampo+'&detalle='+detalle)
//       .map(result => result.json())
//       .catch(this.handleError);
//   }
}
