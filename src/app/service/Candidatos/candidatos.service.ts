import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

import { Headers, Http, HttpModule, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ApiConection } from './../api-conection.service';
import { ApiConection } from '../api-conection.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CandidatosService {
    // Url de servicios.
    private UrlPaises = ApiConection.ServiceUrl + ApiConection.filtropaises;
    private UrlEstados = ApiConection.ServiceUrl + ApiConection.filtroestados;
    private UrlMunicipios = ApiConection.ServiceUrl + ApiConection.filtromunicipios;
    private UrlColonias = ApiConection.ServiceUrl + ApiConection.filtrocolonias;
    private UrlCandidatos = ApiConection.ServiceUrl + ApiConection.Candidatos;
    private UrlMisCandidatos = ApiConection.ServiceUrl + ApiConection.MisCandidatos;
    private UrlCandidatoDtl = ApiConection.ServiceUrl + ApiConection.Candidatodetail;
    private UrlPostulaciones = ApiConection.ServiceUrl + ApiConection.Postulaciones;
    private UrlAreaExp = ApiConection.ServiceUrl + ApiConection.Areasexp;
    private UrlPerfiles = ApiConection.ServiceUrl + ApiConection.Perfiles;
    private UrlGeneros = ApiConection.ServiceUrl + ApiConection.Generos;
    private UrlDiscapacidad = ApiConection.ServiceUrl + ApiConection.Discapacidad;
    private UrlTpLicencia = ApiConection.ServiceUrl + ApiConection.TpLicencia;
    private UrlNivelEstudios = ApiConection.ServiceUrl + ApiConection.NivelEstudio;
    private UrlIdiomas = ApiConection.ServiceUrl + ApiConection.Idiomas;
    private UrlVacantes = ApiConection.ServiceUrl + ApiConection.Vacantes;
    private UrlApartar = ApiConection.ServiceUrl + ApiConection.Apartar;
    private UrlGetEstatus = ApiConection.ServiceUrl + ApiConection.GetEstatus;
    private UrlLiberar = ApiConection.ServiceUrl + ApiConection.Liberar;
    private UrlVacantesDtl = ApiConection.ServiceUrl + ApiConection.VacantesDtl;
    private URLPalabraClave = ApiConection.ServiceUrl + ApiConection.GetCandidatoPalabraClave;

    // Error.
    private handleError(error: any) {
        console.log('sever error:', error);
        if (error instanceof Response) {
            return Observable.throw(error.json().error || 'backend server error');
        }
        return Observable.throw(error || 'backend server error');
    }

    constructor(private http: Http, private _httpClient: HttpClient) { }

    // Servicios de controller de candidatos.

    getpaises(): Observable<any> { // Obtener filtro de paises.
        return this.http.get(this.UrlPaises)
            .map(result => result.json())
            .catch(this.handleError);
    }

    getestados(pais: string): Observable<any> { // Obtener filtro de estados.
        return this.http.get(this.UrlEstados + '?Pais=' + pais)
            .map(result => result.json())
            .catch(this.handleError);
    }

    getmunicipios(estado: string): Observable<any> { // Obtener filtro de municipios.
        return this.http.get(this.UrlMunicipios + '?Estado=' + estado)
            .map(result => result.json())
            .catch(this.handleError);
    }

    getcolonias(municipio: string): Observable<any> { // Obtener filtro de colonias.
        return this.http.get(this.UrlColonias + '?Municipio=' + municipio)
            .map(result => result.json())
            .catch(this.handleError);
    }

    getareasexp(): Observable<any> { // Obtener filtro de areas de experiencia.
        return this.http.get(this.UrlAreaExp)
            .map(result => result.json())
            .catch(this.handleError);
    }

    getperfiles(): Observable<any> { // Obtener filtro de areas de perfiles.
        return this.http.get(this.UrlPerfiles)
            .map(result => result.json())
            .catch(this.handleError);
    }

    getgeneros(): Observable<any> { // Obtener filtro de areas de generos.
        return this.http.get(this.UrlGeneros)
            .map(result => result.json())
            .catch(this.handleError);
    }

    getdiscapacidad(): Observable<any> { // Obtener filtro de areas de Discapacidad.
        return this.http.get(this.UrlDiscapacidad)
            .map(result => result.json())
            .catch(this.handleError);
    }

    gettplicencia(): Observable<any> { // Obtener filtro de areas de tplicencia.
        return this.http.get(this.UrlTpLicencia)
            .map(result => result.json())
            .catch(this.handleError);
    }

    getnivelestudio(): Observable<any> { // Obtener filtro de areas de nivel estudio.
        return this.http.get(this.UrlNivelEstudios)
            .map(result => result.json())
            .catch(this.handleError);
    }

    getidiomas(): Observable<any> { // Obtener filtro de idiomas.
        return this.http.get(this.UrlIdiomas)
            .map(result => result.json())
            .catch(this.handleError);
    }

    getcandidatos(filtrox: any): Observable<any> { // Obtener filtro de candidatos.
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.UrlCandidatos, JSON.stringify(filtrox), options)
            .map(result => result.json())
            .catch(this.handleError);
        // return this.http.get(this.UrlCandidatos)
        //     .map(result => result.json())
        //     .catch(this.handleError);
    }
    getMisCandidatos(reclutador: any): Observable<any> { // Obtener mis de candidatos.
        let params = new HttpParams().set('Id', reclutador);
        return this._httpClient.get(this.UrlMisCandidatos, { params: params });
    }

    getcandidatodtl(Id: any): Observable<any> { // Obtener detalle de candidatos.
        let params = new HttpParams().set('Id', Id);
        return this._httpClient.get(this.UrlCandidatoDtl, { params: params });
    }

    getcandidatosPalabraClave(palabraClave: string): Observable<any> {
        let params = new HttpParams().set('palabraClave', palabraClave);
        return this._httpClient.get(this.URLPalabraClave, { params: params });
    }

    getpostulaciones(Id: any): Observable<any> { // Obtenemos las postulaciones del candidato.
        return this.http.get(this.UrlPostulaciones + '?IdCandidato=' + Id)
            .map(result => result.json())
            .catch(this.handleError);
    }

    getvacantes(Id: any): Observable<any> { // Obtenemos solo las vacantes del reclutador o de la celula a la que pertenece.
        return this.http.get(this.UrlVacantes + '?IdUsuario=' + Id)
            .map(result => result.json())
            .catch(this.handleError);
    }

    getvacantesdtl(Id: any) {
        return this.http.get(this.UrlVacantesDtl + '?IdVacante=' + Id)
            .map(result => result.json())
            .catch(this.handleError);
    }

    postApartar(candidato: any): Observable<any> { // Apartar el candidato y ligar a la vacante.
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.UrlApartar, JSON.stringify(candidato), options)
            .map(result => result.json())
            .catch(this.handleError);
    }

    getEstatusCandidato(Id: any): Observable<any> { // Obtener el esatus del candidato para las banderas de mostrar la información.
        return this.http.get(this.UrlGetEstatus + '?Id=' + Id)
            .map(result => result.json())
            .catch(this.handleError);
    }

    // postLiberar(candidato: any): Observable<any> { // Eliminar el candidato por liberación.
    //   let headers = new Headers({ 'Content-Type': 'application/json' });
    //   let options = new RequestOptions({ headers: headers });
    //   return this.http.post(this.UrlLiberar, JSON.stringify(candidato), options)
    //     .map(result => result.json())
    //     .catch(this.handleError);
    // }

    Liberar(candidato: any): Observable<any> { // Eliminar el candidato por liberación.
        return this.http.get(this.UrlLiberar + '?Id=' + candidato)
            .map(result => result.json())
            .catch(this.handleError);
    }

}
