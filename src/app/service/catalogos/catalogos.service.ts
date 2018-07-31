import { Http, Response, RequestOptions, Headers, HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

import { ApiConection } from '../api-conection.service';


@Injectable()
export class CatalogosService {

  private urlGetDocumentosDamsa = ApiConection.ServiceUrl + ApiConection.GetDocumentosDamsa;
  private urlGetPrestacionesLey = ApiConection.ServiceUrl + ApiConection.GetPrestacionesLey;
  private UrlGetPrioridades = ApiConection.ServiceUrl + ApiConection.GetPrioridades;
  private UrlGetEstatusRequi = ApiConection.ServiceUrl + ApiConection.GetEstatusRequi;

  constructor(private http: Http) { }

  getDocumentosDamsa() : Observable<any>{
    return this.http.get(this.urlGetDocumentosDamsa)
      .map(result => result.json())
      .catch(this.handleError);
  }

  getPrestacionesLey() : Observable<any>{
    return this.http.get(this.urlGetPrestacionesLey)
      .map(result => result.json())
      .catch(this.handleError);
  }

  getPrioridades() : Observable<any>{
    return this.http.get(this.UrlGetPrioridades)
      .map(result => result.json())
      .catch(this.handleError);
  }

  getEstatusRequi(tipoMov : number) : Observable<any>{
    return this.http.get(this.UrlGetEstatusRequi + tipoMov)
      .map(result => result.json())
      .catch(this.handleError);
  }






  /*********************TOMA EL ERROR ¡DEJAR ESTA SECCION DE CODIGO EN LA PARTE FINAL! *********************************************/
  //Muestra un error en consola y regresa el mismo al Frond-End en caso de que se genere el mismo.
  public handleError(error: any ){
    console.log('Error Internar Server', error);
    if(error instanceof Response){
      return Observable.throw(error.json().error || 'Back-End server error');
    }
    return Observable.throw(error || 'Back-End server error');
  }

}
