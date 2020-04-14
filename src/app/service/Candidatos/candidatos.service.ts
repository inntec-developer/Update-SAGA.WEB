import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiConection } from './../api-conection.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CandidatosService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('validation-token')
    })
  };
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
    private URLGetAreasRecl = ApiConection.ServiceUrl + ApiConection.GetAreasRecl;
    private URLGetMediosRecl = ApiConection.ServiceUrl + ApiConection.GetMediosRecl;
    private URLUpdateFuenteRecl = ApiConection.ServiceUrl + ApiConection.UpdateFuenteRecl;
    private URLUpdateCandidatoContratado = ApiConection.ServiceUrl + ApiConection.UpdateCandidatoContratado;
    private URLGetMotivos = ApiConection.ServiceUrl + ApiConection.GetMotivos;
    private URLGetContratados = ApiConection.ServiceUrl + ApiConection.GetContratados;
    private URLGetFoliosIncidencias = ApiConection.ServiceUrl + ApiConection.GetCandidatosNR;
    private URLGetInfoContratados = ApiConection.ServiceUrl + ApiConection.GetInfoContratados;
    private URLTopCandidatos = ApiConection.ServiceUrl + ApiConection.GetTopCandidatos;

    // Error.
    // private handleError(error: any) {
    //     console.log('sever error:', error);
    //     if (error instanceof Response) {
    //         return Observable.throw(error.json().error || 'backend server error');
    //     }
    //     return Observable.throw(error || 'backend server error');
    // }

    constructor(private _httpClient: HttpClient) { }

    // Servicios de controller de candidatos.

    GetAreasRecl(): Observable<any> {
        return this._httpClient.get(this.URLGetAreasRecl);
    }

    GetMediosRecl(): Observable<any> { // Obtener el esatus del candidato para las banderas de mostrar la información.
        return this._httpClient.get(this.URLGetMediosRecl);
    }

    GetMotivos(estatus): Observable<any> {
        const params = new HttpParams().set('estatus', estatus);
        return this._httpClient.get(this.URLGetMotivos, {params: params});
    }

    GetContratados(candidatoId): Observable<any> { // Obtener el esatus del candidato para las banderas de mostrar la información.
        const params = new HttpParams().set('candidatoId', candidatoId);
        return this._httpClient.get(this.URLGetContratados, {params: params, headers: this.httpOptions.headers});
    }

    GetInfoContratados(): Observable<any> {
        return this._httpClient.get(this.URLGetInfoContratados);
    }

    GetFoliosIncidencias(estatus, propietarioId): Observable<any> { 
        // Obtener el esatus del candidato para las banderas de mostrar la información.
        const params = new HttpParams().set('estatus', estatus).set('propietarioId', propietarioId);
        return this._httpClient.get(this.URLGetFoliosIncidencias, {params: params});
    }

    UpdateFuenteRecl(data: any): Observable<any> {
        return this._httpClient.post(this.URLUpdateFuenteRecl, data, this.httpOptions);
    }

    UpdateContratados(data: any): Observable<any> {
        return this._httpClient.post(this.URLUpdateCandidatoContratado, data, this.httpOptions);
    }

    getpaises(): Observable<any> { // Obtener filtro de paises.
        return this._httpClient.get(this.UrlPaises);
    }

    getestados(pais: string): Observable<any> { // Obtener filtro de estados.
        return this._httpClient.get(this.UrlEstados + '?Pais=' + pais);
    }

    getmunicipios(estado: string): Observable<any> { // Obtener filtro de municipios.
        return this._httpClient.get(this.UrlMunicipios + '?Estado=' + estado);
    }

    getcolonias(municipio: string): Observable<any> { // Obtener filtro de colonias.
        return this._httpClient.get(this.UrlColonias + '?Municipio=' + municipio);
    }

    getareasexp(): Observable<any> { // Obtener filtro de areas de experiencia.
        return this._httpClient.get(this.UrlAreaExp);
    }

    getperfiles(): Observable<any> { // Obtener filtro de areas de perfiles.
        return this._httpClient.get(this.UrlPerfiles);
    }

    getgeneros(): Observable<any> { // Obtener filtro de areas de generos.
        return this._httpClient.get(this.UrlGeneros);
    }

    getdiscapacidad(): Observable<any> { // Obtener filtro de areas de Discapacidad.
        return this._httpClient.get(this.UrlDiscapacidad);
    }

    gettplicencia(): Observable<any> { // Obtener filtro de areas de tplicencia.
        return this._httpClient.get(this.UrlTpLicencia);
    }

    getnivelestudio(): Observable<any> { // Obtener filtro de areas de nivel estudio.
        return this._httpClient.get(this.UrlNivelEstudios);
    }

    getidiomas(): Observable<any> { // Obtener filtro de idiomas.
        return this._httpClient.get(this.UrlIdiomas);
    }

    getcandidatos(filtrox: any): Observable<any> { // Obtener filtro de candidatos.
        return this._httpClient.post(this.UrlCandidatos, JSON.stringify(filtrox));
    }
    getMisCandidatos(reclutador: any): Observable<any> { // Obtener mis de candidatos.
        const params = new HttpParams().set('Id', reclutador);
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
    getTopCandidatos(): Observable<any> {
        return this._httpClient.get(this.URLTopCandidatos, {headers: this.httpOptions.headers});
    }

    getpostulaciones(Id: any): Observable<any> { // Obtenemos las postulaciones del candidato.
        return this._httpClient.get(this.UrlPostulaciones + '?IdCandidato=' + Id);
    }

    getvacantes(Id: any): Observable<any> { // Obtenemos solo las vacantes del reclutador o de la celula a la que pertenece.
        return this._httpClient.get(this.UrlVacantes + '?IdUsuario=' + Id);
    }

    getvacantesdtl(Id: any) {
      let params = new HttpParams().set('IdVacante', Id)
        return this._httpClient.get<any>(this.UrlVacantesDtl, {params: params, headers: this.httpOptions.headers} );
    }

    postApartar(candidato: any): Observable<any> { // Apartar el candidato y ligar a la vacante.
        return this._httpClient.post(this.UrlApartar, JSON.stringify(candidato));
    }

    getEstatusCandidato(Id: any): Observable<any> { // Obtener el esatus del candidato para las banderas de mostrar la información.
        return this._httpClient.get(this.UrlGetEstatus + '?Id=' + Id);
    }

    Liberar(candidato: any): Observable<any> { // Eliminar el candidato por liberación.
        return this._httpClient.get(this.UrlLiberar + '?Id=' + candidato);
    }

}
