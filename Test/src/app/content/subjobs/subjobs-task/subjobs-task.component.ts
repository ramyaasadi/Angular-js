import { Component, OnInit } from '@angular/core';
import {SubJobTask} from '../../../models/subjobs-task';

@Component({
  selector: 'subjob-tasks',
  templateUrl: './subjobs-task.component.html',
})


export class SubJobsTaskComponent implements OnInit {
    subtasks: SubJobTask[];
    dtOptions: DataTables.Settings = {};
  constructor() {
  }
 
  ngOnInit(): void {
    this.dtOptions = {
        pagingType: 'full_numbers',
        scrollY:     '230px',
        info : false,
        paging:       false,
        searching: false,
    //    pageLength: 2
    };

    this.subtasks =  [
        { 
            title: 'Estimation to be done for the job',
            status: 'upcoming',
            jobType:'Water',
            ownerName:'Warner',
            //jobImage:'./assets/images/water.png',
            duedate:'01/01/2018' 
        },
        { 
            title: 'Add Job Note',
            status: 'current',
            jobType:'mold',
            ownerName:'Adams',
            //jobImage:'./assets/images/mold.png',
            duedate:'01/05/2018' 
        },
        { 
            title: 'Mark Completed',
            status: 'pending',
            jobType:'Recon',
            ownerName:'Jay',
            //jobImage:'./assets/images/recon.png',
            duedate:'01/10/2018' 
        },
        { 
            title: 'Contact Customer',
            status: 'current',
            jobType:'Content',
            ownerName:'Dean',
            //jobImage:'./assets/images/content.png',
            duedate:'01/15/2018' 
        },
        { 
            title: 'Arrive Onsite',
            status: 'pending',
            jobType:'Asbestos',
            ownerName:'Miles',
            //jobImage:'./assets/images/asbestos.png',
            duedate:'01/20/2018' 
        },
        { 
            title: 'Contact Customer',
            status: 'current',
            jobType:'Content',
            ownerName:'Adams',
            //jobImage:'./assets/images/content.png',
            duedate:'01/25/2018' 
        },
        { 
            title: 'Mark Completed',
            status: 'pending',
            jobType:'Asbestos',
            ownerName:'Wolfe',
            //jobImage:'./assets/images/asbestos.png',
            duedate:'02/01/2018' 
        },
        { 
            title: 'Upload Photos',
            status: 'pending',
            jobType:'Asbestos',
            ownerName:'Gretchen',
            //jobImage:'./assets/images/asbestos.png',
            duedate:'02/05/2018' 
        },
        { 
            title: 'Contact Customer',
            status: 'current',
            jobType:'Content',
            ownerName:'Kelvin',
            //jobImage:'./assets/images/content.png',
            duedate:'02/10/2018' 
        },
        { 
            title: 'Upload Certificate of Satisfaction',
            status: 'pending',
            jobType:'Asbestos',
            ownerName:'Lucas',
            //jobImage:'./assets/images/asbestos.png',
            duedate:'02/20/2018' 
        }
   ];

    }

}
