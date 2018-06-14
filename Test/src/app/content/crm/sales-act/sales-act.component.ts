import { Component, OnInit } from '@angular/core';

import {SalesActivesGrid} from '../../../models/salesactivities-my';


@Component({
  selector: 'app-crm-salesact',
  templateUrl: './sales-act.component.html',
})


export class CrmSalesActivitiesComponent implements OnInit {
    saleActs : SalesActivesGrid[];
    cols: any[];
  constructor() {
    this.cols = [
        { field: 'status', header: 'Status', showData:true},
        { field: 'activityName', header: 'Activity Name', showData:true},
        { field: 'type', header: 'Type',showData:true },
        { field: 'schdttm', header: 'Scheduled Date & TIme', showData:true },
        // { field: 'salesrepren', header: 'Sales Representative', showData:true},
        { field: 'description', header: 'Description', showData:true},
        { field: 'updtimg', header: 'Edit', showData:true},
    ];
  }

  display: boolean = false;
    showDialog() {
      this.display = true;
  }
  display1: boolean = false;
    showDialog1() {
      this.display1 = true;
  }
 
  ngOnInit(): void {
            this.saleActs =  [
                { 
                    status:'Pending',
                    activityName:'Pipe Change',
                    type:'Call',
                    schdttm:'20th Mar 2018',
                    // salesrepren:'Yates',
                    description:'Yet to Discuss',
                    updtimg:'./assets/images/edit_icon.png',
                    
                },
                { 
                    status:'Pending',
                    activityName:'Bricks',
                    type:'T-Con',
                    schdttm:'14th Mar 2018',
                    // salesrepren:'Barber',
                    description:'How Many Bricks are required',
                    updtimg:'./assets/images/edit_icon.png',
                    
                }
        ];
    }

}
