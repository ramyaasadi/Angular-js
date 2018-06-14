import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import {HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {APIUrls} from '../../shared/constants/apiurls';
import {TokenValue} from '../../shared/services/httpcall/token.constant';
import {Messages} from '../../shared/constants/messages';

import {ContactDetails} from '../../models/contact-details';


//import {ContactService} from './contact.component.service';

@Component({
  selector: 'common-contacts',
  templateUrl: './contacts.component.html',
  //styleUrls: ['./contacts.component.css']
})
export class ContactsFeatureComponent implements OnInit {
  @Input() contacts: ContactDetails[];
  @Input() refSource:string;
  @Output() updateContact = new EventEmitter<any>();

  display: boolean = false;
  display1: boolean = false;

  showDialog() {
    this.display = true;
}

showDialog1(contact) {
  this.selectedContact=contact;
  this.display1 = true;
}

  graphValues:any;
    i:number;
    contact:any;
    isError:boolean;
    serverErrorMessage:string;
    tempObj:any
    url:string;
    tokenValue:any;
    selectedContact:any;

    constructor(private http: HttpClient ) {
    }

    
    

  ngOnInit():void {
    
  }

  collapsed(event: any): void {
    //console.log(event);
  }
 
  expanded(event: any): void {
    //console.log(event);
  }

  updateContacts($event){
    this.updateContact.emit({
      referredSource: $event.referredSource,
      contacts: $event.contacts
    });
    this.display=false;
  }

}