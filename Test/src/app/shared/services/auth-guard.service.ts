import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';import { AuthCheckService } from './auth-check.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor( private authCheckService: AuthCheckService, private router: Router
  ) {}

/*  canActivate() {
    console.log('i am checking to see if you are logged in');
    return true;
  }
  */

 canActivate(): boolean {
//    return this.authCheckService.login();
    
    if (!this.authCheckService.login()) {
      this.router.navigate(['Login']);
      return false;
    }
    return true;

  
  }

  canActivateChild() {
    console.log('checking child route access');
    return true;
  }

}
