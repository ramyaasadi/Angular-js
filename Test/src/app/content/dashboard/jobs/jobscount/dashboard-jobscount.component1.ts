import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {APIUrls} from '../../../../shared/constants/apiurls';
import {TokenValue} from '../../../../shared/services/httpcall/token.constant';
import {Messages} from '../../../../shared/constants/messages';


import {DashboardJobService} from './dashboard-jobscount.service';

@Component({
  selector: 'dashboard-jobscount',
  templateUrl: './dashboard-jobscount.component.html',
  styleUrls: ['./dashboard-jobscount.component.css']
})
export class DashboardJobsCountComponent implements OnInit {
    
    //graphValues=[{barName:'Estimation', barValue:'10'},{barName:'In Progress', barValue:'40'},{barName:'Final Stage', barValue:'60'}];
    
    barBackgroundColor='#c74e78';
     imageSource="assets/images/tpa.png";
    totalValue=0;
    graphName="Files";
    graphValues:any;
    
    private sub: any;
   private id;
    
  i:number;
  jobs:any;
  isError:boolean;
  serverErrorMessage:string
  tempObj:any
  tokenValue:any;
  url:string;
//  [routerLink]="['JobsCount', 'my']"./Content/MasterNumber/my
  
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute, private dashboardJobService:DashboardJobService) { 
         this.getJobs();
        
  }
    getJobs() {
        this.graphValues = []
    this.totalValue=0;
    this.isError=false;
    this.tokenValue = new TokenValue().getToken;

  //  const headers = new HttpHeaders().set('Authorization', this.tokenValue);
    this.url =APIUrls.hosturl+APIUrls.DashboardJobsCount;
    this.http.get(this.url)
        .subscribe(data=>{
          this.jobs=data;
            for (this.i = 0; this.i < this.jobs.dashboardCount.length; this.i++) {
                this.tempObj = this.jobs.dashboardCount[this.i];
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
  

  ngOnInit() {}
}