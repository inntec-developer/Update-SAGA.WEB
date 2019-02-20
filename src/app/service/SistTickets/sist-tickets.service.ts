import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiConection } from '../api-conection.service';
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

  constructor(private _httpClient: HttpClient) { }

  InsertTicket(ticketId, reclutadorId) : Observable<any>
  {
    let params = new HttpParams().set('Ticket', ticketId).set('ReclutadorId', reclutadorId);
    return this._httpClient.get(this.UrlInsertTicket, {params: params})
  }

  UpdateStatusTicket(ticketId) : Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    let params = new HttpParams().set('ticketId', ticketId);
    return this._httpClient.get(this.UrlUpdateStatus, {params:params})
  }
  GetFilaTickets() :Observable<any>
  {
    // let params = new HttpParams().set('ClientId', ClientId).set('RequisicionId', RequisicionId);
    return this._httpClient.get(this.UrlGetFilaTickets)
  
  }

  GetTicketPrioridad(reclutadorId) :Observable<any>
  {
    let params = new HttpParams().set('reclutadorId', reclutadorId);
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
}
