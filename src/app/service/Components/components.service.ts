import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { ApiConection } from './../api-conection.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ComponentsService {
  private urlGetUserGroup = ApiConection.ServiceUrl + ApiConection.GetUserGroup;

  constructor(private http: Http) { }

  getUserGroup() : Observable<any>{
    return this.http.get(this.urlGetUserGroup)
    .map(result => result.json())
    .catch(this.handleError);
  }




  //Muestra un error en consola y regresa el mismo al Frond-End en caso de que se genere el mismo.
  public handleError(error: any ){
    console.log('Error Internar Server', error);
    if(error instanceof Response){
      return Observable.throw(error.json().error || 'Back-End server error');
    }
    return Observable.throw(error || 'Back-End server error');
  }

}
