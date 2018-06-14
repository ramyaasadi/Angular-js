import { Component, OnInit } from '@angular/core';

import {DashboardTpaJobService} from './dashboard-tpajobs.service';

@Component({
  selector: 'dashboard-tpajobs',
  templateUrl: './dashboard-tpajobs.component.html',
 // styleUrls: ['./dashboard-masternumbers.component.css']
})
export class DashboardMasterTpaJobs implements OnInit {
    
  
    barBackgroundColor='#766799';
     imageSource="assets/images/tpa.png";
    totalValue=11;
    graphName="TPA Files";
    graphValues:any;
    
    i:number;
  tpajobs:any;
  isError:boolean;
  serverErrorMessage:string
  tempObj:any
    
  constructor(private dashboardTpaJobService:DashboardTpaJobService) { 
    this.graphValues=[{barName:'ability resources inc.', barValue:'3'},{barName:'chesterfield resources inc.', barValue:'2'},{barName:'crawford & company', barValue:'6'}];

   //  this.getTpaJobs();
  }
  
   getTpaJobs() {
      this.graphValues = []
      this.isError=false;
      this.tpajobs = this.dashboardTpaJobService.getTpaJobs();

/*            for (this.i = 0; this.i < this.tpajobs.dashboardCount.length; this.i++) {
                     this.tempObj = this.tpajobs.dashboardCount[this.i];
                     this.tempObj.barName = this.tempObj.name;
                     this.tempObj.barValue=this.tempObj.value;
                      this.graphValues[this.i]=this.tempObj;
                      console.log("TpaJobs ", this.tempObj);
           } 
*/
     }

  ngOnInit() {}

}
