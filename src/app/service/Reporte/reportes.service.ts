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
  private UrlRadial = ApiConection.ServiceUrl+ApiConection.getRadialG;
  private UrlProActividad = ApiConection.ServiceUrl+ApiConection.GetProActividad;
  private UrlDetalleReclu = ApiConection.ServiceUrl+ApiConection.GetDetalleReclu;
  private UrlDetalleCordi = ApiConection.ServiceUrl+ApiConection.GetDetalleCordi;
  private UrlCoordinacion = ApiConection.ServiceUrl+ApiConection.GetCoordinacion;
  private UrlCandidato = ApiConection.ServiceUrl+ApiConection.GetCandidatoRep;

  constructor(private http: Http,private _httpClient : HttpClient) {  }
  
  private handleError(error: any) {
    console.log('sever error:', error);
    if (error instanceof Response) {
        return Observable.throw(error.json().error || 'backend server error');
    }
    return Observable.throw(error || 'backend server error');
}


  getProActividad(fini:string,ffin:string,recl:string,cor:string): Observable<any> {
    let params = new HttpParams().set('fini', fini).set('ffin', ffin).set('recl', recl).set('cor', cor);
    return this._httpClient.get(this.UrlProActividad, {params: params});
    // return this.http.get(this.UrlProActividad)
    //     .map(result => result.json())
    //     .catch(this.handleError);
    }

    getDetalleReclu(fini:string,ffin:string,recl:string,cor:string): Observable<any> {
        let params = new HttpParams().set('fini', fini).set('ffin', ffin).set('recl', recl).set('cor', cor);
        return this._httpClient.get(this.UrlDetalleReclu, {params: params});
        }

    getCoordinacion(fini:string,ffin:string,stus:string): Observable<any> {
    let params = new HttpParams().set('fini', fini).set('ffin', ffin).set('stus', stus);
    return this._httpClient.get(this.UrlCoordinacion, {params: params});
    }
    
    getDetalleCordi(fini:string,ffin:string,aprob:string,cor:string): Observable<any> {
    let params = new HttpParams().set('fini', fini).set('ffin', ffin).set('aprob', aprob).set('cor', cor);
    return this._httpClient.get(this.UrlDetalleCordi, {params: params});
    }

    getCandidatos(fini:string,ffin:string,edad:string,genero:string,estadoID:string): Observable<any> {
        let params = new HttpParams().set('fini', fini)
        .set('ffin', ffin).set('edad', edad).set('genero', genero).set('estadoID', estadoID);
        return this._httpClient.get(this.UrlCandidato, {params: params});
        }

getVRadial(data: any) : Observable<any>{
    let params = new HttpParams().set('usuario', data);
    return this._httpClient.get(this.UrlRadial, {params: params});
  }


GetInforme(clave:string,ofc:string,tipo:string,fini:string,ffin:string,emp:string,
    sol:string,trcl:string,cor:string,stus:string,recl:string,usercor:string): 
    Observable<any> {
    return this.http.get(
        this.UrlInforme + '?clave='+clave+'&ofc='+ofc+'&tipo='+tipo+'&fini='+fini
      +'&ffin='+ffin+'&emp='+emp+'&sol='+sol+'&trcl='+trcl+'&cor='+cor+'&stus='+stus+'&recl='+recl +'&usercor='+usercor
    ).map(result => result.json()).catch(this.handleError);
}

GetEmpresas(): Observable<any> {
   
return this.http.get(this.UrlEmpresa)
    .map(result => result.json())
    .catch(this.handleError);
}

GetUsuario(cor:string): Observable<any> {
   
return this.http.get(this.UrlUsuario + '?cor='+cor)
    .map(result => result.json())
    .catch(this.handleError);
}

GetEstatusRep(): Observable<any> {
   
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
