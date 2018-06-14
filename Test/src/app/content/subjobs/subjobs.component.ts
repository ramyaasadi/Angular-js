import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {TitleTextService} from '../../shared/services/titletext.service';




@Component({
  selector: 'app-subjobs',
  templateUrl: './subjobs.component.html',
  //styleUrls: ['./masternumber.component.css']
})
export class SubJobComponent implements OnInit {
   private sub: any;
   private id;
    
  constructor(private data: TitleTextService, private router: Router, private route: ActivatedRoute) { 
        this.sub = this.route.params.subscribe(params => {
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
        this.id = params['id'];
        if (typeof this.id == "undefined"){
            this.router.navigate(['./Content/SubJobs/my']);
        }
    });
  
  }
 
    ngOnInit() {
      this.data.changeMessage("Files");
    }

}