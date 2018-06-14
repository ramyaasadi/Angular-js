import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {TitleTextService} from '../../../shared/services/titletext.service';

@Component({
  selector: 'salesactivities-new',
  templateUrl: './salesactivities-new.component.html',
})


export class NewSalesActivitiesComponent implements OnInit {
    constructor(private data: TitleTextService, private router: Router, private route: ActivatedRoute) {
    }
   
    display: boolean = false;
    showDialog() {
      this.display = true;
  }

    ngOnInit(): void {
      this.data.changeMessage("New Sales Activities");
      }

  

}
