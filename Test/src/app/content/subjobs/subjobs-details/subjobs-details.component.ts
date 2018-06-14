import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';

import {TitleTextService} from '../../../shared/services/titletext.service';
import {APIUrls} from '../../../shared/constants/apiurls';
import {TokenValue} from '../../../shared/services/httpcall/token.constant';
import {Messages} from '../../../shared/constants/messages';
import {MasterNumberData} from '../../../models/masternumber-data';
import { InsuranceDetails } from '../../../models/insurance-details';
import { FilesPath } from '../../../shared/constants/filespath';
import { NotesInfo } from '../../../models/notes'; 
import { Description } from '../../../models/description';
import { GrowlModule, Message } from 'primeng/primeng';
import { RolesInfo } from '../../../models/roles';
import { ContactDetails } from '../../../models/contact-details';
import { DocumentsInfo } from '../../../models/documents';

@Component({
  selector: 'app-subjobdetails',
  templateUrl: './subjobs-details.component.html',
})
export class SubJobsDetailsComponent implements OnInit {
    dtOptions: DataTables.Settings = {};
    tabIndex: number=0;
 constructor(private data: TitleTextService, private route: ActivatedRoute, private http: HttpClient) {}
 
 sub:any;
  id:string;
  url:string;
  myData:any;
  isError:boolean;
  serverErrorMessage:string;
  fileDetails: any;
  parameterID:string;
  changeStyle:string;
  insurances: InsuranceDetails;
  jobImagepath:string = FilesPath.JOBTYPE_ICONS ;
  jobImage: string;
  notes: NotesInfo[];
  note: any;
  msgs: Message[] = [];
  fileData: any;
  description: Description[];
  roles: RolesInfo[];
  documents: DocumentsInfo[];
  pictures: DocumentsInfo[];
  contacts: ContactDetails[];
  referredSource: string;
  contactDetails: any;
  allSupervisors: ContactDetails[];
  allEstimators: ContactDetails[];
  allCoordinators: ContactDetails[];
  financeContacts: ContactDetails[];
  filteredSupervisors:ContactDetails[];
  filteredEstimators:ContactDetails[];
  filteredCoordinators:ContactDetails[];
  filteredFinance:ContactDetails[];
  supervisor: any;
  coordinator: any;
  finance: any;
  estimator: any;

  display: boolean = false;
  display1: boolean = false;
  display2: boolean = false;
  displayPics: boolean = false;

  showDialog() {
      this.display = true;
  }
  showDialog1() {
      this.display1 = true;
  }
  showDialog2(contactType) {
      this.contactDetails.contactType=contactType;
      this.display2 = true;
  }
  changeTab($event){
      console.log("index: "+$event.index);
      this.tabIndex=$event.index;
  }

