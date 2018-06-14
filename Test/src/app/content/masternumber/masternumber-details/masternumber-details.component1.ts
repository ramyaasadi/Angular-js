import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';

import {TitleTextService} from '../../../shared/services/titletext.service';
import {APIUrls} from '../../../shared/constants/apiurls';
import {TokenValue} from '../../../shared/services/httpcall/token.constant';
import {Messages} from '../../../shared/constants/messages';
import {MasterNumberData} from '../../../models/masternumber-data';


@Component({
  selector: 'app-masternumberdetails',
  templateUrl: './masternumber-details.component.html',
  styleUrls: ['./masternumber-details.component.css']
})
export class MasterNumberDetailsComponent implements OnInit {
    dtOptions: DataTables.Settings = {
    };
    sub:any;
    id:string;
    url:string;
    myData:any;
    isError:boolean;
    serverErrorMessage:string;
    masterNumberData: MasterNumberData;
    parameterID:string;

    display: boolean = false;
    showDialog() {
      this.display = true;
  }
  scroll(el) {
    //alert('scroll');
    el.scrollIntoView();
}

 constructor(private data: TitleTextService, private route: ActivatedRoute, private http: HttpClient) {}

    ngOnInit() {
      this.dtOptions = {
        pagingType: 'full_numbers',
        order:[],
      }
     this.sub = this.route.params.subscribe(params => {
     this.id = params['id']});
     this.parameterID=this.id;
     //this.data.changeMessage("Master Number: "+"   "+this.id);

 //    ?mastNumHash=840198

    let getParams = new HttpParams().set('mastNumHash', this.parameterID);
    console.log('In master number', this.parameterID);
    this.url =APIUrls.hosturl+APIUrls.MasterNumberDetails
    this.http.get(this.url,{params:getParams})
      .subscribe(data=>{
          this.myData = data;
          console.log("In Master Details ",data);
          this.masterNumberData=this.myData.masterNumberDetails;
          this.data.changeMessage("Master Job Number: "+"   "+this.masterNumberData.mastNumCode);
          console.log("After assignment ",this.masterNumberData);
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





}
