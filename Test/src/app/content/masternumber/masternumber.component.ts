
import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {TitleTextService} from '../../shared/services/titletext.service';


@Component({
  selector: 'content-masternumber',
  templateUrl: './masternumber.component.html',
  //styleUrls: ['./masternumber.component.css']
})
export class MasterNumberComponent implements OnInit {
   private sub: any;
    private id;
    tabIndex:any;
   
    onTabChange($event){
      //alert('clicked'+$event.index);
      console.log("index: "+$event.index);
     this.tabIndex=$event.index;
     if(this.tabIndex == 0){
      this.router.navigate(['./Content/MasterNumber/my']);
     }
     else{
      this.router.navigate(['./Content/MasterNumber/all']);
     }
    }

  constructor(private data: TitleTextService, private router: Router, private route: ActivatedRoute) { 
       this.sub = this.route.queryParams.subscribe(params => {
               this.router.navigated = false;
        this.router.navigate([this.router.url]);
        this.id = params['id']; 
        if (typeof this.id == "undefined"){
            this.router.navigate(['./Content/MasterNumber/my']);
        }
    });
  
  }
    
    
 
    ngOnInit() {
      this.data.changeMessage("Master Job Number");
   
    }

}