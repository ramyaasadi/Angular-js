import { Component, OnInit } from '@angular/core';

import {HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';

import {SubJobsGrid} from '../../../models/subjobs-grid';
import {APIUrls} from '../../../shared/constants/apiurls';
import {Messages} from '../../../shared/constants/messages';
import {FilesPath} from '../../../shared/constants/filespath';
import {LocationService} from '../../../shared/services/location.service';

@Component({
  selector: 'subjob-grid',
  templateUrl: './subjobs-grid.component.html',
  //styleUrls: ['./subjobs-grid.component.css']
})


export class SubJobsGridComponent implements OnInit {
subJobs: SubJobsGrid[];
dtOptions: DataTables.Settings = {};
myData:any;
jobs: SubJobsGrid[];
isError:boolean;
serverErrorMessage:string;
jobImagepath:string = FilesPath.JOBTYPE_ICONS ;
url:string;
private sub: any;
private id;
locationHash: string;

 cols: any[];
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private userLocation:LocationService) {
        this.cols = [
                { field: 'status', header: 'Status', showData:true},
                { field: 'subJobCode', header: 'File Number',showData:true },
                { field: 'jobImage', header: 'File Details',showData:true},
                { field: 'customerName', header: 'Customer Name', showData:true },
                { field: 'lossAddress', header: 'Loss Address', showData:true},
                { field: 'city', header: 'City', showData:true},
                { field: 'state', header: 'State', showData:true},
                { field: 'zip', header: 'Zip', showData:true},
                { field: 'supervisor', header: 'Supervisor', showData:true},
                { field: 'estimator', header: 'Estimator', showData:true},
                { field: 'createdDatetime', header: 'Created Date & Time',showData:true },
            ];
  }

  getSubJobs(){
        //this.url =APIUrls.hosturl+APIUrls.FilesGrid;
        if(this.locationHash!==undefined && this.locationHash!=null){
            let getParams = new HttpParams().set('locationHash', this.locationHash);
            this.http.get(this.url,{params:getParams})
            .subscribe(data=>{
            this.myData=data;
            this.subJobs=this.myData.jobs;
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
    }
 
  ngOnInit() {
        
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            if (this.id=='my'){     
                this.url =APIUrls.hosturl+APIUrls.MyFilesGrid;
            }else if(this.id=='all'){
                this.url =APIUrls.hosturl+APIUrls.FilesGrid; 
            } 
            else{
                this.url =APIUrls.hosturl+APIUrls.AttentionRequiredFilesGrid;    
            }
            this.getSubJobs();
        });
        this.userLocation.currentLocation.subscribe(value => {
            this.locationHash=value.hash;
            this.getSubJobs();
        });
    }

}
