import { Component, OnInit, Input } from '@angular/core';

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
  @Input() mastNumHash:string;
  @Input() contactsFor:string;
  contacts: ContactDetails[];

  display: boolean = false;
  display1: boolean = false;

  showDialog() {
    this.display = true;
}

showDialog1() {
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

    constructor(private http: HttpClient ) {
    }

    getContacts() {
      this.graphValues = []
      this.isError=false;
      this.tokenValue = new TokenValue().getToken;
  
    //  const headers = new HttpHeaders().set('Authorization', this.tokenValue);
    //?mastNumHash=840198
    const params = new HttpParams().set('mastNumHash',this.mastNumHash);
    console.log(this.mastNumHash);
      this.url =APIUrls.hosturl+APIUrls.MasterNumberContactDetails
      this.http.get(this.url,{params:params})
          .subscribe(data=>{
            this.contact=data;
            this.contacts=this.contact.contacts;
            console.log(this.contacts);
          },
          (err: HttpErrorResponse) => {
              this.isError=true;
              this.serverErrorMessage = Messages.ServerErrorMessage;
              if (err.error instanceof Error) {
                console.log("Client-side error occured.");
              } else {
                console.log("Server-side error occured.");
              }
            }
          );
   }
    

  ngOnInit():void {
    this.getContacts();
    //this.contacts =  [{ name: 'Naveen kumar',contactno: 9502489585,designation:'Project Manager'}];
  }

  collapsed(event: any): void {
    //console.log(event);
  }
 
  expanded(event: any): void {
    //console.log(event);
  }

}