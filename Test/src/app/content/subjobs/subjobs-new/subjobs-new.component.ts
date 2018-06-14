import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router'
import {HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {TitleTextService} from '../../../shared/services/titletext.service';
import {JobImagesList} from '../../../models/jobimages-new';
import {APIUrls} from '../../../shared/constants/apiurls';
import {ContactDetails} from '../../../models/contact-details';
import {Messages} from '../../../shared/constants/messages';
import {ResponseMessage} from '../../../models/response-message';
import {GrowlModule,Message} from 'primeng/primeng';

@Component({
  selector: 'subjob-new',
  templateUrl: './subjobs-new.component.html',
})


export class SubJobsNewComponent implements OnInit {
  disabled: boolean = false;
  imagearray :JobImagesList[];
  otherimagedsbl: boolean = false;
  displayImageName:string ='';
  url:string;
  sub:any;
  id:string;
  parameterID:string;
  myData:any;
  masterNumberData:any;
  allSupervisors:ContactDetails[];
  allEstimators:ContactDetails[];
  allCoordinators: ContactDetails[];
  financeContacts:ContactDetails[];
  filteredSupervisors:ContactDetails[];
  filteredEstimators:ContactDetails[];
  filteredCoordinators:ContactDetails[];
  filteredFinance:ContactDetails[];
  isError:boolean;
  serverErrorMessage:string;
  responseMessage:any;
  msgs: Message[] = [];
  fileDetails: any;
  saveContactList: any;
  supervisor: any;
  coordinator: any;
  finance: any;
  estimator: any;
  display: boolean = false;
  description: string;
  contactDetails: any;
  showDialog(contactType){
      this.contactDetails={};
      this.contactDetails.contactType=contactType;
      this.display = true;
  }
  constructor(private data: TitleTextService,private router: Router, private route: ActivatedRoute, private http: HttpClient) {
  }
 
  onImgClick(itemNumber){
    
   //alert('Clicked imaged Index Value :' + itemNumber);
    
    for (let i = 0; i < this.imagearray.length;i++ )
    {
       this.imagearray[i].imageActive=false;
    }
    this.imagearray[itemNumber].imageActive=true;
    this.displayImageName = this.imagearray[itemNumber].jobName;
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

  ngOnInit(): void {
    this.contactDetails={};
    this.sub = this.route.params.subscribe(params => {
     this.id = params['id'];
    }); 
     this.parameterID=this.id;
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
      this.getEstimators();
      this.getSupervisors();
      this.getCoordinators();
      this.getFinance();
      this.imagearray = [
                          {
                            jobActiveImage :'./assets/images/Water_r.png',
                            jobInactiveImage:'./assets/images/Water_.png',
                            imageActive:false,
                            jobName:'Water',
                          },
                          {
                            jobActiveImage :'./assets/images/Reconstruction_r.png',
                            jobInactiveImage :'./assets/images/Reconstruction_.png',
                            imageActive:false,
                            jobName:'Reconstruction',
                          },
                          {
                            jobActiveImage :'./assets/images/Content_r.png',
                            jobInactiveImage :'./assets/images/Content_.png',
                            imageActive:false,
                            jobName:'Content',
                          },
                          {
                            jobActiveImage :'./assets/images/Mold_r.png',
                            jobInactiveImage :'./assets/images/Mold_.png',
                            imageActive:false,
                            jobName:'Mold',
                          },
                          {
                            jobInactiveImage :'./assets/images/Asbestos_.png',
                            jobActiveImage :'./assets/images/Asbestos_r.png',
                            imageActive:false,
                            jobName:'Asbestos',
                          },
                          {
                            jobInactiveImage :'./assets/images/Board_.png',
                            jobActiveImage :'./assets/images/Boardup_r.png',
                            imageActive:false,
                            jobName:'Board Up',
                          },
                          {
                            jobInactiveImage :'./assets/images/Consulting_.png',
                            jobActiveImage :'./assets/images/Consulting_r.png',
                            imageActive:false,
                            jobName:'Consulting',
                          },
                          {
                            jobInactiveImage :'./assets/images/Bio_.png',
                            jobActiveImage :'./assets/images/Bio_r.png',
                            imageActive:false,
                            jobName:'Bio',
                          },
                        ]

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

     saveData(f){
       if(this.displayImageName!=undefined && this.displayImageName!=null && this.displayImageName!=""){
          this.fileDetails={};
          this.saveContactList=[];
          this.fileDetails.jobType=this.displayImageName;
          this.fileDetails.mastNumId=this.masterNumberData.mastNumId;
          this.fileDetails.jobDescription=this.description;
          if (this.supervisor!== undefined && this.supervisor.id !== undefined){
            this.saveContactList.unshift({"contactId":this.supervisor.id, "userId":"-1" , "roleName":"Supervisor"});
          }
          if (this.estimator!== undefined && this.estimator.id !== undefined){
            this.saveContactList.unshift({"contactId":this.estimator.id, "userId":"-1" , "roleName":"Estimator"});
          }
          if (this.coordinator!== undefined && this.coordinator.id !== undefined){
            this.saveContactList.unshift({"contactId":this.coordinator.id, "userId":"-1" , "roleName":"Coordinator"});
          }
          if (this.finance!== undefined && this.finance.id !== undefined){
            this.saveContactList.unshift({"contactId":this.finance.id, "userId":"-1" , "roleName":"Finance"});
          }
          if(this.saveContactList.length>0){
            this.fileDetails.roles=this.saveContactList;
          }
          this.saveFileDetails();
          //f.reset();
       }
     }

     saveFileDetails(){
      console.log("Saving file details");
      this.url=APIUrls.hosturl+APIUrls.SaveFileDetails;
      this.http.post(this.url, this.fileDetails)
        .subscribe(data=>{
          this.responseMessage=data;
          console.log("Successful Saved Data ", this.responseMessage.message);
          this.showSuccess(this.responseMessage.message);
          console.log(this.masterNumberData.mastNumHash);
          this.router.navigateByUrl("/Content/MasterNumber/MasterNumberDetails/"+this.masterNumberData.mastNumHash);
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

    saveContactData(f){
        if(f.valid){
           let jsonObj = <JSON>this.contactDetails;

      this.url=APIUrls.hosturl+APIUrls.SaveContactDetails;
     
      this.http.post(this.url, this.contactDetails)
        .subscribe(data=>{
          this.responseMessage=data;
          console.log("Successful Saved Data ", this.responseMessage.message);
          if(this.contactDetails.contactType==="Supervisor"){
            this.allSupervisors.push(this.responseMessage.data);
            this.allSupervisors[this.allSupervisors.length-1].fullName=this.allSupervisors[this.allSupervisors.length-1].firstName+" , "+this.allSupervisors[this.allSupervisors.length-1].lastName;
            this.supervisor=this.responseMessage.data;
          }
          else if(this.contactDetails.contactType==="Estimator"){
            this.allEstimators.push(this.responseMessage.data);
            this.allEstimators[this.allEstimators.length-1].fullName=this.allEstimators[this.allEstimators.length-1].firstName+" , "+this.allEstimators[this.allEstimators.length-1].lastName;
            this.estimator=this.responseMessage.data;
          }
          else if(this.contactDetails.contactType==="Coordinator"){
            this.allCoordinators.push(this.responseMessage.data);
            this.allCoordinators[this.allCoordinators.length-1].fullName=this.allCoordinators[this.allCoordinators.length-1].firstName+" , "+this.allCoordinators[this.allCoordinators.length-1].lastName;
            this.coordinator=this.responseMessage.data;
          }
          else if(this.contactDetails.contactType==="Finance"){
            this.financeContacts.push(this.responseMessage.data);
            this.financeContacts[this.financeContacts.length-1].fullName=this.financeContacts[this.financeContacts.length-1].firstName+" , "+this.financeContacts[this.financeContacts.length-1].lastName;
            this.finance=this.responseMessage.data;
          }
          
          this.showSuccess(this.responseMessage.message);
          
          f.reset();
          f.submitted=false;
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
            //this.contactDetails.companyId=this.masterNumberData.companyId;
        }
         
      }

      cancel(){
        this.displayImageName='';
        for (let i = 0; i < this.imagearray.length;i++ ){
            this.imagearray[i].imageActive=false;
        }
      }

}
