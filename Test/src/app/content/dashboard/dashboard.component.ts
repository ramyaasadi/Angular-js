import { Component,OnInit } from '@angular/core';

import {TitleTextService} from '../../shared/services/titletext.service';

@Component({
  selector: 'content-dashboard',
  templateUrl: './dashboard.component.html',
  //styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private data:TitleTextService ) { }
  ngOnInit() {
    this.data.changeMessage("Dashboard")
  }
}

