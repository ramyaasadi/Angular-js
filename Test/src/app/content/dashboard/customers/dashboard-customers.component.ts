import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';


import {DashboardCustomers} from '../../../models/dashboard-customers';
import {APIUrls} from '../../../shared/constants/apiurls';


@Component({
  selector: 'dashboard-customers',
  templateUrl: './dashboard-customers.component.html',
  styleUrls: ['./dashboard-customers.component.css']
})
export class DashboardCustomersComponent implements OnInit {

  DashboardCounts:DashboardCustomers[];
       url:string;
      isError:boolean;
      myData:any;
      name:string;
      value:number;
      dashCust:any;
      dashCst:any[];
      serverErrorMessage:string;
      overAllCount:any;
  constructor(private http: HttpClient ) {
        // this.customers =  [{overallcount:15,currentmonthcount: 9,lastmonthcount: 6,}];
    }
    getCustomers(){
      this.url =APIUrls.hosturl+APIUrls.DashboardCustomersCount;
      this.http.get(this.url)
          .subscribe(data=>{
             this.myData = data;
             this.dashCst = this.myData.dashboardCount;
             this.overAllCount= this.dashCst[0].value+this.dashCst[1].value;
             //console.log(this.overAllCount);
            //  for(let i = 0; i<this.dashCst.length;i++){
            //       this.dashCust = this.dashCst[i];
            //       // this.dashCust.Name = this.dashCust.name;
            //       // this.dashCust.Value = this.dashCust.value;
            //       console.log('Name '+this.dashCust.name)
            //       console.log('Value '+this.dashCust.value)
            //  }
            //  console.log('Name '+this.dashCust[0].name)
          },
            (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                  console.log("Client-side error occured.");
                } else {
                  console.log("Server-side error occured.",err);
                }
              }
          );

    }
  ngOnInit() {
    this.getCustomers();

  }

}
