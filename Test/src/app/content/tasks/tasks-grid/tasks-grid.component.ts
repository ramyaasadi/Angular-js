import { Component, OnInit } from '@angular/core';
import {MainTasksList} from '../../../models/main-task';

@Component({
    selector: 'task-grid',
    templateUrl: './tasks-grid.component.html',
    //styleUrls: ['./subjobs-grid.component.css']
  })

  export class TasksListComponent implements OnInit {
    tasks: MainTasksList[];
    display: boolean = false;
    showDialog(){
        this.display = true;
      }
    cols: any[];
    constructor(){
        this.cols = [
            { field: 'status', header: 'Status', showData:true},
            { field: 'subJobCode', header: 'File No', showData:true },
            { field: 'jobImage', header: 'File Details', showData:true },
            { field: 'title', header: 'Task Tile',showData:true },
            // { field: 'dueDate', header: 'Planned Start date', showData:true},
            // { field: 'dueDate', header: 'Planned End date', showData:true},
            // { field: 'dueDate', header: 'Projected Start date', showData:true},
            // { field: 'dueDate', header: 'Projected End date', showData:true},
            { field: 'dueDate', header: 'Due date', showData:true},
            { field: 'updtImg', header: 'Update', showData:true},
            // {field: 'completedDate', header: 'Completed Date', showData:true},
            // { field: 'customer', header: 'Customer Name', showData:true},
            // { field: 'responsible', header: 'Responsible Person', showData:true},
        ];
    }
    ngOnInit(): void{
        this.tasks =  [
            { 
                status:'pending',
                subJobCode:'FN_jacky_12',
                jobImage:'./assets/images/Water.png',
                title:'Add Job Note',
                dueDate:'10th Feb 2018',
                updtImg:'./assets/images/edit_icon.png',
                // completedDate:'',
                // customer:'Marshall',
                // responsible:'William',
            },
            { 
                status:'current',
                subJobCode:'FN_David_R',
                jobImage:'./assets/images/Mold.png',
                title:'Mark Completed',
                dueDate:'15th Feb 2018',
                updtImg:'./assets/images/edit_icon.png',
                // completedDate:'',
                // customer:'Ballard',
                // responsible:'Chambers',
            },
            { 
                status:'current',
                subJobCode:'FN_Jock_B',
                jobImage:'./assets/images/Bio.png',
                title:'Upload Photos',
                dueDate:'20th Feb 2018',
                updtImg:'./assets/images/edit_icon.png',
                // completedDate:'',
                // customer:'95 Kenwood Place',
                // responsible:'Norris',
            },
            { 
                status:'pending',
                subJobCode:'FN_Arnold_C',
                jobImage:'./assets/images/Reconstruction.png',
                title:'Visit Client place',
                dueDate:'20th Mar 2018',
                updtImg:'./assets/images/edit_icon.png',
                // completedDate:'',
                // customer:'Gordon',
                // responsible:'Greer',
            }
       ];
    }
  }