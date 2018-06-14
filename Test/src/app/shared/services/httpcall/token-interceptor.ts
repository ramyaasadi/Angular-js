import {
   HttpClient,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';

import { Injectable, Injector } from '@angular/core';

import {AuthCheckService} from '../auth-check.service';

//import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {



  private authService: AuthCheckService;

  constructor(private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
      let url= request.url;
      //console.log("URL is ",url);
      if (url=='http://dev.wisseninfotech.com:8081/xcelerate/login'){
          return next.handle(request);
      }else{

        let jwtToken='invalid'
        jwtToken=localStorage.getItem("jwtToken");
        if (jwtToken!=null){
                this.authService = this.injector.get(AuthCheckService); // get it here within intercept
                const authRequest = request.clone({ 
                        setHeaders:{'Authorization': jwtToken }
                  });
              return next.handle(authRequest);
        }
      }
  }

/*
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1MTk3MzEyNTEsImxhc3ROYW1lIjoiSmFpbiIsImVtYWlsIjpudWxsLCJ1c2VySWQiOjEsImNvbXBhbnkiOjEsInByb2ZpbGVQaWMiOm51bGwsImZpcnN0TmFtZSI6IlNhcmFoIiwiaWF0IjoxNTE5MTI2NDUxLCJtb2JpbGUiOm51bGx9.s1mox0W4LUR7s0opYqypPaTc6hSzp6qHZ2HQ3JiWnIXNJy_iYYlsOVdJhqhQeQ4U_zk5a68bBBgtNyDDR2WWRw`
      }
    });

    return next.handle(request);
  }
*/



}