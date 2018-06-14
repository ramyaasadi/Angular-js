import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import {HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';

import { AlertModule } from 'ngx-bootstrap';

import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';

import {APIUrls} from '../../../shared/constants/apiurls';
import {TokenValue} from '../../../shared/services/httpcall/token.constant';
import {Messages} from '../../../shared/constants/messages';

import {TitleTextService} from '../../../shared/services/titletext.service';
import {LocationService} from '../../../shared/services/location.service';
import {MasterNumberGrid,MasterNumberGridJob} from '../../../models/masternumber-grid';
import {LocationDetails} from '../../../models/location'

import {FilesPath} from '../../../shared/constants/filespath';

import {    ButtonModule}  from 'primeng/primeng';
import {TableModule} from 'primeng/table';


@Component({
  selector: 'masternumber-grid',
  templateUrl: './masternumber-grid.component.html',
  styleUrls: ['./masternumber-grid.component.css']
})
export class MasterNumberGridComponent implements OnInit,AfterViewInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

    jobTypes:string[]=['Water','Reconstruction','Content','Mold','Asbestos','Board Up','Consulting','Bio'];

    masterNumbers: MasterNumberGrid[];
    dtOptionsMasterNumber: DataTables.Settings = {};

      masternumbers:any;
      isError:boolean;
      serverErrorMessage:string
      url:string;
      isjobActive:boolean;
      tempJobs: MasterNumberGridJob[];

      masterNumberJobs:MasterNumberGridJob[];
     // masterNumberJobsCount:number[];

      singleJob:any;

      myData:any;
      parentRouteId: number;
      private sub: any;
      private id;
      jobImagepath:string = FilesPath.JOBTYPE_ICONS ;
      locationHash: string;

    @ViewChild(DataTableDirective)
    datatableElement: DataTableDirective;
     dtTrigger: Subject<any> = new Subject();
     
    cols: any[];
    jobsList:string;

    constructor(private data: TitleTextService, private http: HttpClient, private router: Router, private route: ActivatedRoute, private userLocation:LocationService) {
       this.cols = [
            { field: 'masterNumber', header: 'Master Job Number',showData:true },
            { field: 'customerName', header: 'Customer Name', showData:true },
            { field: 'address', header: 'Address', showData:true},
            { field: 'city', header: 'City', showData:true},
            { field: 'state', header: 'State', showData:true},
            { field: 'zip', header: 'Zip', showData:true},
            { field: 'phoneNo', header: 'Phone Number',showData:true},
            { field: 'jobs', header: 'File Details',showData:true},
            { field: 'newsubjob', header: 'New File',showData:true },
            //{ field: 'edit', header: 'Edit',showData:true },
            { field: 'jobsList', header: 'Jobs',showData:false },
        ];
        

    }
       ngOnDestroy() {
    
        }

        overBadge($event):void{ 
          if($('.PopupBox').is(':visible')){
             $('.PopupBox').css('display','none');
             $(event.target).parent().find('.PopupBox').css('display','block');
          }else{
            $(event.target).parent().find('.PopupBox').css('display','block');
          }
        // $(event.target).parent().find('.PopupBox').css('display','block');
        }
        closePop($event):void{
        $('.PopupBox').css('display','none');
       }

    getMasterNumbers(){
      if(this.locationHash!==undefined && this.locationHash!=null){
      const headers = new HttpHeaders().set('Authorization',localStorage.getItem("jwtToken") );
      let getParams = new HttpParams().set('locationHash', this.locationHash);
          this.http.get(this.url,{params:getParams})
        .subscribe(data=>{
            this.myData=data;
            this.masterNumbers=this.myData.masterNumbers;
              if(this.id=='my'){
                for (let mastNum of this.masterNumbers) {
                  mastNum.showData=true;
                }
              }
              else{
                for (let mastNum of this.masterNumbers) {
                  mastNum.showData=false;
                }
              }
              for (let i = 0; i < this.myData.masterNumbers.length; i++) {
                      //this.masterNumbers[i].jobs=this.myData.masterNumbers[i].jobs;
                     this.masterNumberJobs=[];
                     this.jobsList=""
                     let found=false;
                     let foundPosition=0;
                      this.tempJobs = this.myData.masterNumbers[i].jobs;
                      let tempJobscount=0;
                      for (let j=0;j<this.jobTypes.length;j++){
                          found=false;
                          for (let k=0;k<this.tempJobs.length;k++)
                            if (this.jobTypes[j] == this.tempJobs[k].jobType){
                              found=true;
                               foundPosition=k;
                               tempJobscount=tempJobscount+ this.tempJobs[k].jobHash.length;
                               this.jobsList = this.jobsList+" , "+this.jobTypes[j];
                            }
                             this.singleJob={};
                          if (found){
                             this.singleJob.jobHash= this.tempJobs[foundPosition].jobHash;
                             this.singleJob.jobImage=this.jobImagepath+this.jobTypes[j].replace(/\s/g, '')+"_r.png";
                            this.singleJob.jobType=this.jobTypes[j];
                            this.singleJob.isjobActive=true;
                            //console.log('True :'+this.singleJob.isjobActive);
                          }else{
                             this.singleJob.jobHash= [];
                             this.singleJob.jobImage=this.jobImagepath+this.jobTypes[j].replace(/\s/g, '')+"_.png";
                            this.singleJob.jobType=this.jobTypes[j];
                            this.singleJob.isjobActive=false;
                            //console.log('False :'+this.singleJob.isjobActive);
                           }
                          this.masterNumberJobs.push(this.singleJob);


                        }
               this.masterNumbers[i].jobs=this.masterNumberJobs;
               this.masterNumbers[i].jobsList=this.jobsList;
               //this.masterNumbers[i].jobsList=this.jobTypes[i%8];
               this.masterNumbers[i].jobsCount=tempJobscount;
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
    }

    ngOnInit() {
        
        this.sub = this.route.params.subscribe(params => {
              this.data.changeMessage("Master Jobs");
              this.id = params['id']; 
            if (this.id=='my')
              {     
                    this.url =APIUrls.hosturl+APIUrls.MasterNumberMyGrid;
                    for (let col of this.cols) {
                       if(col.field==="newsubjob"){
                          col.showData=true;
                       }
                    }
              }else{
                    this.url =APIUrls.hosturl+APIUrls.MasterNumberGrid;
                     for (let col of this.cols) {
                       if(col.field==="newsubjob"){
                          col.showData=false;
                       }
                    }
              }
             this.getMasterNumbers(); 
             this.jobsList="";
         });
         this.userLocation.currentLocation.subscribe(value =>{ 
          this.locationHash=value.hash;
          this.getMasterNumbers(); 
            this.jobsList="";
        });

    }

    handleClick() {
           console.log("Button Clicked....");
        }

  ngAfterViewInit(){
  }


}




