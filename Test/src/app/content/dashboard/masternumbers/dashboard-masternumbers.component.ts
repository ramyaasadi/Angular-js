import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap';

import {DashboardHorizontalGraphCount,DashboardHorizontalGrapValue} from '../../../models/dashboardhorizontalgraphcount';
import {APIUrls} from '../../../shared/constants/apiurls';
import {TokenValue} from '../../../shared/services/httpcall/token.constant';
import {Messages} from '../../../shared/constants/messages';

@Component({
  selector: 'dashboard-masternumbers',
  templateUrl: './dashboard-masternumbers.component.html'
})
export class DashboardMasterNumbersComponent implements OnInit {

    barBackgroundColor='#55ad58';
    imageSource="assets/images/hash-icon.png";
    totalValue=0;
    graphName="Master Jobs";
    graphValues:any;
    i:number;
    masternumbers:any;
    isError:boolean;
    serverErrorMessage:string;
    tempObj:any
    url:string;
    tokenValue:any;

  constructor(private http: HttpClient ) {
    }


	getMasterNumbers() {
    this.graphValues = []
    this.isError=false;
    this.tokenValue = new TokenValue().getToken;

  //  const headers = new HttpHeaders().set('Authorization', this.tokenValue);
    this.url =APIUrls.hosturl+APIUrls.DashboardMasterNumbersCount
    this.http.get(this.url)
        .subscribe(data=>{
          this.masternumbers=data;
            for (this.i = 0; this.i < this.masternumbers.dashboardCount.length; this.i++) {
                this.tempObj = this.masternumbers.dashboardCount[this.i];
                this.tempObj.barName = this.tempObj.name;
                this.tempObj.barValue=this.tempObj.value;
                this.graphValues[this.i]=this.tempObj;
                this.totalValue=this.totalValue+this.tempObj.barValue;
            }
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


  ngOnInit() {
    this.getMasterNumbers();
  }

}
