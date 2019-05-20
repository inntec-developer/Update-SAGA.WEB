import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

import { AuthService } from './auth.service';
import {Injectable} from '@angular/core'
import { Observable } from  'rxjs/Observable'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
      private auth: AuthService
    ){}

    intercept(request: HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>>{
      request = request.clone({
        setHeaders: {
          Authorization : `Bearer ${this.auth.getToken()}`
        }
      });
      return next.handle(request);
    }
}
