import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'schedule-grid',
  templateUrl: './schedule-grid.component.html',
})

export class ScheduleGridComponent implements OnInit {
    events: any[];
    header: any;

    constructor() {}

    display: boolean = false;
    showDialog() {this.display = true;}
 
  ngOnInit(): void {
    this.header = {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                  };
                  this.events=[
                    {
                        "id": 1,
                        "title": "Dolores	Hall - Maintenance Technician",
                        "start": "2018-03-03T05:00:00"
                    },
                    {
                        "id": 2,
                        "title": "Kelley Sutton - Home Inspector",
                        "start": "2018-03-06"
                    },
                    {
                        "id": 3,
                        "title": "Marilyn Adams - Building Porter",
                        "start": "2018-03-09",
                        "end": "2018-03-09"
                    },
                    {
                        "id": 4,
                        "title": "Eric Wilkins - Floor Technician",
                        "start": "2018-03-12T18:00:00",
                        "end": "2018-03-12T19:00:00"
                    },
                    {
                        "id": 5,
                        "title": "Rosie	Pittman - Maintenance Technician",
                        "start": "2018-03-16T05:00:00"
                    },
                    {
                        "id": 6,
                        "title": "Allen	Mendez - Home Inspector",
                        "start": "2018-03-27T16:00:00"
                    },
                    {
                        "id": 7,
                        "title": "Fannie Lindsey - Building Porter",
                        "start": "2018-03-30",
                        "end": "2018-03-30"
                    },
                    // {
                    //     "id": 6,
                    //     "title": "Meeting",
                    //     "start": "2018-03-12T10:30:00",
                    //     "end": "2018-03-12T12:30:00"
                    // },
                    // {
                    //     "id": 7,
                    //     "title": "Lunch",
                    //     "start": "2018-03-12T12:00:00"
                    // },
                    // {
                    //     "id": 8,
                    //     "title": "Meeting",
                    //     "start": "2018-03-12T14:30:00"
                    // },
                    // {
                    //     "id": 9,
                    //     "title": "Happy Hour",
                    //     "start": "2018-03-12T17:30:00"
                    // },
                    // {
                    //     "id": 10,
                    //     "title": "Dinner",
                    //     "start": "2018-03-12T20:00:00"
                    // },
                    // {
                    //     "id": 11,
                    //     "title": "Birthday Party",
                    //     "start": "2018-03-13T07:00:00"
                    // },
                    // {
                    //     "id": 12,
                    //     "title": "Click for Google",
                    //     "url": "http://google.com/",
                    //     "start": "2018-03-28"
                    // }
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
