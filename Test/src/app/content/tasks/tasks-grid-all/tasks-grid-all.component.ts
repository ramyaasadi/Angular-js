import { Component, OnInit } from '@angular/core';
import {AllTasksList} from '../../../models/all-main-task';

@Component({
    selector: 'task-grid-all',
    templateUrl: './tasks-grid-all.component.html',
    //styleUrls: ['./subjobs-grid.component.css']
  })

  export class AllTasksListComponent implements OnInit {
    taskall: AllTasksList[];
    cols: any[];
    constructor(){
        this.cols = [
            { field: 'status', header: 'Status', showData:true},
            { field: 'subJobCode', header: 'File No', showData:true },
            { field: 'jobImage', header: 'File Details', showData:true },
            { field: 'title', header: 'Task Tile',showData:true },
            { field: 'dueDate', header: 'Due date', showData:true},
            { field: 'responsible', header: 'Reponsible Person', showData:true}
        ];
    }
    ngOnInit(): void{
        this.taskall =  [
            { 
                status:'current',
                subJobCode:'FN_Briggs_12',
                jobImage:'./assets/images/Mold.png',
                title:'Upload Photos',
                dueDate:'13th Feb 2018',
                responsible:'Miles',
            },
            { 
                status:'pending',
                subJobCode:'FN_Lindsey_R',
                jobImage:'./assets/images/Water.png',
                title:'Visit Client place',
                dueDate:'18th Feb 2018',
                responsible:'Kennedy',
            },
            { 
                status:'current',
                subJobCode:'FN_Paul_B',
                jobImage:'./assets/images/Reconstruction.png',
                title:'Add Job Note',
                dueDate:'25th Feb 2018',
                responsible:'Gonzales',
            },
            { 
                status:'pending',
                subJobCode:'FN_Wolfe_C',
                jobImage:'./assets/images/Bio.png',
                title:'Mark Completed',
                dueDate:'30th Mar 2018',
                responsible:'Mccormick',
            }
       ];
    }
  }