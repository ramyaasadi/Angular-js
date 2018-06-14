import { Component, OnInit, Input } from '@angular/core';

import {HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {APIUrls} from '../../shared/constants/apiurls';
import {TokenValue} from '../../shared/services/httpcall/token.constant';
import {Messages} from '../../shared/constants/messages';

import {InsuranceDetails} from '../../models/insurance-details';


@Component({
  selector: 'common-insurance',
  templateUrl: './insurance-summary.component.html',
  //styleUrls: ['./insurancedetails.component.css']
})
export class InsuranceFeatureComponent implements OnInit {
   insurances: InsuranceDetails;
   selfPay: string;
  
  @Input()
  set insurance(insurance: InsuranceDetails){
    this.insurances=insurance;
    if(this.insurances!=null && this.insurances!=undefined){
      this.selfPay="No";
    }
    else{
      this.selfPay="Yes";
    }
  }
   

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

}