import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { JwtHelperService } from '@auth0/angular-jwt';

//import { User } from './user';

@Injectable()
export class AuthCheckService {
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  jwtToken:string;

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor( private router: Router, private jwtHelper:JwtHelperService) {}

  login(){
        //this.router.navigate(['/']);

       return this.getCheckUserLogin(); 

 //    if (this.getCheckUserLogin()){
 //        this.loggedIn.next(true);
   //      this.router.navigate(['/Dashboard']);
  //    }
  }

  logout() {                            // {4}
    this.loggedIn.next(false);
    this.router.navigate(['/Login']);
  }

    getCheckUserLogin() {
      
      try{
        this.jwtToken='invalid'
        this.jwtToken=localStorage.getItem("jwtToken");
        if (this.jwtToken==null){
            return false;
        }else{
            //return this.jwtHelper.isTokenExpired(this.jwtToken);
            return true;
        }
      }
      catch(Error){
          return false;
      }

}
}