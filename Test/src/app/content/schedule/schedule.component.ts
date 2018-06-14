import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {TitleTextService} from '../../shared/services/titletext.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
})

export class SchedulesComponent implements OnInit {

    private sub: any;
    private id;

    events1: any[];
    header: any;

  constructor(private data: TitleTextService, private router: Router, private route: ActivatedRoute) {
    this.sub = this.route.queryParams.subscribe(params => {
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
        this.id = params['id']; 
        if (typeof this.id == "undefined"){
            this.router.navigate(['./Content/Schedule/Resource']);
        }
    });
  }
 
  ngOnInit(): void {
    this.data.changeMessage("Schedule");

    this.header = {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    };
    this.events1=[
      {
          "id": 1,
          "title": "Centrifugal Air Mover - 762926",
          "start": "2018-03-06"
      },
      {
          "id": 2,
          "title": "Floor and Cavity Drying - 464564",
          "start": "2018-03-09",
          "end": "2018-03-09"
      },
      {
        "id": 3,
        "title": "Centrifugal Air Mover - 762926",
        "start": "2018-03-12"
       },
       {
           "id": 4,
           "title": "Rescue Mat System - 435545",
           "start": "2018-03-14"
       },
      {
          "id": 5,
          "title": "InterAir Drying System - 7629052",
          "start": "2018-03-19T11:00:00",
          "end": "2018-03-19T12:00:00"
      },
      {
          "id": 6,
          "title": "Rescue Mat System - 435545",
          "start": "2018-03-23T04:00:00"
      },
      {
          "id": 7,
          "title": " Portable Power Distribution Center  - 7629052",
          "start": "2018-03-27T11:00:00",
          "end": "2018-03-27T12:00:00"
      },
      {
          "id": 8,
          "title": "Air Scrubber - 435545",
          "start": "2018-03-30T04:00:00"
      }
  ];

    }

}


export class MyEvent {
  id: number;
  title: string;
  start: string;
  empname:string;
  desg:string;
  eqpmodel:string;
  eqpcode:string;
  end: string;
  allDay: boolean = true;
}
