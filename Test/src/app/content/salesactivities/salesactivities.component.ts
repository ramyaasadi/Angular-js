import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {TitleTextService} from '../../shared/services/titletext.service';

@Component({
  selector: 'app-salesactivities',
  templateUrl: './salesactivities.component.html',
})

export class SalesActivitiesComponent implements OnInit {

    private sub: any;
    private id;

  constructor(private data: TitleTextService, private router: Router, private route: ActivatedRoute) {
    this.sub = this.route.queryParams.subscribe(params => {
            this.router.navigated = false;
            this.router.navigate([this.router.url]);
            this.id = params['id']; 
            if (typeof this.id == "undefined"){
                this.router.navigate(['./Content/Sales/my']);
            }
        });
  }
 
  ngOnInit(): void {
    this.data.changeMessage("Sales Activities");
    }

}
