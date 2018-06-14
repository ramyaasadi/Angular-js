import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import * as jwt_decode from "jwt-decode";
import { JwtHelperService } from '@auth0/angular-jwt';
import {Router, ActivatedRoute} from '@angular/router';

import { AlertModule } from 'ngx-bootstrap';

import { NgForm } from '@angular/forms';

import {APIUrls} from '../shared/constants/apiurls';
import {TokenValue} from '../shared/services/httpcall/token.constant';
import {Messages} from '../shared/constants/messages';
import {AuthCheckService} from '../shared/services/auth-check.service';

import {LocationDetails} from '../models/location';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName:string;
  password:string;
  url:string;
  isError:boolean;
  serverErrorMessage:string;
  loginErrorMessage:string;
  tokenInfo:any;
  jwtToken:any;
  userLocations: LocationDetails[];
  authenticationResults: any;
  
  constructor(private http: HttpClient,private authCheckService: AuthCheckService,
               public jwtHelper: JwtHelperService,private router: Router,) { }

    ngOnInit() {
    }

  validateUser(loginForm){
      this.isError=false;

      this.url =APIUrls.hosturl+APIUrls.AuthenticateUser
      this.http.post(this.url, {
              'userName':loginForm.userName,
          'password':loginForm.password
        })
        .subscribe(data=>{
         this.authenticationResults=data;
         this.setUserInfo(); 
       },
        (err: HttpErrorResponse) => {
            this.isError=true;
            this.serverErrorMessage = Messages.ServerErrorMessage;
            if (err.error instanceof Error) {
              console.log("Client-side error occured.");
            } else {
              console.log("Server-side error occured.");
            }
          }
        );
  }

    setUserInfo(){
        if (this.authenticationResults.status=="failure"){
          this.loginErrorMessage=this.authenticationResults.message;
        }else{
          localStorage.setItem("jwtToken",this.authenticationResults.jwt);
          this.userLocations=this.authenticationResults.locations;
          localStorage.setItem("locations",JSON.stringify(this.userLocations));
          
          this.authCheckService.login();
          this.router.navigate(['/Content/Dashboard']);
        }
    }

    getDecodedAccessToken(): any {
      try{
        this.jwtToken=localStorage.getItem("jwtToken1");
        this.tokenInfo= jwt_decode(this.jwtToken);
      }
      catch(Error){
          return null;
      }
    }


}
