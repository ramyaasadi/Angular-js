import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';

import {RolesInfo} from '../../models/roles';
import {APIUrls} from '../../shared/constants/apiurls';

//import {PopupComponent} from '../../common/popup/popup.component';

@Component({
  selector: 'common-roles',
  templateUrl: './roles.component.html'
})
export class RolesComponent implements OnInit {
  display: boolean = false;
  @Input() roles: RolesInfo[];
  
  constructor(private http: HttpClient, private route: ActivatedRoute) { }
  showDialog() {
    this.display = true;
  }

  ngOnInit():void {

  }

}