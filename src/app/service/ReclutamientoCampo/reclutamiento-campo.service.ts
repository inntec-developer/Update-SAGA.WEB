
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConection } from './../api-conection.service';

@Injectable({
  providedIn: 'root'
})

export class ReclutamientoCampoService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };


  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + sessionStorage.getItem('validation-token')
  //   })
  // };
private urlGetUnidadesNegocios = ApiConection.ServiceUrl + ApiConection.GetUnidadesNegocio;
  private urlGetReclutadores = ApiConection.ServiceUrl + ApiConection.GetReclutadoresCampo;
  private urlGetRequisReclutador = ApiConection.ServiceUrl + ApiConection.GetRequisReclutadores;
  private urlGetReclutadoresByUnidad = ApiConection.ServiceUrl + ApiConection.GetReclutadoresByUnidad;
  private urlUpdateContratadosCampo = ApiConection.ServiceUrl + ApiConection.UpdateContratadosCampo;
private urlGetCandidatosProceso = ApiConection.ServiceUrl + ApiConection.GetCandidatosProceso;
  constructor(private _httpClient: HttpClient) { }
  GetUnidadesNegocio(): Observable<any> {
    return this._httpClient.get<any>(this.urlGetUnidadesNegocios);
  }
  GetReclutadoresByUnidad(id): Observable<any> {
    const params = new HttpParams().set('id', id);
    return this._httpClient.get<any>(this.urlGetReclutadoresByUnidad, {params: params});
  }
  GetDtosReclutadores(): Observable<any> {
    return this._httpClient.get<any>(this.urlGetReclutadores);
  }
  GetRequisReclutadores(reclutadorId): Observable<any> {
    const params = new HttpParams().set('reclutadorId', reclutadorId);
    return this._httpClient.get<any>(this.urlGetRequisReclutador, {params: params});
  }
  GetCandidatosProceso(requisicionId): Observable<any> {
    const params = new HttpParams().set('requisicionId', requisicionId);
    return this._httpClient.get<any>(this.urlGetCandidatosProceso, {params: params});
  }

  UpdateContratadosCampo(data: any): Observable<any> {
    return this._httpClient.post(this.urlUpdateContratadosCampo, data, this.httpOptions);
  }

}
