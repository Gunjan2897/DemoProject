import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token=JSON.parse(localStorage.getItem('token')) 
    
    let tokenReq=request.clone({
      setHeaders:{

        'Authorization':`Bearer ${token}`
      }
    })
    return next.handle(tokenReq);
  }
}
