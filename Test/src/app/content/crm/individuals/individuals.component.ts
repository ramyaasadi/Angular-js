import { Component, OnInit } from '@angular/core';
import {IndividualList} from '../../../models/individuallist';

@Component({
    selector: 'app-individuals',
    templateUrl: './individuals.component.html',
  })

  export class IndividualListComponent implements OnInit {
    individuals: IndividualList[];
    display: boolean = false;
    display1: boolean = false;
    showDialog(){
        this.display = true;
      }
    cols: any[];
    constructor(){
        this.cols = [
            { field: 'name', header: 'Name', showData:true},
            { field: 'jobreferred', header: 'Total no.of jobs referred', showData:true },
            { field: 'amountbids', header: 'Amount of bids', showData:true },
            { field: 'amountsales', header: 'Amount of sales',showData:true },
            { field: 'invested', header: 'Invested', showData:true},
            { field: 'spent', header: 'Spent', showData:true},
            { field: 'classification', header: 'Classification', showData:true},
            { field: 'salesrep', header: 'Sales Representative', showData:true},
        ];
    }
    ngOnInit(): void{
        this.individuals =  [
            { 
                name:'Kayla	Weber',
                jobreferred:'5',
                //jobImage:'./assets/images/Water.png',
                amountbids:'$1000',
                amountsales:'$460',
                invested:'$2000',
                spent:'$1500',
                classification:'Gold',
                salesrep:'Matthew Craig',
            },
            { 
                name:'Roman	Park',
                jobreferred:'5',
                //jobImage:'./assets/images/Water.png',
                amountbids:'$1000',
                amountsales:'$460',
                invested:'$2000',
                spent:'$1500',
                classification:'Silver',
                salesrep:'Cristina Carpenter',
            },
            { 
                name:'Nettie Wise',
                jobreferred:'7',
                //jobImage:'./assets/images/Water.png',
                amountbids:'$1000',
                amountsales:'$460',
                invested:'$2000',
                spent:'$1500',
                classification:'Gold',
                salesrep:'Hazel Johnston',
            },
            { 
                name:'Emily	Smith',
                jobreferred:'3',
                //jobImage:'./assets/images/Water.png',
                amountbids:'$1000',
                amountsales:'$460',
                invested:'$2000',
                spent:'$1500',
                classification:'Silver',
                salesrep:'Shane James',
            }
       ];
    }
  }