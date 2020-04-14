
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


import { ApiConection } from '../api-conection.service';

@Injectable()
export class CatalogoConfiguracionService {
// Url de servicios.
private UrlGeneral = ApiConection.ServiceUrl+ApiConection.getGeneral;
private UrlContrato = ApiConection.ServiceUrl+ApiConection.getContrato;
private UrlPuestoReclutar = ApiConection.ServiceUrl+ApiConection.getPuestoReclutar;
private UrlHorario = ApiConection.ServiceUrl+ApiConection.getHorario;
private Urlsueldo = ApiConection.ServiceUrl+ApiConection.getsueldo;
private UrlOtros = ApiConection.ServiceUrl+ApiConection.getOtros;
private UrlActividad = ApiConection.ServiceUrl+ApiConection.getActividad;
private UrlBeneficio = ApiConection.ServiceUrl+ApiConection.getBeneficio;
private UrlDireccion = ApiConection.ServiceUrl+ApiConection.getDireccion;
private UrlTelefono = ApiConection.ServiceUrl+ApiConection.getTelefono;
private UrlContacto = ApiConection.ServiceUrl+ApiConection.getContacto;
private UrlPsicometria = ApiConection.ServiceUrl+ApiConection.getPsicometria;
private UrlDocumento = ApiConection.ServiceUrl+ApiConection.getDocumento;
private UrlProceso = ApiConection.ServiceUrl+ApiConection.getProceso;
private UrlCopetencia = ApiConection.ServiceUrl+ApiConection.getCopetencia;
private UrlUbicacion = ApiConection.ServiceUrl+ApiConection.getUbicacion;
private UrlgetCampos = ApiConection.ServiceUrl+ApiConection.getCampos;
private UrlgetClasificaciones = ApiConection.ServiceUrl+ApiConection.getClasificaciones;




constructor(private http: HttpClient) {  }

getGeneral(RequiID:string): Observable<any> {
   return this.http.get(this.UrlGeneral + '?Requi='+RequiID);
}

getContrato(RequiID:string): Observable<any> {
   return this.http.get(this.UrlContrato + '?Requi='+RequiID);
}

getPuestoReclutar(RequiID:string): Observable<any> {
   return this.http.get(this.UrlPuestoReclutar + '?Requi='+RequiID);
}

getHorario(RequiID:string): Observable<any> {
   return this.http.get(this.UrlHorario + '?Requi='+RequiID);
}

getsueldo(RequiID:string): Observable<any> {
   return this.http.get(this.Urlsueldo + '?Requi='+RequiID);
}

getOtros(RequiID:string): Observable<any> {
   return this.http.get(this.UrlOtros + '?Requi='+RequiID);
}


getActividad(RequiID:string): Observable<any> {
   return this.http.get(this.UrlActividad + '?Requi='+RequiID);
}

getDireccion(RequiID:string): Observable<any> {
   return this.http.get(this.UrlDireccion + '?Requi='+RequiID);
}

getTelefono(RequiID:string): Observable<any> {
   return this.http.get(this.UrlTelefono + '?Requi='+RequiID);
}

getBeneficio(RequiID:string): Observable<any> {
   return this.http.get(this.UrlBeneficio + '?Requi='+RequiID);
}

getContacto(RequiID:string): Observable<any> {
   return this.http.get(this.UrlContacto + '?Requi='+RequiID);
}

getPsicometria(RequiID:string): Observable<any> {
   return this.http.get(this.UrlPsicometria + '?Requi='+RequiID);
}

getDocumento(RequiID:string): Observable<any> {
   return this.http.get(this.UrlDocumento + '?Requi='+RequiID);
}

getProceso(RequiID:string): Observable<any> {
   return this.http.get(this.UrlProceso + '?Requi='+RequiID);
}

getCopetencia(RequiID:string): Observable<any> {
   return this.http.get(this.UrlCopetencia + '?Requi='+RequiID);
}

getUbicacion(RequiID:string): Observable<any> {
   return this.http.get(this.UrlUbicacion + '?Requi='+RequiID);
}

getCampos(): Observable<any> {
   return this.http.get(this.UrlgetCampos);
}

getClasificaciones(): Observable<any> {
   return this.http.get(this.UrlgetClasificaciones);
}

}
