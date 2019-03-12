
import { ApiConection } from './../api-conection.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})


export class SistTicketsService {
  // Url de servicios.
  private UrlInsertTicket = ApiConection.ServiceUrl + ApiConection.InsertTicket;
  private UrlUpdateStatus = ApiConection.ServiceUrl + ApiConection.UpdateStatusTicket;
  private UrlGetFilaTickets = ApiConection.ServiceUrl+ApiConection.GetFilaTickets;
  private UrlGetTicketRecl = ApiConection.ServiceUrl + ApiConection.GetTicketRecl;
  private UrlGetTicketPrioridad = ApiConection.ServiceUrl + ApiConection.GetTicketPrioridad;
  private UrlGetPostulaciones = ApiConection.ServiceUrl + ApiConection.GetPostulaciones;
  private UrlLiberarCandidato = ApiConection.ServiceUrl + ApiConection.LiberarCandidato;
  private UrlGetTicketEnAtencion = ApiConection.ServiceUrl + ApiConection.GetTicketEnAtencion;
  private UrlGetVacantes = ApiConection.ServiceUrl + ApiConection.GetVacantes;
  private UrlSetExamen = ApiConection.ServiceUrl + ApiConection.SetExamen;
  private UrlGetModulos = ApiConection.ServiceUrl + ApiConection.GetModulos;

  constructor(private _httpClient: HttpClient) { }

  InsertTicket(ticketId, reclutadorId, modulo) : Observable<any>
  {
    let params = new HttpParams().set('Ticket', ticketId).set('ReclutadorId', reclutadorId).set('ModuloId', modulo);
    return this._httpClient.get(this.UrlInsertTicket, {params: params})
  }

  UpdateStatusTicket(ticketId, estatus, modulo) : Observable<any>
  {
    let params = new HttpParams().set('ticketId', ticketId).set('estatus', estatus).set('moduloId', modulo);
    return this._httpClient.get(this.UrlUpdateStatus, {params:params})
  }
  GetFilaTickets(cita) :Observable<any>
  {
    let params = new HttpParams().set('cita', cita);
    return this._httpClient.get(this.UrlGetFilaTickets, {params:params})
  
  }
  GetTicketEnAtencion() :Observable<any>
  {

    return this._httpClient.get(this.UrlGetTicketEnAtencion)
  
  }
  GetTicketPrioridad(reclutadorId, modulo) :Observable<any>
  {
    let params = new HttpParams().set('reclutadorId', reclutadorId).set('ModuloId', modulo);
    return this._httpClient.get(this.UrlGetTicketPrioridad, {params: params})
  
  }

  GetTicketRecl(ticket, recl) :Observable<any>
  {
     let params = new HttpParams().set('Ticket', ticket).set('ReclutadorId', recl);
    return this._httpClient.get(this.UrlGetTicketRecl, {params: params})
  
  }

  GetPostulaciones(candidatoId) : Observable<any>
  {
    let params = new HttpParams().set('candidatoId', candidatoId);
    return this._httpClient.get(this.UrlGetPostulaciones, {params: params})
  }

  LiberarCandidato(requi, candidato) : Observable<any>{
    let params = new HttpParams().set('requisicionId', requi).set('candidatoId', candidato);
    return this._httpClient.get(this.UrlLiberarCandidato, {params: params});
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
    return this._httpClient.post(this.UrlSetExamen, objeto, httpOptions);
  }
}
