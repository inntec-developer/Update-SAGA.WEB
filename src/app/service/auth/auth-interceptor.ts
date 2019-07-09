import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";

import { AuthService } from './auth.service';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { tap } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService
  ) { }

  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   let headers: any;
  //   // Si el usuario está logueado, de lo contrario no adjuntar estos headers
  //   // pues puede que el endpoint que estamos llamando es el Login o Register
  //   // los cuales no requerir que el usuario esté autenticado, sería estupido.
  //   if (sessionStorage.getItem('token')) {
  //       // Adjuntamos los headers a la petición
  //       headers = new HttpHeaders({
  //           'Authorization': 'Bearer ' + sessionStorage.getItem('valation-token'),
  //           'Content-Type': 'application/json',
  //           'Accept': 'application/json'
  //       });
  //   }
  //   const cloneReq = request.clone({headers});

  //   return next.handle(cloneReq);
// }

  intercept(

    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //how to update the request Parameters
    console.log("Init Interceptor");
    const updatedRequest = request.clone({
      headers: request.headers.set("Authorization", "Bearer " + sessionStorage.getItem('valation-token'))
    });
    //logging the updated Parameters to browser's console
    console.log("Before making api call : ", updatedRequest);
    return next.handle(request).pipe(
      tap(
        event => {
          //logging the http response to browser's console in case of a success
          if (event instanceof HttpResponse) {
            console.log("api call success :", event);
          }
        },
        error => {
          //logging the http response to browser's console in case of a failuer
          if (event instanceof HttpResponse) {
            console.log("api call error :", event);
          }
        }
      )
    );
  }
}