  getInsuranceDetails(){
    const params = new HttpParams().set('jobHashCode',this.parameterID);
    this.url =APIUrls.hosturl+APIUrls.FileInsuranceDetails;
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
    const params = new HttpParams().set('jobHashCode',this.parameterID);
    this.url =APIUrls.hosturl+APIUrls.FilesNotes;
    this.http.get(this.url,{params:params})
      .subscribe(data=>{
        this.myData=data;
        this.notes=this.myData.notes;
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

  getFileDetails(){
    this.sub = this.route.params.subscribe(params => {
    this.id = params['id']}); 
    this.parameterID=this.id;
    let getParams = new HttpParams().set('jobHashCode', this.parameterID);
    this.url =APIUrls.hosturl+APIUrls.FileDetails;
    this.http.get(this.url,{params:getParams})
    .subscribe(data=>{
      this.myData = data;
      this.fileDetails=this.myData.jobDetails;
      if(this.fileDetails.jobType!=null){
        this.jobImage=this.jobImagepath+this.fileDetails.jobType+"_50.png";
      }
      else{
        this.jobImage="";
      }
      if(this.fileDetails.status!=null){
        this.changeStyle = this.fileDetails.status.toLowerCase().replace(/ /g,"-");
      }
      this.data.changeMessage("File : "+"   "+this.fileDetails.jobCode);
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

   /* Supervisors */
  getSupervisors(){
    this.url =APIUrls.hosturl+APIUrls.NewFileSupervisor;
    this.http.get(this.url)
        .subscribe(data=>{
          this.myData=data;
          this.allSupervisors=this.myData.contacts;
          for (let i=0;i<this.allSupervisors.length;i++){
            this.allSupervisors[i].fullName=this.allSupervisors[i].firstName+" , "+this.allSupervisors[i].lastName;
          }
          if(this.roles!=undefined){
              let role=this.roles.filter(x => x.role == "Supervisor")[0];
            if(role!=undefined){
              this.supervisor=this.allSupervisors.filter(x => x.id==role.id)[0];
            }
          }
        },
        (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              console.log("Client-side error occured.");
            } else {
              console.log("Server-side error occured.",err);
            }
          }
        );
  }

  /* Estimators */
  getEstimators(){
    this.url =APIUrls.hosturl+APIUrls.NewFileEstimator;
    this.http.get(this.url)
        .subscribe(data=>{
          this.myData=data;
          this.allEstimators=this.myData.contacts;
          for (let i=0;i<this.allEstimators.length;i++){
            this.allEstimators[i].fullName=this.allEstimators[i].firstName+" , "+this.allEstimators[i].lastName;
          }
          if(this.roles!=undefined){
              let role=this.roles.filter(x => x.role == "Estimator")[0];
            if(role!=undefined){
              this.estimator=this.allEstimators.filter(x => x.id==role.id)[0];
            }
          }
        },
        (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              console.log("Client-side error occured.");
            } else {
              console.log("Server-side error occured.",err);
            }
          }
        );
  }

  /* Coordinators */
  getCoordinators(){
    this.url =APIUrls.hosturl+APIUrls.NewFileCoordinator;
    this.http.get(this.url)
        .subscribe(data=>{
          this.myData=data;
          this.allCoordinators=this.myData.contacts;
          for (let i=0;i<this.allCoordinators.length;i++){
            this.allCoordinators[i].fullName=this.allCoordinators[i].firstName+" , "+this.allCoordinators[i].lastName;
          }
           if(this.roles!=undefined){
              let role=this.roles.filter(x => x.role == "Coordinator")[0];
            if(role!=undefined){
              this.coordinator=this.allCoordinators.filter(x => x.id==role.id)[0];
            }
          }
        },
        (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              console.log("Client-side error occured.");
            } else {
              console.log("Server-side error occured.",err);
            }
          }
        );
  }

  /* Finance */
  getFinance(){
    this.url =APIUrls.hosturl+APIUrls.NewFileFinance;
    this.http.get(this.url)
        .subscribe(data=>{
          this.myData=data;
          this.financeContacts=this.myData.contacts;
          for (let i=0;i<this.financeContacts.length;i++){
            this.financeContacts[i].fullName=this.financeContacts[i].firstName+" , "+this.financeContacts[i].lastName;
          }
          if(this.roles!=undefined){
              let role=this.roles.filter(x => x.role == "Finance")[0];
            if(role!=undefined){
              this.finance=this.financeContacts.filter(x => x.id==role.id)[0];
            }
          }
        },
        (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              console.log("Client-side error occured.");
            } else {
              console.log("Server-side error occured.",err);
            }
          }
        );
  }

    filterSupervisor(event){
      this.filteredSupervisors=[];
      for(let i = 0; i < this.allSupervisors.length; i++) {
          let supervisor = this.allSupervisors[i];
          if(supervisor.fullName.toLowerCase().indexOf(event.query.toLowerCase()) !==-1){
              this.filteredSupervisors.push(supervisor);
          }
      }
    }

     filterEstimator(event){
      this.filteredEstimators=[];
      for(let i = 0; i < this.allEstimators.length; i++) {
          let estimator = this.allEstimators[i];
          if(estimator.fullName.toLowerCase().indexOf(event.query.toLowerCase()) !==-1){
              this.filteredEstimators.push(estimator);
          }
      }
     }

     filterCoordinator(event){
      this.filteredCoordinators=[];
      for(let i = 0; i < this.allCoordinators.length; i++) {
          let coordinator = this.allCoordinators[i];
          if(coordinator.fullName.toLowerCase().indexOf(event.query.toLowerCase()) !==-1){
              this.filteredCoordinators.push(coordinator);
          }
      }
     }

     filterFinance(event){
      this.filteredFinance=[];
      for(let i = 0; i < this.financeContacts.length; i++) {
          let finance = this.financeContacts[i];
          if(finance.fullName.toLowerCase().indexOf(event.query.toLowerCase()) !==-1){
              this.filteredFinance.push(finance);
          }
      }
     }

    ngOnInit() {
      this.dtOptions = {
        pagingType: 'full_numbers'
      }
      this.getFileDetails();
      this.getInsuranceDetails();
      this.getNotes();
      this.getFileDescription();
      this.getRoles();
      this.getContacts();
      this.getSupervisors();
      this.getEstimators();
      this.getCoordinators();
      this.getFinance();
      this.getDocuments();
      this.getPictures();
      this.contactDetails={};

    }

    saveNotes($event){
      this.note={};
      this.note.notes=$event.note;
      this.note.notesCategory=$event.category;
      this.note.jobId=this.fileDetails.jobId;
      this.note.mastNumId=this.fileDetails.mastNumId;
      this.url=APIUrls.hosturl+APIUrls.SaveFileNotes;
      this.http.post(this.url, this.note)
        .subscribe(data=>{
          this.myData=data;
          this.getNotes();
          this.showSuccess(this.myData.message);
         
        },
        (err: HttpErrorResponse) => {
            this.showSuccess("Notes added successfully!");
          }
        );

    }

    showSuccess(message) {
        this.msgs = [];
        this.msgs.push({severity:'success', summary:'Success Message', detail:message});
    }

    updateFileData($event){
      this.fileData=$event.fileData;
        this.fileData.jobId=this.fileDetails.jobId;
        this.url=APIUrls.hosturl+APIUrls.UpdateFileDetails;
        console.log(this.fileData);
        this.http.post(this.url, this.fileData)
          .subscribe(data=>{
          this.myData=data;
          this.showSuccess(this.myData.message);
          this.getFileDetails();
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

    getFileDescription(){
      let getParams = new HttpParams().set('jobHashCode', this.parameterID);
      this.url =APIUrls.hosturl+APIUrls.FileDescription;
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

    getContacts(){
      let getParams = new HttpParams().set('jobHashCode', this.parameterID);
      this.url =APIUrls.hosturl+APIUrls.FileContacts;
      this.http.get(this.url,{params:getParams})
      .subscribe(data=>{
          this.myData = data;
          this.contacts=this.myData.contacts;
          this.referredSource=this.myData.referredSource;
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

    getRoles(){
      let getParams = new HttpParams().set('jobHashCode', this.parameterID);
      this.url =APIUrls.hosturl+APIUrls.FileRoles;
      this.http.get(this.url,{params:getParams})
      .subscribe(data=>{
          this.myData = data;
          this.roles=this.myData.roles;
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

    getDocuments(){
      let getParams = new HttpParams().set('jobHashCode', this.parameterID);
      this.url =APIUrls.hosturl+APIUrls.FileDocuments;
      this.http.get(this.url,{params:getParams})
      .subscribe(data=>{
          this.myData = data;
          this.documents=this.myData.documents;
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

    updateDescription($event){
      this.fileData={};
      this.fileData.jobId=this.fileDetails.jobId;
      this.fileData.description=$event.description;
      this.url=APIUrls.hosturl+APIUrls.SaveFileDescription;
      this.http.post(this.url, this.fileData)
        .subscribe(data=>{
          this.myData=data;
          this.getFileDescription();
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

     updateRoles(){
      this.fileData={};
      this.fileData.jobId=this.fileDetails.jobId;
      let jobRoles=[];
      if (this.supervisor!== undefined && this.supervisor.id !== undefined){
          jobRoles.unshift({"contactId":this.supervisor.id, "roleName":"Supervisor"});
      }
      if (this.estimator!== undefined && this.estimator.id !== undefined){
          jobRoles.unshift({"contactId":this.estimator.id, "roleName":"Estimator"});
      }

      if (this.coordinator!== undefined && this.coordinator.id !== undefined){
          jobRoles.unshift({"contactId":this.coordinator.id, "roleName":"Coordinator"});
      }

      if (this.finance!== undefined && this.finance.id !== undefined){
          jobRoles.unshift({"contactId":this.finance.id, "roleName":"Finance"});
      }
      this.fileData.roles=jobRoles;
      this.url=APIUrls.hosturl+APIUrls.UpdateFileRoles;
        this.http.post(this.url, this.fileData)
          .subscribe(data=>{
          this.myData=data;
          this.showSuccess(this.myData.message);
          this.getRoles();
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

    saveContactData(f){
        if(f.valid){
           let jsonObj = <JSON>this.contactDetails;

      this.url=APIUrls.hosturl+APIUrls.SaveContactDetails;
     
      this.http.post(this.url, this.contactDetails)
        .subscribe(data=>{
          this.myData=data;
          if(this.contactDetails.contactType==="Supervisor"){
            this.allSupervisors.push(this.myData.data);
            this.allSupervisors[this.allSupervisors.length-1].fullName=this.allSupervisors[this.allSupervisors.length-1].firstName+" , "+this.allSupervisors[this.allSupervisors.length-1].lastName;
            this.supervisor=this.myData.data;
          }
          else if(this.contactDetails.contactType==="Estimator"){
            this.allEstimators.push(this.myData.data);
            this.allEstimators[this.allEstimators.length-1].fullName=this.allEstimators[this.allEstimators.length-1].firstName+" , "+this.allEstimators[this.allEstimators.length-1].lastName;
            this.estimator=this.myData.data;
          }
          else if(this.contactDetails.contactType==="Coordinator"){
            this.allCoordinators.push(this.myData.data);
            this.allCoordinators[this.allCoordinators.length-1].fullName=this.allCoordinators[this.allCoordinators.length-1].firstName+" , "+this.allCoordinators[this.allCoordinators.length-1].lastName;
            this.coordinator=this.myData.data;
          }
          else if(this.contactDetails.contactType==="Finance"){
            this.financeContacts.push(this.myData.data);
            this.financeContacts[this.financeContacts.length-1].fullName=this.financeContacts[this.financeContacts.length-1].firstName+" , "+this.financeContacts[this.financeContacts.length-1].lastName;
            this.finance=this.myData.data;
          }
          
          this.showSuccess(this.myData.message);
          
          f.reset();
          f.submitted=false;
          this.display2=false;
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
            //this.contactDetails.companyId=this.masterNumberData.companyId;
        }
         
      } 

      updateContacts($event){
        this.fileData={};
        this.fileData.jobId=this.fileDetails.jobId;
        this.fileData.contacts=$event.contacts;
        this.fileData.referredSource=$event.referredSource;
        this.url=APIUrls.hosturl+APIUrls.UpdateFileContacts;
          this.http.post(this.url, this.fileData)
            .subscribe(data=>{
            this.myData=data;
            this.showSuccess(this.myData.message);
            this.getContacts();
            this.display=false;
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

     saveDocument($event){
    
        let formData = new FormData();
        formData.append("name",$event.document.name);
        formData.append("category",$event.document.category);
        formData.append("comments",$event.document.comments);
        formData.append("sourceCategory","Job");
        formData.append("sourceId",this.fileDetails.jobId);
        formData.append("file",$event.file);
        this.url=APIUrls.hosturl+APIUrls.saveDocument;
      this.http.post(this.url, formData)
        .subscribe(data=>{
          this.myData=data;
          this.showSuccess(this.myData.message);
          this.getDocuments();
        },
        (err: HttpErrorResponse) => {
            // this.isError=true;
            // this.serverErrorMessage = Messages.ServerErrorMessage;
            if (err.error instanceof Error) {
              console.log("Client-side error occured.",err);
            } else {
              console.log("Server-side error occured.",err);
            }
          }
        );
        this.display=false;
      }

      deleteDocuments($event){
           this.url=APIUrls.hosturl+APIUrls.DeleteFileDocuments;
           let fileIds=$event.selDocs.join().split(',').toString();
          let formData = new FormData();
        formData.append("fileIds",fileIds);
        this.http.post(this.url, formData)
        .subscribe(data=>{
          this.myData=data;
          this.showSuccess(this.myData.message);
          this.getDocuments();
        },
        (err: HttpErrorResponse) => {
            // this.isError=true;
            // this.serverErrorMessage = Messages.ServerErrorMessage;
            if (err.error instanceof Error) {
              console.log("Client-side error occured.",err);
            } else {
              console.log("Server-side error occured.",err);
            }
          }
        );
      }

      showPictures(){
        this.displayPics = true;
      }

      getPictures(){
        let getParams = new HttpParams().set('jobHashCode', this.parameterID);
        this.url =APIUrls.hosturl+APIUrls.FilePictures;
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