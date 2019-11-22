
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConection } from './../api-conection.service';

@Injectable({
  providedIn: 'root'
})

export class ReclutamientoCampoService {
  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type':  'application/json'
  //   })
  // };


  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('validation-token')
    })
  };
private urlGetUnidadesNegocios = ApiConection.ServiceUrl + ApiConection.GetUnidadesNegocio;
private urlGetReclutadoresCampo = ApiConection.ServiceUrl + ApiConection.GetReclutadoresCampo2;
  private urlGetReclutadores = ApiConection.ServiceUrl + ApiConection.GetReclutadoresCampo;
  private urlGetRequisReclutador = ApiConection.ServiceUrl + ApiConection.GetRequisReclutadores;
  private urlGetReclutadoresByUnidad = ApiConection.ServiceUrl + ApiConection.GetReclutadoresByUnidad;
  private urlUpdateContratadosCampo = ApiConection.ServiceUrl + ApiConection.UpdateContratadosCampo;
private urlGetCandidatosProceso = ApiConection.ServiceUrl + ApiConection.GetCandidatosProceso;
  constructor(private _httpClient: HttpClient) { }
  GetUnidadesNegocio(): Observable<any> {
    return this._httpClient.get<any>(this.urlGetUnidadesNegocios, { headers: this.httpOptions.headers });
  }
  GetReclutadoresByUnidad(id): Observable<any> {
    const params = new HttpParams().set('id', id);
    return this._httpClient.get<any>(this.urlGetReclutadoresByUnidad, {params: params, headers: this.httpOptions.headers});
  }
  GetDtosReclutadoresCampo(): Observable<any> {
    return this._httpClient.get<any>(this.urlGetReclutadoresCampo, { headers: this.httpOptions.headers });
  }
  GetDtosReclutadores(): Observable<any> {
    return this._httpClient.get<any>(this.urlGetReclutadores, { headers: this.httpOptions.headers });
  }
  GetRequisReclutadores(reclutadorId): Observable<any> {
    const params = new HttpParams().set('reclutadorId', reclutadorId);
    return this._httpClient.get<any>(this.urlGetRequisReclutador, {params: params, headers: this.httpOptions.headers});
  }
  GetCandidatosProceso(requisicionId): Observable<any> {
    const params = new HttpParams().set('requisicionId', requisicionId);
    return this._httpClient.get<any>(this.urlGetCandidatosProceso, {params: params, headers: this.httpOptions.headers});
  }

  UpdateContratadosCampo(data: any): Observable<any> {
    return this._httpClient.post(this.urlUpdateContratadosCampo, data, this.httpOptions);
  }

}
