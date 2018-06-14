import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'dashboard-jobs',
  templateUrl: './dashboard-jobs.component.html',
  styleUrls: ['./dashboard-jobs.component.css']
})
export class DashboardJobsComponent implements OnInit {
    private sub: any;
    private id;
    tabIndex:any;
  
    onTabChange($event){
      //alert('clicked'+$event.index);
      console.log("index: "+$event.index);
     this.tabIndex=$event.index;
     if(this.tabIndex == 0){
      this.router.navigate(['./Content/Dashboard/JobsCount/my']);
     }
     else{
      this.router.navigate(['./Content/Dashboard/JobsCount/all']);
     }
    }

  constructor(private router: Router, private route: ActivatedRoute) { 
        //this.sub = this.route.params.subscribe(params => {this.id = params['id']; console.log("Parameter is "+ this.id);if (typeof this.id == "undefined"){this.router.navigate(['./JobsCount/my'], { relativeTo: this.route });}});
        this.sub = this.route.queryParams.subscribe(params => {
        this.id = params['id']; 
        if (typeof this.id == "undefined"){
            this.router.navigate(['./Content/Dashboard/JobsCount/my']);
         }
         });
  }

  ngOnInit() {}
  
}