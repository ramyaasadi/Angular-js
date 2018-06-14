
import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';


@Injectable()
export class HttpCallService  {

  constructor (private http: HttpClient) {
      
    }

    get(url){

      const headers = new HttpHeaders().set('Authorization','nyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1MTk1NjAzMzcsImxhc3ROYW1lIjoiQ2hlbm51cGF0aSIsImVtYWlsIjoicmFtYWRldmkuY2hlbm51cGF0aUB3aXNzZW5pbmZvdGVjaC5jb20iLCJ1c2VySWQiOjEsImNvbXBhbnkiOjEsInByb2ZpbGVQaWMiOm51bGwsImZpcnN0TmFtZSI6IlJhbWFkZXZpIiwiaWF0IjoxNTE4OTU1NTM3LCJtb2JpbGUiOiI5NjExMTIyNzgyIn0.2CR6VXIpZrmzDKcYLHWi5g7Jz4cZHTvKJMTOveua9gAZmYq6PvrZfELiC7MkWC0cGxKUhQ5sSdEDjZMkUV6wRQ' );
    this.http.get(url, {headers})
        .subscribe(data=>{
//          console.log("IN HTTP CALL ",data);
          return data;          
        });
    }

/*
    request(url: Request, options?: RequestOptionsArgs): Observable<Response> {
     
      let jwttoken:string= 'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1MTkyNzY4ODEsImxhc3ROYW1lIjoiQ2hlbm51cGF0aSIsImVtYWlsIjoicmFtYWRldmkuY2hlbm51cGF0aUB3aXNzZW5pbmZvdGVjaC5jb20iLCJ1c2VySWQiOjEsImNvbXBhbnkiOjEsInByb2ZpbGVQaWMiOm51bGwsImZpcnN0TmFtZSI6IlJhbWFkZXZpIiwiaWF0IjoxNTE4NjcyMDgxLCJtb2JpbGUiOiI5NjExMTIyNzgyIn0.55uyukNcuUIj2tiyMltyYAuIKyKzqAvxvjlhEnyZ9-UHnc_VMEzhd_bt5p04PYVp-CwHOrf6gpyahH3rJ-om8g'
       url.headers.set('Authorization', jwttoken);
          
      return super.request(url, options).catch(this.catchAuthError(this))
      .finally(()=> {this.hideLoader();console.log("In finally request httpcall ... ")});
    }

*/
    private showLoader(): void {

    }

    private hideLoader(): void {

    }


  private catchAuthError (self: HttpCallService) {
    // we have to pass HttpService's own instance here as `self`
    return (res: Response) => {
      console.log("Response Status is .. "+res);
      if (res.status === 401 || res.status === 403) {
        // if not authenticated
        console.log(res);
      }
      return Observable.throw(res);
    };
  }
}

