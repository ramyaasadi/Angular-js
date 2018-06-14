import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { TitleTextService } from '../../../shared/services/titletext.service';
import { APIUrls } from '../../../shared/constants/apiurls';
import { TokenValue } from '../../../shared/services/httpcall/token.constant';
import { Messages } from '../../../shared/constants/messages';
import { MasterNumberData } from '../../../models/masternumber-data';
import { NotesInfo } from '../../../models/notes';

import {SubJobsGrid} from '../../../models/subjobs-grid';
import {InsuranceDetails} from '../../../models/insurance-details';
import {ContactDetails} from '../../../models/contact-details';
import {Description} from '../../../models/description';
import {FilesPath} from '../../../shared/constants/filespath';
import {GrowlModule,Message} from 'primeng/primeng';
import { DocumentsInfo } from '../../../models/documents';


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
    cols: any[];
    jobImagepath:string = FilesPath.JOBTYPE_ICONS ;
    subJobs: SubJobsGrid[];
    insurances: InsuranceDetails;
    contacts: ContactDetails[];
    notes: NotesInfo[];
    refSource: string;
    description: Description[];
    pictures: DocumentsInfo[];
 
    display: boolean = false;
    msgs: Message[] = [];
    mastNumData: any;
    showDialog() {
      this.display = true;
  }
  scroll(el) {
    //alert('scroll');
    el.scrollIntoView();
}
  
 constructor(private data: TitleTextService, private route: ActivatedRoute, private http: HttpClient) {
   this.cols = [
                { field: 'status', header: 'Current Status', showData:true},
                { field: 'subJobCode', header: 'File Number',showData:true },
                { field: 'jobImage', header: 'File Details',showData:true},
                { field: 'supervisor', header: 'Supervisor', showData:true},
                { field: 'estimator', header: 'Estimator', showData:true},
            ];
 }

    getMasterNumberDetails(){
      let getParams = new HttpParams().set('mastNumHash', this.parameterID);
      this.url =APIUrls.hosturl+APIUrls.MasterNumberDetails
      this.http.get(this.url,{params:getParams})
      .subscribe(data=>{
          this.myData = data;
          this.masterNumberData=this.myData.masterNumberDetails;
          this.data.changeMessage("Master Job Number: "+"   "+this.masterNumberData.mastNumCode);
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

    getMasterNumberDescription(){
      let getParams = new HttpParams().set('mastNumHash', this.parameterID);
      this.url =APIUrls.hosturl+APIUrls.MasterNumberDescription
      this.http.get(this.url,{params:getParams})
      .subscribe(data=>{
          this.myData = data;
          this.description=this.myData.descriptionDetails;
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

    getSubJobs(){
        let getParams = new HttpParams().set('mastNumHash', this.parameterID);
        this.url =APIUrls.hosturl+APIUrls.MasterNumberJobs;
        this.http.get(this.url,{params:getParams})
        .subscribe(data=>{
        this.myData=data;
        this.subJobs=this.myData.jobs;
        //console.log('this count'+this.subJobs.length);
        for (let file of this.subJobs) {
                file.style=file.status.toLowerCase().replace(/ /g,"-");
                file.jobImage=this.jobImagepath+file.jobType+".png";
        }
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
    getInsuranceDetails(){
      const params = new HttpParams().set('mastNumHash',this.parameterID);
      this.url =APIUrls.hosturl+APIUrls.MasterNumberInsuranceDetails;
      this.http.get(this.url,{params:params})
        .subscribe(data=>{
          this.myData=data;
          this.insurances=this.myData.insuranceDetails;
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

    getNotes(){
      const params = new HttpParams().set('mastNumHash',this.parameterID);
      this.url =APIUrls.hosturl+APIUrls.MasterNumberNotes;
      this.http.get(this.url,{params:params})
          .subscribe(data=>{
            this.myData=data;
            this.notes=this.myData.notes;
             for (let note of this.notes) {
                note.jobImage=this.jobImagepath+note.jobType+".png";
            }
            console.log(this.notes);
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

    getContacts() {
      const params = new HttpParams().set('mastNumHash',this.parameterID);
      this.url =APIUrls.hosturl+APIUrls.MasterNumberContactDetails
      this.http.get(this.url,{params:params})
          .subscribe(data=>{
            this.myData=data;
            this.contacts=this.myData.contacts;
            this.refSource=this.myData.referredSource;
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
    ngOnInit() {
      this.dtOptions = {
        pagingType: 'full_numbers',
        order:[],
      }
      this.sub = this.route.params.subscribe(params => {
      this.id = params['id']}); 
      this.parameterID=this.id;
      this.getMasterNumberDetails();
      this.getSubJobs();
      this.getInsuranceDetails();
      this.getContacts();
      this.getMasterNumberDescription();
      this.getNotes();
      this.getPictures();
    }

    updateDescription($event){
      this.mastNumData={};
      this.mastNumData.mastNumId=this.masterNumberData.mastNumId;
      this.mastNumData.description=$event.description;
      this.url=APIUrls.hosturl+APIUrls.SaveMasterNumberDescription;
      this.http.post(this.url, this.mastNumData)
        .subscribe(data=>{
          this.myData=data;
          //this.showSuccess(this.myData.message);
          this.getMasterNumberDescription();
        },
        (err: HttpErrorResponse) => {
            this.isError=true;
            this.serverErrorMessage = Messages.ServerErrorMessage;
            if (err.error instanceof Error) {
              console.log("Client-side error occured.",err);
            } else {
              console.log("Server-side error occured.",err);
            }
          }
        );
     }

     updateContacts($event){
       console.log($event.referredSource);
       console.log($event.contacts);
        this.mastNumData={};
        this.mastNumData.mastNumId=this.masterNumberData.mastNumId;
        this.mastNumData.referredSource=$event.referredSource;
        this.mastNumData.contacts=$event.contacts;
        console.log(this.mastNumData);
        this.url=APIUrls.hosturl+APIUrls.UpdateMasterNumberContacts;
        this.http.post(this.url, this.mastNumData)
          .subscribe(data=>{
          this.myData=data;
          this.showSuccess(this.myData.message);
          this.getContacts();
        },
        (err: HttpErrorResponse) => {
            this.isError=true;
            this.serverErrorMessage = Messages.ServerErrorMessage;
            if (err.error instanceof Error) {
              console.log("Client-side error occured.",err);
            } else {
              console.log("Server-side error occured.",err);
            }
          }
        );
     }

    updateMasterNumberData($event){
      this.mastNumData=$event.masterNumberData;
        this.mastNumData.mastNumId=this.masterNumberData.mastNumId;
        this.url=APIUrls.hosturl+APIUrls.UpdateMasterNumberDetails;
        console.log(this.mastNumData);
        this.http.post(this.url, this.mastNumData)
          .subscribe(data=>{
          this.myData=data;
          this.showSuccess(this.myData.message);
          this.getMasterNumberDetails();
          this.getInsuranceDetails();
        },
        (err: HttpErrorResponse) => {
            this.isError=true;
            this.serverErrorMessage = Messages.ServerErrorMessage;
            if (err.error instanceof Error) {
              console.log("Client-side error occured.",err);
            } else {
              console.log("Server-side error occured.",err);
            }
          }
        );
    }

    showSuccess(message) {
        this.msgs = [];
        this.msgs.push({severity:'success', summary:'Success Message', detail:message});
    }

    getPictures(){
        let getParams = new HttpParams().set('mastNumHash', this.parameterID);
        this.url =APIUrls.hosturl+APIUrls.MasterNumberPictures;
        this.http.get(this.url,{params:getParams})
        .subscribe(data=>{
            this.myData = data;
            this.pictures=this.myData.pictures;
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