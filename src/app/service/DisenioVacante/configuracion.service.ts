import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiConection } from '../api-conection.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ConfiguracionService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('validation-token')
    })
  };
// Url de servicios.
private UrlResumen = ApiConection.ServiceUrl+ApiConection.setResumen;
private UrlDetalle = ApiConection.ServiceUrl+ApiConection.setDetalle;
private UrlPublicar = ApiConection.ServiceUrl+ApiConection.updatePublicar;
private UrlGuardar = ApiConection.ServiceUrl+ApiConection.GuardarConfi;


constructor(private _httpClient: HttpClient) {  }
SetDetalle(RequiID:string,Idcampo:number,detalle:boolean): Observable<any> {
   return this._httpClient.get(this.UrlDetalle + '?Requi='+RequiID+'&Idcampo='+Idcampo+'&detalle='+detalle);

}

SetResumen(RequiID:string,Idcampo:number,detalle:boolean): Observable<any> {
   return this._httpClient.get(this.UrlResumen + '?Requi='+RequiID+'&Idcampo='+Idcampo+'&resumen='+detalle);
}

// UpdatePublicar2(RequiID:string, lista:any[]): Observable<any> {
//    return this.http.post(this.UrlPublicar + '?Requi='+RequiID+'&ListadoJson='+lista)
//        .map(result => result.json())
//        .catch(this.handleError);
// }


// UpdatePublicar(data: any, requi: string): Observable<any>{
//   let headers = new Headers({'Content-Type' : 'application/json'});
//   let options = new RequestOptions({headers: headers});
//   return this.http.post(this.UrlPublicar, JSON.stringify(data), options )
//           .map(result => result.json())
//           .catch(this.handleError);
// }



UpdatePublicar(data: any, requi: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
    });
    const obj = {
      ListaPublicar: data,
      RequiId: requi
    };
    // let options = {
    //   headers: httpHeaders
    // };
    return this._httpClient.post(this.UrlPublicar, obj, this.httpOptions);
  }



GuardarPublicacion(data: any): Observable<any> {

    return this._httpClient.post(this.UrlGuardar, JSON.stringify(data), this.httpOptions);
  }

}
