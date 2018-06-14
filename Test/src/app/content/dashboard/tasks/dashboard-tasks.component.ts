
import { Component, OnInit } from '@angular/core';
import {DashboardTask} from '../../../models/task-dashboard';

@Component({
  selector: 'dashboard-tasks',
  templateUrl: './dashboard-tasks.component.html',
  styleUrls: ['./dashboard-tasks.component.css']
})
export class DashboardTaskComponent implements OnInit {
    tasks: DashboardTask[];
    cols: any[];
    dtOptions: DataTables.Settings = {};

    constructor() {
        this.cols = [
            { field: 'status', header: 'Status', showData:true },
            { field: 'jobCode', header: 'File No.', showData:true},
            { field: 'jobType', header: 'File Details', showData:true},
            { field: 'title', header: 'Task',showData:true },
            { field: 'duedate', header: 'Due Date', showData:true},
        ];
     }

    ngOnInit(): void {
        // this.dtOptions = {
        //         pagingType: 'full_numbers',
        //         scrollY:     '520px',
        //         info : false,
        //         paging:       false,
        //         searching: false,
        //     };
            this.tasks =  [
                { 
                    title: 'Estimation to be done for the job',
                    status: 'upcoming',
                    jobType:'Water',
                    jobCode:'FN_Jhon_W',
                    jobImage:'./assets/images/Water.png',
                    duedate:'01/01/2018' 
                },
                { 
                    title: 'Add Job Note',
                    status: 'current',
                    jobType:'mold',
                    jobCode:'FN_Jockey_M',
                    jobImage:'./assets/images/Mold.png',
                    duedate:'01/12/2018' 
                },
                { 
                    title: 'Mark Completed',
                    status: 'pending',
                    jobType:'Reconstruction',
                    jobCode:'FN_David_R',
                    jobImage:'./assets/images/Reconstruction.png',
                    duedate:'01/20/2018' 
                },
                { 
                    title: 'Contact Customer',
                    status: 'current',
                    jobType:'Content',
                    jobCode:'FN_Mikki_C',
                    jobImage:'./assets/images/Content.png',
                    duedate:'01/26/2018' 
                },
                { 
                    title: 'Arrive Onsite',
                    status: 'pending',
                    jobType:'Asbestos',
                    jobCode:'FN_Toni_A',
                    jobImage:'./assets/images/Asbestos.png',
                    duedate:'01/30/2018' 
                },
                { 
                    title: 'Upload Photos',
                    status: 'current',
                    jobType:'Bio',
                    jobCode:'FN_Jock_B',
                    jobImage:'./assets/images/Bio.png',
                    duedate:'02/03/2018' 
                },
                { 
                    title: 'Upload Certificate of Satisfaction',
                    status: 'pending',
                    jobType:'Water',
                    jobCode:'FN_Arnold_W',
                    jobImage:'./assets/images/Water.png',
                    duedate:'02/12/2018' 
                },
                { 
                    title: 'Upload Work Authorization',
                    status: 'upcoming',
                    jobType:'Mold',
                    jobCode:'FN_Arnold_M',
                    jobImage:'./assets/images/Mold.png',
                    duedate:'02/20/2018' 
                },
                { 
                    title: 'Upload Estimates',
                    status: 'current',
                    jobType:'Reconstruction',
                    jobCode:'FN_Arnold_R',
                    jobImage:'./assets/images/Reconstruction.png',
                    duedate:'03/01/2018' 
                },
                { 
                    title: 'Visit Client place',
                    status: 'current',
                    jobType:'Content',
                    jobCode:'FN_Arnold_C',
                    jobImage:'./assets/images/Content.png',
                    duedate:'03/05/2018' 
                },
                { 
                    title: 'Estimation to be done for the job',
                    status: 'upcoming',
                    jobType:'Water',
                    jobCode:'FN_Rocky_W',
                    jobImage:'./assets/images/Water.png',
                    duedate:'03/10/2018' 
                },
                { 
                    title: 'Add Job Note',
                    status: 'current',
                    jobType:'mold',
                    jobCode:'FN_Rocky_M',
                    jobImage:'./assets/images/Mold.png',
                    duedate:'03/15/2018' 
                },
                { 
                    title: 'Mark Completed',
                    status: 'pending',
                    jobType:'Reconstruction',
                    jobCode:'FN_Rocky_R',
                    jobImage:'./assets/images/Reconstruction.png',
                    duedate:'03/20/2018' 
                },
                { 
                    title: 'Contact Customer',
                    status: 'current',
                    jobType:'Content',
                    jobCode:'FN_Rocky_C',
                    jobImage:'./assets/images/Content.png',
                    duedate:'03/25/2018' 
                },
                { 
                    title: 'Arrive Onsite',
                    status: 'pending',
                    jobType:'Asbestos',
                    jobCode:'FN_Rocky_A',
                    jobImage:'./assets/images/Asbestos.png',
                    duedate:'03/30/2018' 
                },
                { 
                    title: 'Upload Photos',
                    status: 'pending',
                    jobType:'Bio',
                    jobCode:'FN_Rocky_B',
                    jobImage:'./assets/images/Bio.png',
                    duedate:'04/05/2018' 
                },
                { 
                    title: 'Upload Certificate of Satisfaction',
                    status: 'current',
                    jobType:'Water',
                    jobCode:'FN_David_W',
                    jobImage:'./assets/images/Water.png',
                    duedate:'04/10/2018' 
                },
                { 
                    title: 'Upload Work Authorization',
                    status: 'pending',
                    jobType:'Mold',
                    jobCode:'FN_David_M',
                    jobImage:'./assets/images/Mold.png',
                    duedate:'04/20/2018' 
                },
                { 
                    title: 'Upload Estimates',
                    status: 'pending',
                    jobType:'Reconstruction',
                    jobCode:'FN_David_R',
                    jobImage:'./assets/images/Reconstruction.png',
                    duedate:'04/30/2018' 
                },
                { 
                    title: 'Visit Client place',
                    status: 'current',
                    jobType:'Content',
                    jobCode:'FN_David_C',
                    jobImage:'./assets/images/Content.png',
                    duedate:'05/02/2018' 
                },
                { 
                    title: 'Upload Certificate of Satisfaction',
                    status: 'current',
                    jobType:'Water',
                    jobCode:'FN_David_W',
                    jobImage:'./assets/images/Water.png',
                    duedate:'05/05/2018' 
                },
                { 
                    title: 'Upload Photos',
                    status: 'pending',
                    jobType:'Bio',
                    jobCode:'FN_Rocky_B',
                    jobImage:'./assets/images/Bio.png',
                    duedate:'05/15/2018' 
                },
                { 
                    title: 'Upload Certificate of Satisfaction',
                    status: 'current',
                    jobType:'Water',
                    jobCode:'FN_David_W',
                    jobImage:'./assets/images/Water.png',
                    duedate:'05/20/2018' 
                },
                { 
                    title: 'Upload Work Authorization',
                    status: 'pending',
                    jobType:'Mold',
                    jobCode:'FN_David_M',
                    jobImage:'./assets/images/Mold.png',
                    duedate:'05/25/2018' 
                },
                { 
                    title: 'Upload Estimates',
                    status: 'pending',
                    jobType:'Reconstruction',
                    jobCode:'FN_David_R',
                    jobImage:'./assets/images/Reconstruction.png',
                    duedate:'06/05/2018' 
                },
                { 
                    title: 'Visit Client place',
                    status: 'current',
                    jobType:'Content',
                    jobCode:'FN_David_C',
                    jobImage:'./assets/images/Content.png',
                    duedate:'06/15/2018' 
                }
           ];
        

    }

}
