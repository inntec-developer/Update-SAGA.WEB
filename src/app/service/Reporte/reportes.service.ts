import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ApiConection } from '../api-conection.service';

@Injectable()
export class ReportesService {
  private UrlInforme = ApiConection.ServiceUrl + ApiConection.GetInforme;
  private UrlEmpresa = ApiConection.ServiceUrl + ApiConection.GetEmpresas;
  private UrlUsuario = ApiConection.ServiceUrl + ApiConection.GetUsuario;
  private UrlEstatu = ApiConection.ServiceUrl + ApiConection.GetEstatusRep;
  private UrlOficina = ApiConection.ServiceUrl + ApiConection.GetOficinas;
  private UrlRadial = ApiConection.ServiceUrl + ApiConection.getRadialG;
  private UrlProActividad = ApiConection.ServiceUrl + ApiConection.GetProActividad;
  private UrlDetalleReclu = ApiConection.ServiceUrl + ApiConection.GetDetalleReclu;
  private UrlDetalleCordi = ApiConection.ServiceUrl + ApiConection.GetDetalleCordi;
  private UrlCoordinacion = ApiConection.ServiceUrl + ApiConection.GetCoordinacion;
  private UrlCandidato = ApiConection.ServiceUrl + ApiConection.GetCandidatoRep;
  private UrlVacante = ApiConection.ServiceUrl + ApiConection.GetVacanteReporte;
  private UrlClientes = ApiConection.ServiceUrl + ApiConection.GetClientesReporte;
  private UrlMapaFolios = ApiConection.ServiceUrl + ApiConection.GetEstadosFolios;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('validation-token')
    })
  };
  constructor(private _httpClient: HttpClient) {  }
//   private handleError(error: any) {
//     console.log('sever error:', error);
//     if (error instanceof Response) {
//         return Observable.throw(error.json().error || 'backend server error');
//     }
//     return Observable.throw(error || 'backend server error');
// }

getMapaFolios(): Observable<any> {
    // return this.http.get(this.UrlMapaFolios)
    // .map(result => result.json())
    // .catch(this.handleError);
     return this._httpClient.get(this.UrlMapaFolios);
    }

getClientes(fini: string, ffin: string, bandera: string): Observable<any> {
    const params = new HttpParams().set('fini', fini).set('ffin', ffin).set('bandera', bandera);
    return this._httpClient.get(this.UrlClientes, {params: params});
    }

getVacante(cliente: string, cordina: string): Observable<any> {
    const params = new HttpParams().set('cliente', cliente).set('coordina', cordina);
    return this._httpClient.get(this.UrlVacante, {params: params});
    }

  getProActividad(fini: string, ffin: string, recl: string, cor: string): Observable<any> {
    const params = new HttpParams().set('fini', fini).set('ffin', ffin).set('recl', recl).set('cor', cor);
    return this._httpClient.get(this.UrlProActividad, {params: params});
    // return this.http.get(this.UrlProActividad)
    //     .map(result => result.json())
    //     .catch(this.handleError);
    }

    getDetalleReclu(fini:string,ffin:string,recl:string,cor:string): Observable<any> {
        let params = new HttpParams().set('fini', fini).set('ffin', ffin).set('recl', recl).set('cor', cor);
        return this._httpClient.get(this.UrlDetalleReclu, {params: params});
        }

    getCoordinacion(fini:string,ffin:string,stus:string): Observable<any> {
    let params = new HttpParams().set('fini', fini).set('ffin', ffin).set('stus', stus);
    return this._httpClient.get(this.UrlCoordinacion, {params: params});
    }
    
    getDetalleCordi(fini:string,ffin:string,aprob:string,cor:string): Observable<any> {
    let params = new HttpParams().set('fini', fini).set('ffin', ffin).set('aprob', aprob).set('cor', cor);
    return this._httpClient.get(this.UrlDetalleCordi, {params: params});
    }

    getCandidatos(source): Observable<any> {
        // let params = new HttpParams().set('fini', fini).set('ffin', ffin)
        // .set('edad', edad).set('genero', genero).set('estadoID', estadoID).set('estatus',estatus);
        return this._httpClient.post(this.UrlCandidato, source, this.httpOptions);
        }

getVRadial(data: any): Observable<any> {
    let params = new HttpParams().set('usuario', data);
    return this._httpClient.get(this.UrlRadial, {params: params});
  }


// GetInforme(clave: string, ofc: string, tipo: string, fini: string, ffin: string, emp: string,
//     sol: string, trcl: string, cor: string, stus: string, recl: string, usercor: string, usuario: string):
//     Observable<any> {
//     return this._httpClient.get(
//         this.UrlInforme + '?clave=' + clave + '&ofc=' + ofc + '&tipo=' + tipo + '&fini=' + fini
//       + '&ffin=' + ffin + '&emp=' + emp + '&sol=' + sol + '&trcl=' + trcl + '&cor=' + cor + '&stus='
//       + stus + '&recl=' + recl + '&usercor=' + usercor + '&usuario=' + usuario
//     );
// }

GetInforme(source: any): Observable<any> {
  // const params = new HttpParams().set('source', source);
  return this._httpClient.post(this.UrlInforme, source, this.httpOptions);
}
GetEmpresas(): Observable<any> {
return this._httpClient.get(this.UrlEmpresa);
}

GetUsuario(cor: string): Observable<any> {
return this._httpClient.get(this.UrlUsuario + '?cor=' + cor);
}

GetEstatusRep(bandera: string): Observable<any> {
return this._httpClient.get(this.UrlEstatu + '?bandera=' + bandera);
}

// SetDetalle(RequiID:string,Idcampo:number,detalle:boolean): Observable<any> {
//   return this.http.get(this.UrlInforme + '?Requi='+RequiID+'&Idcampo='+Idcampo+'&detalle='+detalle)
//       .map(result => result.json())
//       .catch(this.handleError);
//   }
}
