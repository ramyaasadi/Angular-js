import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions} from '@angular/http';
import {HttpHeaders} from '@angular/common/http';
import {HttpClientModule } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import {HttpCallService} from '../../../shared/services/httpcall/httpcall.service';
import {APIUrls} from '../../../shared/constants/apiurls';

@Injectable()
export class DashboardCustomerService {
    constructor (private http: HttpCallService) {}

  getCustomers() {

    return this.http.get(APIUrls.hosturl+APIUrls.DashboardCustomersCount);
      
}


    private extractData(res:Response) {
            let body = res.json();
            return body || [];
        }

    private handleError(error:any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }


}
