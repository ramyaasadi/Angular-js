import { Component, OnInit } from '@angular/core';
import {SubJobsGrid} from '../../../models/subjobs-grid';

@Component({
  selector: 'subjob-grid',
  templateUrl: './subjobs-grid.component.html',
  //styleUrls: ['./subjobs-grid.component.css']
})


export class SubJobsGridComponent implements OnInit {
    subJobs: SubJobsGrid[];
 dtOptions: DataTables.Settings = {};
 cols: any[];
  constructor() {
        this.cols = [
                { field: 'Status', header: 'Status', showData:true},
                { field: 'SubJobCode', header: 'File Number',showData:true },
                { field: 'CustomerName', header: 'Customer Name', showData:true },
                { field: 'LossAddress', header: 'Loss Address', showData:true},
                { field: 'City', header: 'City', showData:true},
                { field: 'State', header: 'State', showData:true},
                { field: 'Zip', header: 'Zip', showData:true},
                { field: 'Supervisor', header: 'Supervisor', showData:true},
                { field: 'Estimator', header: 'Estimator', showData:true},
                { field: 'CreatedDTTM', header: 'Created Date & Time',showData:true },
                { field: 'JobImage', header: 'File Details',showData:true},
            ];
  }
 
  ngOnInit(): void {
        //     this.subJobs =  [
        //             { 
        //                     SubJobCode:'FN_Jackson_27_W',
        //                     CustomerName:'Althea M , Jackson',
        //                     LossAddress:'95 Kenwood Place',
        //                     City:'Miami',
        //                     State:'Florida',
        //                     Zip:'33132',
        //                     JobType:'Water',
        //                     JobImage:'./assets/images/water.png',
        //                     Status:'pending',
        //                     Supervisor:'Penny',
        //                     Estimator:'Estimator',
        //                     CreatedDTTM:"02/12/2018 10:00AM"
                        
        //             },
        //             { 
        //                     SubJobCode:'FN_M_Franklin_63_M',
        //                     CustomerName:'Jerrica J , Franklin',
        //                     LossAddress:'1869 Feathers Hooves Drive',
        //                     City:'New York',
        //                     State:'New York',
        //                     Zip:'10011',
        //                     JobType:'Mold',
        //                     JobImage:'./assets/images/mold.png',
        //                     Status:'current',
        //                     Supervisor:'Powell',
        //                     Estimator:'Estimator',
        //                     CreatedDTTM:"02/14/2018 10:00AM"
                        
        //             }
        //        ];
    }

}
