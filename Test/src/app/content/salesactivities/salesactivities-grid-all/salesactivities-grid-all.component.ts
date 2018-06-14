import { Component, OnInit } from '@angular/core';

import {SalesActivesGridAll} from '../../../models/salesactivities-all';


@Component({
  selector: 'salesactivities-grid-all',
  templateUrl: './salesactivities-grid-all.component.html',
})


export class SalesActivitiesGridAllComponent implements OnInit {
    saleActs : SalesActivesGridAll[];
    cols: any[];
  constructor() {
    this.cols = [
        { field: 'status', header: 'Status', showData:true},
        { field: 'activityName', header: 'Activity Name', showData:true},
        { field: 'type', header: 'Type',showData:true },
        { field: 'schdttm', header: 'Scheduled Date & TIme', showData:true },
        { field: 'salesrepren', header: 'Sales Representative', showData:true},
        { field: 'description', header: 'Description', showData:true}
    ];
  }

  display: boolean = false;
    showDialog() {
      this.display = true;
  }
 
  ngOnInit(): void {
            this.saleActs =  [
                { 
                    status:'Pending',
                    activityName:'Pipe Change',
                    type:'Call',
                    schdttm:'20th Mar 2018',
                    salesrepren:'Yates',
                    description:'Yet to Discuss',
                    
                },
                { 
                    status:'Pending',
                    activityName:'Bricks',
                    type:'T-Con',
                    schdttm:'14th Mar 2018',
                    salesrepren:'Barber',
                    description:'How Many Bricks are required',
                    
                }
        ];
    }

}
