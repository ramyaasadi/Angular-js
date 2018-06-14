import { Component, OnInit } from '@angular/core';
import {ResotationItems} from '../../../models/restoration';

@Component({
  selector: 'subjob-financial',
  templateUrl: './subjobs-financial.component.html',
})


export class SubJobsFinancialComponent implements OnInit {
  restros:ResotationItems[];
  display: boolean = false;
  display1:boolean = false;
  cols: any[];
  show = false;
  showDialog() {
      this.display = true;
  }
  showDialog1() {
    this.display1 = true;
}
scroll(el) {
  alert('scroll');
  el.scrollIntoView();
}
  constructor() {
    this.cols = [
                  { field: 'area', header: 'Area Name', showData:true},
                  { field: 'item', header: 'Item',showData:true },
                  { field: 'repair', header: 'Repair',showData:true },
                  { field: 'remove', header: 'Remove', showData:true },
                  { field: 'replace', header: 'Replace', showData:true},
                  { field: 'uom', header: 'Units Of Measure', showData:true},
                  { field: 'unitprice', header: 'Unit Price', showData:true},
                  { field: 'totalunts', header: 'Total Units', showData:true},
                  { field: 'totalprice', header: 'Total Price', showData:true}
                ];
  }
 
  ngOnInit(): void {

    this.restros =  [
                        { 
                          area:'Laundry Room',
                          // repair:'Althea M , Jackson',
                          // remove:'95 Kenwood Place',
                          // replace:'Miami',
                          uom:'10',
                          item:'Ceiling',
                          //quty:'3',
                          unitprice:'$20',
                          totalunts:'20',
                          totalprice:'$400'
                        },
                        { 
                          area:'Sub Room',
                          // repair:'Althea M , Jackson',
                          // remove:'95 Kenwood Place',
                          // replace:'Miami',
                          uom:'12',
                          item:'Floor',
                          //quty:'3',
                          unitprice:'$15',
                          totalunts:'15',
                          totalprice:'$225'
                        }
                    ];
    }

}
