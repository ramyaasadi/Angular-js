import { Component, OnInit } from '@angular/core';
import {WarmleadsList} from '../../../models/warmleadslist';

@Component({
    selector: 'app-warmleads',
    templateUrl: './warmleads.component.html',
  })

  export class WarmleadsListComponent implements OnInit {
    warmleads: WarmleadsList[];
    display: boolean = false;
    display1: boolean = false;
    showDialog(){
        this.display = true;
      }
      showDialog1(){
        this.display1 = true;
      }
    cols: any[];
    constructor(){
        this.cols = [
            { field: 'masterjobno', header: 'Master Job No', showData:true},
            { field: 'name', header: 'Name', showData:true },
            { field: 'leadtype', header: 'Lead Type', showData:true },
            { field: 'address', header: 'Address',showData:true },
            { field: 'phonenumber', header: 'Phone Number', showData:true},
            { field: 'fax', header: 'Fax', showData:true},
            { field: 'billingaddress', header: 'Billing Address', showData:true},
            { field: 'notes', header: 'Notes', showData:true},
            { field: 'assignto', header: 'Assigned To', showData:true},
        ];
    }
    ngOnInit(): void{
        this.warmleads =  [
            { 
                masterjobno:'M_Johon_223',
                name:'Lois Russell',
                leadtype:'Individual',
                address:'611 Rhapsody Street, Howey In The Hills, FL 34737',
                phonenumber:'5674574877',
                fax:'6578468887',
                billingaddress:'611 Rhapsody Street, Howey In The Hills, FL 34737',
                notes:'Individual',
                assignto:'./assets/images/add-emp.png',
            },
            { 
                masterjobno:'M_Kele_200',
                name:'Toby Spencer',
                leadtype:'Company',
                address:'611 Rhapsody Street, Howey In The Hills, FL 34737',
                phonenumber:'6747869896',
                fax:'6778003599',
                billingaddress:'611 Rhapsody Street, Howey In The Hills, FL 34737',
                notes:'Company',
                assignto:'./assets/images/add-emp.png',
            },
            { 
                masterjobno:'M_Peley_150',
                name:'Blanca Perry',
                leadtype:'Individual',
                address:'611 Rhapsody Street, Howey In The Hills, FL 34737',
                phonenumber:'6563567836',
                fax:'2566786788',
                billingaddress:'611 Rhapsody Street, Howey In The Hills, FL 34737',
                notes:'Individual',
                assignto:'./assets/images/add-emp.png',
            },
            { 
                masterjobno:'M_Jobsh_250',
                name:'Maria	Torres',
                leadtype:'Company',
                address:'611 Rhapsody Street, Howey In The Hills, FL 34737',
                phonenumber:'3764878658',
                fax:'4364788778',
                billingaddress:'611 Rhapsody Street, Howey In The Hills, FL 34737',
                notes:'Company',
                assignto:'./assets/images/add-emp.png',
            }
       ];
    }
  }