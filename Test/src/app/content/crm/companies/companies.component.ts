import { Component, OnInit } from '@angular/core';
import {CompaniesList} from '../../../models/companieslist';

@Component({
    selector: 'app-companies',
    templateUrl: './companies.component.html',
  })

  export class CompaniesListComponent implements OnInit {
    companies: CompaniesList[];
    display: boolean = false;
    display1: boolean = false;
    display2: boolean = false;
    showDialog(){
        this.display = true;
      }
      showDialog1(){
        this.display1 = true;
      }
      showDialog2(){
        this.display2 = true;
      }
    cols: any[];
    constructor(){
        this.cols = [
            { field: 'name', header: 'Company Name', showData:true},
            { field: 'address', header: 'Address', showData:true },
            { field: 'phoneNo', header: 'Phone Number', showData:true },
            { field: 'fax', header: 'Fax',showData:true },
            { field: 'billingaddress', header: 'Billing Address', showData:true},
            { field: 'salesrep', header: 'Sales Representative', showData:true},
            { field: 'addemp', header: 'Add Employee', showData:true},
        ];
    }
    ngOnInit(): void{
        this.companies =  [
            { 
                name:'Odin Limited',
                address:'611 Rhapsody Street, Howey In The Hills, FL 34737',
                //jobImage:'./assets/images/Water.png',
                phoneNo:'5343636689',
                fax:'6778003599',
                billingaddress:'611 Rhapsody Street, Howey In The Hills, FL 34737',
                addemp:'./assets/images/add-emp.png',
                salesrep:'Matthew Craig',
            },
            { 
                name:'Dream Coms',
                address:'3148 Godfrey Road New York, NY 10038',
                //jobImage:'./assets/images/Water.png',
                phoneNo:'0866578995',
                fax:'6865888888',
                billingaddress:'3148 Godfrey Road New York, NY 10038',
                addemp:'./assets/images/add-emp.png',
                salesrep:'Cristina Carpenter',
            },
            { 
                name:'Antelligence',
                address:'4877 Public Works Drive Chattanooga, TN 37421',
                //jobImage:'./assets/images/Water.png',
                phoneNo:'4568589355',
                fax:'3463489683698',
                billingaddress:'4877 Public Works Drive Chattanooga, TN 37421',
                addemp:'./assets/images/add-emp.png',
                salesrep:'Hazel Johnston',
            },
            { 
                name:'Griffinstar',
                address:'703 Sand Fork Road South Bend, IN 46625',
                //jobImage:'./assets/images/Water.png',
                phoneNo:'5688863379',
                fax:'6698925258888',
                billingaddress:'703 Sand Fork Road South Bend, IN 46625',
                addemp:'./assets/images/add-emp.png',
                salesrep:'Shane James',
            }
       ];
    }
  }