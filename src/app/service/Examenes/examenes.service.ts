
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ApiConection } from './../api-conection.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ExamenesService {

  URLInsertExamen = ApiConection.ServiceUrl + ApiConection.InsertExamen;
  URLGetCatalogo = ApiConection.ServiceUrl + ApiConection.GetCatalogo;
  URLGetExamenes = ApiConection.ServiceUrl + ApiConection.GetExamenes;
  URLGetExamen = ApiConection.ServiceUrl + ApiConection.GetExamen;
  URLInsertRelacion = ApiConection.ServiceUrl + ApiConection.InsertRelacion;
  URLInsertRespCandidato = ApiConection.ServiceUrl + ApiConection.InsertRespCandidato;
  URLInsertResultMedico = ApiConection.ServiceUrl + ApiConection.InsertResultMedico;
  URLGetCandidatosExamenes = ApiConection.ServiceUrl + ApiConection.GetCandidatosExamen;
  URLGetRespuestasCandidatos = ApiConection.ServiceUrl + ApiConection.GetRespuestasCandidato;
  URLActualizarResultado = ApiConection.ServiceUrl + ApiConection.ActualizarResultado;
  URLGetExamenRequi = ApiConection.ServiceUrl + ApiConection.GetExamenRequi;
  URLGetExamenCandidato = ApiConection.ServiceUrl + ApiConection.GetExamenCandidato;
  URLGetRequiEstatus = ApiConection.ServiceUrl + ApiConection.GetRequiEstatus;
  URLGetRequisicionesPsico = ApiConection.ServiceUrl + ApiConection.GetRequisicionesPsico;
  URLInsertClaves = ApiConection.ServiceUrl + ApiConection.InsertClaves;
  URLAgregarResultado = ApiConection.ServiceUrl + ApiConection.AgregarResultado;
  URLGetClaves = ApiConection.ServiceUrl + ApiConection.GetClaves;
  URLGetClaveCandidatos = ApiConection.ServiceUrl + ApiConection.GetClaveCandidatos;
  URLGetClavesCandidatos = ApiConection.ServiceUrl + ApiConection.GetClavesCandidatos;
  URLAsignarClaveCandidato = ApiConection.ServiceUrl +ApiConection.AsignarClaveCandidato;
  URLGetExamenesMedicos = ApiConection.ServiceUrl + ApiConection.GetExamenesMedicos;

  constructor(private _httpClient: HttpClient) { }

  InsertExamenes(examen): Observable<any>
  {
    
    let params = new HttpParams().set('Objeto', examen);



    // params.append('Objeto', examen);
    // params.append('tipoexamen', tipoexamen);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this._httpClient.post(this.URLInsertExamen, examen, httpOptions);
  }

  InsertRelacion(relacion): Observable<any>
  {
    
    let params = new HttpParams().set('requiexamen', relacion);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this._httpClient.post(this.URLInsertRelacion, relacion, httpOptions);
  }

  InsertRespCandidato(resultado): Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this._httpClient.post(this.URLInsertRespCandidato, resultado, httpOptions)
  }

  InsertResultMedico(resultado): Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this._httpClient.post(this.URLInsertResultMedico, resultado, httpOptions)
  }

  InsertClaves(claves): Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this._httpClient.post(this.URLInsertClaves, claves, httpOptions)
  }

  AsignarClaveCandidato(objeto): Observable<any>
  {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this._httpClient.post(this.URLAsignarClaveCandidato, objeto, httpOptions);
  }
  AgregarResultadoPsico(resultado): Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this._httpClient.post(this.URLAgregarResultado, resultado, httpOptions)
  }

  ActualizarResultado(resultado): Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this._httpClient.post(this.URLActualizarResultado, resultado, httpOptions )
  }

  GetCatalogo() : Observable<any>
  {
    return this._httpClient.get(this.URLGetCatalogo);
  }

  GetRequisicionesPsico() : Observable<any>
  {
    return this._httpClient.get(this.URLGetRequisicionesPsico)
  }
  GetExamenes(tipoexamenId) : Observable<any>
  {
    let params = new HttpParams().set('tipoexamenId', tipoexamenId);
    return this._httpClient.get(this.URLGetExamenes, {params:params});
  }
  GetExamenesMedicos() : Observable<any>
  {
    return this._httpClient.get(this.URLGetExamenesMedicos);
  }
  GetExamen(examenId) : Observable<any>
  {
    let params = new HttpParams().set('examenId', examenId);
    return this._httpClient.get(this.URLGetExamen, {params:params});
  }
  GetCandidatosExamenes(): Observable<any>
  {
    return this._httpClient.get(this.URLGetCandidatosExamenes);
  }
  GetResultadosCandidato(candidatoId, requisicionId): Observable<any>
  {
    let params = new HttpParams().set('CandidatoId', candidatoId).set('RequisicionId', requisicionId);

    return this._httpClient.get(this.URLGetRespuestasCandidatos, {params:params});

  }
  
  GetExamenRequi(requisicionId): Observable<any>
  {
    let params = new HttpParams().set('requisicionId', requisicionId);

    return this._httpClient.get(this.URLGetExamenRequi, {params:params});

  }

  GetExamenCandidato(candidatoId): Observable<any>
  {
    let params = new HttpParams().set('candidatoId', candidatoId);

    return this._httpClient.get(this.URLGetExamenCandidato, {params:params});

  }
  GetRequisicionesEstatus(estatus): Observable<any> {
    let params = new HttpParams().set('estatus', estatus);
    return this._httpClient.get(this.URLGetRequiEstatus, { params: params });
  }

  GetClaves(requisicionId): Observable<any>
  {
    let params = new HttpParams().set('requisicionId', requisicionId);

    return this._httpClient.get(this.URLGetClaves, {params:params});

  }
  GetClavesCandidatos(): Observable<any>
  {
    return this._httpClient.get(this.URLGetClaveCandidatos);
  }
  GetClavesByCandidatos(): Observable<any>
  {
    return this._httpClient.get(this.URLGetClavesCandidatos);
  }
}
