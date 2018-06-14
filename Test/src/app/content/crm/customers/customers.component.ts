import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

// import {TitleTextService} from '../../../shared/services/titletext.service';
import {MainCustomers} from '../../../models/main-customers';



@Component({
  selector: 'app-crm-customer',
  templateUrl: './customers.component.html',
})


export class CrmCustomersComponent implements OnInit {
    customers: MainCustomers[];
    display: boolean = false;
    showDialog(){
        this.display = true;
      }
    cols: any[];
  constructor(private router: Router, private route: ActivatedRoute) {
    this.cols = [
        { field: 'status', header: 'Status', showData:true },
        { field: 'customerName', header: 'Customer Name', showData:true },
        { field: 'propertyType', header: 'Property Type', showData:true },
        { field: 'address', header: 'Address', showData:true},
        { field: 'city', header: 'City', showData:true},
        { field: 'state', header: 'State', showData:true},
        { field: 'zip', header: 'Zip', showData:true},
        { field: 'phoneNumber', header: 'Phone Number', showData:true},
        { field: 'salesRepresentative', header: 'Sales Representative', showData:true },
        // { field: 'activity', header: 'Activities', showData:true},
        // { field: 'jobImage', header: 'Job List', showData:true}
    ];
  }
 
  ngOnInit(): void {
        this.customers = [
            {
                status:'New',
                customerName:'Bennett',
                propertyType:'Residential',
                address:'3961 Junkins Avenue',
                city:'Valdosta',
                state:'Georgia',
                zip:'31601',
                phoneNumber:'229-630-1556',
                salesRepresentative:'Matthew Craig',
                activity:'./assets/images/activity.png',
                // jobCount:'2',
                // jobImage:'./assets/images/water.png',
                // jobType:'Water',
            },
            {
                status:'On-Hold',
                customerName:'Nichols',
                propertyType:'Commercial',
                address:'4906 Boone Street',
                city:'Corpus Christi',
                state:'Texas',
                zip:'78415',
                phoneNumber:'361-225-2363',
                salesRepresentative:'Cristina Carpenter',
                activity:'./assets/images/activity.png',
                // jobCount:'3',
                // jobImage:'assets/images/mold.png',
                // jobType:'Mold',
            },
            {
                status:'Closed',
                customerName:'Toms',
                propertyType:'Commercial',
                address:'591 Timberbrook Lane',
                city:'Grand Junction',
                state:'Colorado',
                zip:'81501',
                phoneNumber:'970-255-2263',
                salesRepresentative:'Hazel Johnston',
                activity:'./assets/images/activity.png',
                // jobCount:'4',
                // jobImage:'assets/images/content.png',
                // jobType:'Content',
            },
            {
                status:'In-Progress',
                customerName:'Turner',
                propertyType:'Residential',
                address:'3183 Short Street',
                city:'Austin',
                state:'Texas',
                zip:'78723',
                phoneNumber:'512-933-7186',
                salesRepresentative:'Shane James',
                activity:'./assets/images/activity.png',
                // jobCount:'5',
                // jobImage:'assets/images/recon.png',
                // jobType:'Reconnection',
            }
        ]
    }

}
