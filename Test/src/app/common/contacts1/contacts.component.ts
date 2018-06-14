import { Component, OnInit, Input } from '@angular/core';

import {ActivatedRoute} from '@angular/router'
import {HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {APIUrls} from '../../shared/constants/apiurls';
import {TokenValue} from '../../shared/services/httpcall/token.constant';
import {Messages} from '../../shared/constants/messages';

import {RolesInfo} from '../../models/roles';
import { ContactDetails } from '../../models/contact-details';


//import {ContactService} from './contact.component.service';

@Component({
  selector: 'common-contacts1',
  templateUrl: './contacts.component.html',
  //styleUrls: ['./contacts.component.css']
})
export class ContactsNewFeatureComponent implements OnInit {
  display: boolean = false;
  @Input() contacts: ContactDetails[];
 

  showDialog() {
    this.display = true;
}


    constructor(private http: HttpClient, private route: ActivatedRoute) { }

    
  ngOnInit():void {
    
  }

}