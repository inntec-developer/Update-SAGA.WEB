import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ApiConection } from './../api-conection.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsService } from '../../core/settings/settings.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})


export class SistTicketsService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('validation-token')
    })
  };
  // Url de servicios.
  private UrlInsertTicket = ApiConection.ServiceUrl + ApiConection.InsertTicket;
  private UrlUpdateStatus = ApiConection.ServiceUrl + ApiConection.UpdateStatusTicket;
  private UrlUpdateRequiTicket = ApiConection.ServiceUrl + ApiConection.UpdateRequiTicket;
  private UrlUpdateCandidatoTicket = ApiConection.ServiceUrl + ApiConection.UpdateCandidatoTicket;
  private UrlGetFilaTickets = ApiConection.ServiceUrl+ApiConection.GetFilaTickets;
  private UrlGetTicketRecl = ApiConection.ServiceUrl + ApiConection.GetTicketRecl;
  private UrlGetTicketExamen = ApiConection.ServiceUrl + ApiConection.GetTicketExamen;
  private UrlGetTicketPrioridad = ApiConection.ServiceUrl + ApiConection.GetTicketPrioridad;
  private UrlGetPostulaciones = ApiConection.ServiceUrl + ApiConection.GetPostulaciones;
  private UrlLiberarCandidato = ApiConection.ServiceUrl + ApiConection.LiberarCandidato;
  private UrlGetTicketEnAtencion = ApiConection.ServiceUrl + ApiConection.GetTicketEnAtencion;
  private UrlGetVacantes = ApiConection.ServiceUrl + ApiConection.GetVacantes;
  private UrlSetExamen = ApiConection.ServiceUrl + ApiConection.SetExamen;
  private UrlGetModulos = ApiConection.ServiceUrl + ApiConection.GetModulos;
  private UrlSetEstatusCandidato = ApiConection.ServiceUrl + ApiConection.SetEstatusCandidato;
  private UrlGetTicketConCita = ApiConection.ServiceUrl + ApiConection.GetTicketConCita;
  private UrlGetTicketSinCita = ApiConection.ServiceUrl + ApiConection.GetTicketSinCita;
  private UrlGetConcurrenciaReporte = ApiConection.ServiceUrl + ApiConection.GetConcurrenciaReporte;
  private UrlGetEstados = ApiConection.ServiceUrl + ApiConection.GetEstado;
  private UrlGetMunicipioByEstado = ApiConection.ServiceUrl + ApiConection.GetMunicipio;
  private UrlRegistrarCandidato = ApiConection.ServiceUrl + ApiConection.RegistrarCandidato;
  private UrlLoginBolsa = ApiConection.ServiceUrl + ApiConection.LoginBolsa;
  private UrlGetVacantesReclutador = ApiConection.ServiceUrl + ApiConection.GetVacantesReclutador;
  private UrlGetCitas = ApiConection.ServiceUrl + ApiConection.GetCitas;
  private UrlPostularCandidato = ApiConection.ServiceUrl + ApiConection.PostularCandidato;
  private UrlGetTicketsGenerados = ApiConection.ServiceUrl + ApiConection.GetTicketsGenerados;
  private UrlGetRportAtencion = ApiConection.ServiceUrl + ApiConection.GetRportAtencion;

  constructor(private _httpClient: HttpClient, private settings: SettingsService) { }

  GetEstados() :Observable<any>
  {
    let params = new HttpParams().set('PaisId', '42');
    return this._httpClient.get(this.UrlGetEstados, {params: params, headers: this.httpOptions.headers})

  }

  GetMunicipio(estadoId) :Observable<any>
  {
    let params = new HttpParams().set('EstadoId', estadoId);
    return this._httpClient.get(this.UrlGetMunicipioByEstado, {params: params, headers: this.httpOptions.headers})

  }

  RegistrarCandidato(datos) :Observable<any>
  {
    let params = new HttpParams().set('datos', datos);
    return this._httpClient.post(this.UrlRegistrarCandidato, datos, this.httpOptions)
  }

  LoginBolsa(usuario, pass) :Observable<any>
  {
    let params = new HttpParams().set('usuario', usuario).set('pass', pass);
    return this._httpClient.get(this.UrlLoginBolsa, {params: params})
  }
  InsertTicket(ticketId, reclutadorId, modulo) : Observable<any>
  {
    let params = new HttpParams().set('Ticket', ticketId).set('ReclutadorId', reclutadorId).set('ModuloId', modulo);
    return this._httpClient.get(this.UrlInsertTicket, {params: params})
  }

  UpdateStatusTicket(ticketId, estatus, modulo) : Observable<any>
  {
    let params = new HttpParams().set('ticketId', ticketId).set('estatus', estatus).set('moduloId', modulo);
    return this._httpClient.get(this.UrlUpdateStatus, {params:params, headers: this.httpOptions.headers})
  }

  UpdateRequiTicket(ticketId, requisicionId)
  {
    let params = new HttpParams().set('ticketId', ticketId).set('requisicionId', requisicionId);
    return this._httpClient.get(this.UrlUpdateRequiTicket, {params:params, headers: this.httpOptions.headers})
  }

  UpdateCandidatoTicket(ticketId, candidatoId)
  {
    let params = new HttpParams().set('ticketId', ticketId).set('candidatoId', candidatoId);
    return this._httpClient.get(this.UrlUpdateCandidatoTicket, {params:params})
  }

  GetFilaTickets(modulo, reclutador) :Observable<any>
  {
    let params = new HttpParams().set('modulo', modulo).set('reclutadorId', reclutador);
    return this._httpClient.get(this.UrlGetFilaTickets, {params:params, headers: this.httpOptions.headers})

  }
  GetTicketEnAtencion() :Observable<any>
  {
    return this._httpClient.get(this.UrlGetTicketEnAtencion)
  }
  GetTicketsGenerados() :Observable<any>
  {
    return this._httpClient.get(this.UrlGetTicketsGenerados)
  }
  GetRportAtencion() :Observable<any>
  {
    return this._httpClient.get(this.UrlGetRportAtencion)
  }
  GetTicketPrioridad(reclutadorId, modulo) :Observable<any>
  {
    let params = new HttpParams().set('reclutadorId', reclutadorId).set('ModuloId', modulo);
    return this._httpClient.get(this.UrlGetTicketPrioridad, {params: params})
  }
  GetCitas(reclutadorId, modulo) :Observable<any>
  {
    let params = new HttpParams().set('reclutadorId', reclutadorId).set('ModuloId', modulo);
    return this._httpClient.get(this.UrlGetCitas, {params: params})
  }
  GetTicketRecl(ticket, recl) :Observable<any>
  {
     let params = new HttpParams().set('Ticket', ticket).set('ReclutadorId', recl);
    return this._httpClient.get(this.UrlGetTicketRecl, {params: params})

  }

  GetTicketExamen(ticket) :Observable<any>
  {
     let params = new HttpParams().set('Ticket', ticket);
    return this._httpClient.get(this.UrlGetTicketExamen, {params: params})

  }

  PostularCandidato(candidatoId, requisicionId) : Observable<any>
  {
    let params = new HttpParams().set('candidatoId', candidatoId).set('requisicionId', requisicionId);
    return this._httpClient.get(this.UrlPostularCandidato, {params: params})
  }


  GetPostulaciones(candidatoId) : Observable<any>
  {
    let params = new HttpParams().set('candidatoId', candidatoId);
    return this._httpClient.get(this.UrlGetPostulaciones, {params: params})
  }

  GetVacantesReclutador(reclutadorId) : Observable<any>
  {
    let params = new HttpParams().set('reclutadorId', this.settings.user['id'] );
    return this._httpClient.get(this.UrlGetVacantesReclutador, {params: params})
  }


  LiberarCandidato(requi, candidato) : Observable<any>{
    let params = new HttpParams().set('requisicionId', requi).set('candidatoId', candidato);
    return this._httpClient.get(this.UrlLiberarCandidato, {params: params});
  }

  SetEstatusCandidato(candidatoId, requisicionId, estatusId) : Observable<any>{
    let params = new HttpParams().set('candidatoId', candidatoId).set('requisicionId', requisicionId).set('estatusId', estatusId);
    return this._httpClient.get(this.UrlSetEstatusCandidato, {params: params});
  }

  GetVacantes() : Observable<any>
  {
    return this._httpClient.get(this.UrlGetVacantes)
  }

  GetModulos() :Observable<any>
  {
    return this._httpClient.get(this.UrlGetModulos);
  }
  SetExamen(objeto) : Observable<any>
  {
    return this._httpClient.post(this.UrlSetExamen, objeto, this.httpOptions);
  }

  GetTicketConCita(folio) : Observable<any>
  {
    let params = new HttpParams().set('folio', folio);
    return this._httpClient.get(this.UrlGetTicketConCita, {params: params});

  }

  GetTicketSinCita(requisicionId, candidatoId) : Observable<any>
  {
    let params = new HttpParams().set('requisicionId', requisicionId).set('candidatoId', candidatoId );
    return this._httpClient.get(this.UrlGetTicketSinCita, {params: params});

  }

  GetConcurrenciaReporte() : Observable<any>
  {
    return this._httpClient.get(this.UrlGetConcurrenciaReporte);
  }
}
