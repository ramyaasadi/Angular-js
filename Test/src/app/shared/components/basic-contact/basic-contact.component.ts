import { Component,Input, OnInit, AfterViewInit, Output, EventEmitter} from '@angular/core';
import { FormControl } from '@angular/forms';

import {HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {IAddress} from '../../../models/address.model';
import {ContactDetails} from '../../../models/contact-details';
import {CompanyDetails} from '../../../models/company-details';
import {AppConstants} from '../../../shared/constants/app-constants';
import {APIUrls} from '../../../shared/constants/apiurls';
import {GrowlModule,Message} from 'primeng/primeng';
//import {AppConstants} from '../../../shared/constants/app-constants';

@Component({
  selector: 'basiccontact-form',
  templateUrl: './basic-contact.component.html',
})
export class BasicContactFormComponent implements OnInit {
      @Output() updateContact = new EventEmitter<any>();

      contactList: ContactDetails[];
      agentName:any;
      adjusterName:any;
      salesRepresentativeName:any;
      tpaName:any;
      referredBy: any;
      allAgents:ContactDetails[];
      filteredAgentsName: ContactDetails[];
      allAdjusters:ContactDetails[];
      filteredAdjustersName:ContactDetails[];
      allSales:ContactDetails[];
      filteredSalesName:ContactDetails[];
      allManagers:ContactDetails[];
      filteredManagersName:ContactDetails[];
      allRbys:ContactDetails[];
      filteredReferredBysName:ContactDetails[];
      insuranceCompany:any;
      allTpas:ContactDetails[];
      filteredTpasName:ContactDetails[];
      myData:any;

      url:string;
      isError:boolean;

      RSources: string[] = ['Facebook','On Call'];
      filteredSources: any[];
      RSource: string;
      displayContact: boolean=false;
      showCompany: boolean=true;
      contactDetails:any;
      contactCompany:any;
      msgs: Message[] = [];
      contactType: string;
      allCompanies: CompanyDetails[];
      filteredCompanies: CompanyDetails[];
      usaStates:any;
      filteredCustomerStates:any;
      constructor(private http: HttpClient){

      }

   ngOnInit(){

    this.getInsuranceAgents();
    this.getAdjusters();
    this.getSales();
    //this.getMangers();
    this.getReferredBy();
    this.getTpa();
    this.contactCompany={};
    this.contactDetails={};
    this.getCompanies();
    this.usaStates=AppConstants.USAStates;
   }
   
   filterStates(event){
        let query = event.query;        
        let filtered = [];
          for(let i = 0; i < this.usaStates.length; i++) {
            let usState = this.usaStates[i];
              if(usState.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                  filtered.push(usState);
              }
          }
          console.log(filtered);
          this.filteredCustomerStates=filtered;       
    }
   /* Agent */
   getInsuranceAgents(){
    this.url =APIUrls.hosturl+APIUrls.MasterNumberInsuranceAgents;
    this.http.get(this.url)
        .subscribe(data=>{
          this.myData=data;
          this.allAgents=this.myData.contacts;
          for (let i=0;i<this.allAgents.length;i++){
            this.allAgents[i].fullName=this.allAgents[i].firstName+" , "+this.allAgents[i].lastName;
          }
          if(this.contactList!=undefined){
            let contact=this.contactList.filter(x => x.contactType == "Insurance Agent")[0];
            if(contact!=undefined){
              this.agentName=this.allAgents.filter(x => x.id==contact.id)[0];
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

filterAgentName(event){
  this.filteredAgentsName=[];
  for(let i = 0; i < this.allAgents.length; i++) {
      let agent = this.allAgents[i];
      if(agent.fullName.toLowerCase().indexOf(event.query.toLowerCase()) !==-1){
          this.filteredAgentsName.push(agent);
      }
  }
}

/* Adjuster */
getAdjusters(){
  this.url =APIUrls.hosturl+APIUrls.MasterNumberAdjusters;
  this.http.get(this.url)
      .subscribe(data=>{
        this.myData=data;
        this.allAdjusters=this.myData.contacts;
        for (let i=0;i<this.allAdjusters.length;i++){
          this.allAdjusters[i].fullName=this.allAdjusters[i].firstName+" , "+this.allAdjusters[i].lastName;
        }
         if(this.contactList!=undefined){
            let contact=this.contactList.filter(x => x.contactType == "Adjuster")[0];
            if(contact!=undefined){
              this.adjusterName=this.allAdjusters.filter(x => x.id==contact.id)[0];
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

filterAdjusterName(event){
  this.filteredAdjustersName=[];
  for(let i = 0; i < this.allAdjusters.length; i++) {
      let agent = this.allAdjusters[i];
      if(agent.fullName.toLowerCase().indexOf(event.query.toLowerCase()) !==-1){
          this.filteredAdjustersName.push(agent);
      }
  }
}

/* Sales Representative */
getSales(){
  this.url =APIUrls.hosturl+APIUrls.MasterNumberSalesRepresentative;
  this.http.get(this.url)
      .subscribe(data=>{
        this.myData=data;
        this.allSales=this.myData.contacts;
        for (let i=0;i<this.allSales.length;i++){
          this.allSales[i].fullName=this.allSales[i].firstName+" , "+this.allSales[i].lastName;
        }
        if(this.contactList!=undefined){
            let contact=this.contactList.filter(x => x.contactType == "Sales Representative")[0];
            if(contact!=undefined){
              this.salesRepresentativeName=this.allSales.filter(x => x.id==contact.id)[0];
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

filterSaleName(event){
  this.filteredSalesName=[];
  for(let i = 0; i < this.allSales.length; i++) {
      let agent = this.allSales[i];
      if(agent.fullName.toLowerCase().indexOf(event.query.toLowerCase()) !==-1){
          this.filteredSalesName.push(agent);
      }
  }
}

/* Property Manager Name */
getMangers(){
  this.url =APIUrls.hosturl+APIUrls.MasterNumberProjectManager;
  this.http.get(this.url)
      .subscribe(data=>{
        this.myData=data;
        this.allManagers=this.myData.contacts;
        for (let i=0;i<this.allManagers.length;i++){
          this.allManagers[i].fullName=this.allManagers[i].firstName+" , "+this.allManagers[i].lastName;
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

filterManagerName(event){
  this.filteredManagersName=[];
  for(let i = 0; i < this.allManagers.length; i++) {
      let agent = this.allManagers[i];
      if(agent.fullName.toLowerCase().indexOf(event.query.toLowerCase()) !==-1){
          this.filteredManagersName.push(agent);
      }
  }
}

/* Referred Source */
filterSource(event) {
  this.filteredSources = [];
  for(let i = 0; i < this.RSources.length; i++) {
      let RSource = this.RSources[i];
      if(RSource.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
          this.filteredSources.push(RSource);
      }
  }
}

/* Referred By */
getReferredBy()
{
this.url =APIUrls.hosturl+APIUrls.MasterNumberReferredBy;
this.http.get(this.url)
    .subscribe(data=>{
      this.myData=data;
      this.allRbys=this.myData.contacts;
       for (let i=0;i<this.allRbys.length;i++){
          this.allRbys[i].fullName=this.allRbys[i].firstName;
          if(this.allRbys[i].lastName!=null && this.allRbys[i].lastName!=""){
            this.allRbys[i].fullName+=" "+this.allRbys[i].lastName;
          }
          if(this.allRbys[i].contactType!=null && this.allRbys[i].contactType!=""){
            this.allRbys[i].fullName+=" , "+this.allRbys[i].contactType;
          }
        }
       if(this.contactList!=undefined){
            let contact=this.contactList.filter(x => x.contactType == "Referred By")[0];
            if(contact!=undefined){
              this.referredBy=this.allRbys.filter(x => x.id==contact.id)[0];
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

filterReferredByName(event){
  this.filteredReferredBysName=[];
  for(let i = 0; i < this.allRbys.length; i++) {
      let agent = this.allRbys[i];
      if(agent.fullName.toLowerCase().indexOf(event.query.toLowerCase()) !==-1){
          this.filteredReferredBysName.push(agent);
      }
  }
}

/* TPA Name */
getTpa()
{
  this.url =APIUrls.hosturl+APIUrls.MasterNumberTpa;
  this.http.get(this.url)
      .subscribe(data=>{
        this.myData=data;
        this.allTpas=this.myData.contacts;
        for (let i=0;i<this.allTpas.length;i++){
          this.allTpas[i].fullName=this.allTpas[i].firstName+" "+this.allTpas[i].lastName;
        }
        if(this.contactList!=undefined){
            let contact=this.contactList.filter(x => x.contactType == "Third Party Administrator")[0];
            if(contact!=undefined){
              this.tpaName=this.allTpas.filter(x => x.id==contact.id)[0];
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

 filterTpaName(event){
    this.filteredTpasName=[];
    for(let i = 0; i < this.allTpas.length; i++) {
        let agent = this.allTpas[i];
        if(agent.fullName.toLowerCase().indexOf(event.query.toLowerCase()) !==-1){
            this.filteredTpasName.push(agent);
        }
    }
 }

  getCompanies(){
      this.url =APIUrls.hosturl+APIUrls.MasterNumberCompanies;
      this.http.get(this.url)
          .subscribe(data=>{
            this.myData=data;
            this.allCompanies=this.myData.companies;
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

    filterCompany(event){
      console.log("Query is ",event.query)
      this.filteredCompanies=[];
      for(let i = 0; i < this.allCompanies.length; i++) {
          let agent = this.allCompanies[i];
          if(agent.companyName.toLowerCase().indexOf(event.query.toLowerCase()) !==-1){
              this.filteredCompanies.push(agent);
          }
      }
     }

  @Input()
  set contacts(contacts: ContactDetails[]){
    this.contactList=contacts;
  }

  @Input() 
  set refSource(refSource: string){
    this.RSource=refSource;
  }

  onAgentClear(event){
    this.agentName={};
  }

 onAdjusterClear(event){
    this.adjusterName={};
  }

onSalesRepresentativeClear(event){
      this.salesRepresentativeName={};
    }

  onTPAClear(event){
    this.tpaName={};
  }

  updateContacts(){
      let saveContactList=[];
       
        if (this.adjusterName!== undefined && this.adjusterName.id !== undefined){
             saveContactList.unshift({"contactId":this.adjusterName.id, "userId":"-1" , "contactType":"Adjuster"});
        }
  
        if (this.agentName !== undefined && this.agentName.id !== undefined ){
           saveContactList.unshift({"contactId":this.agentName.id,"userId":"-1" ,"contactType":"Insurance Agent"});
        }

        if (this.salesRepresentativeName!== undefined && this.salesRepresentativeName.id !== undefined){
          saveContactList.unshift({"contactId":this.salesRepresentativeName.id, "userId":"-1" , "contactType":"Sales Representative"});
        }

        if (this.tpaName!== undefined && this.tpaName.id !== undefined){
           saveContactList.unshift({"contactId":this.tpaName.id, "userId":"-1" , "contactType":"Third Party Administrator"});
        }
        if(this.referredBy !== undefined && this.referredBy.id !== undefined){
            saveContactList.unshift({"contactId":this.referredBy.id, "userId":"-1" , "contactType":"Referred By"});
        }
    this.updateContact.emit({
      referredSource: this.RSource,
      contacts: saveContactList
    });
  }

  showDialog(contactType) {
      this.contactDetails={};
      this.contactType=contactType;
      if(contactType=="Referred By"){
        this.showCompany=false;
      }
      else{
        this.contactDetails.contactType=contactType;
        this.showCompany=true;
      }
      this.displayContact=true;
  }

  saveContactData(f){
      if(f.valid){
        if(this.contactCompany!==undefined && this.contactCompany.companyId!=undefined){
            this.contactDetails.companyId=this.contactCompany.companyId;
        }
          let jsonObj = <JSON>this.contactDetails;

        this.url=APIUrls.hosturl+APIUrls.SaveContactDetails;
     
        this.http.post(this.url, this.contactDetails)
        .subscribe(data=>{
          this.myData=data;
          console.log("Successful Saved Data ", this.myData.message);
          if(this.contactDetails.contactType==="Insurance Agent"){
            this.allAgents.push(this.myData.data);
            this.allAgents[this.allAgents.length-1].fullName=this.allAgents[this.allAgents.length-1].firstName+" , "+this.allAgents[this.allAgents.length-1].lastName;
            this.agentName=this.myData.data;
          }
          else if(this.contactDetails.contactType==="Third Party Administrator"){
            this.allTpas.push(this.myData.data);
            this.allTpas[this.allTpas.length-1].fullName=this.allTpas[this.allTpas.length-1].firstName+" , "+this.allTpas[this.allTpas.length-1].lastName;
            this.tpaName=this.myData.data;
          }
          else if(this.contactDetails.contactType==="Sales Representative"){
            this.allSales.push(this.myData.data);
            this.allSales[this.allSales.length-1].fullName=this.allSales[this.allSales.length-1].firstName+" , "+this.allSales[this.allSales.length-1].lastName;
            this.salesRepresentativeName=this.myData.data;
          }
          else if(this.contactDetails.contactType==="Adjuster"){
            this.allAdjusters.push(this.myData.data);
            this.allAdjusters[this.allAdjusters.length-1].fullName=this.allAdjusters[this.allAdjusters.length-1].firstName+" , "+this.allAdjusters[this.allAdjusters.length-1].lastName;
            this.adjusterName=this.myData.data;
          }
          else{
            this.allRbys.push(this.myData.data);
            this.allRbys[this.allRbys.length-1].fullName=this.allRbys[this.allRbys.length-1].firstName+" "+this.allRbys[this.allRbys.length-1].lastName;
            this.referredBy=this.myData.data;
          }
          this.showSuccess(this.myData.message);
          this.contactCompany={};
          f.reset();
          f.submitted=false;
          this.displayContact=false;
          
        },
        (err: HttpErrorResponse) => {
            this.isError=true;
            //this.serverErrorMessage = Messages.ServerErrorMessage;
            if (err.error instanceof Error) {
              console.log("Client-side error occured.",err);
            } else {
              console.log("Server-side error occured.",err);
            }
          }
        );
        }
      }

    showSuccess(message) {
        this.msgs = [];
        this.msgs.push({severity:'success', summary:'Success Message', detail:message});
    }

    OnReferredByChange(event){
      if((this.filteredReferredBysName==null || this.filteredReferredBysName.length==0) && this.referredBy!=null &&
       this.referredBy!=undefined && this.referredBy!=""){
        this.contactDetails={};
        this.contactDetails.firstName=this.referredBy;
        this.url=APIUrls.hosturl+APIUrls.SaveContactDetails;
        this.http.post(this.url, this.contactDetails)
          .subscribe(data=>{
            this.myData=data;
            this.allRbys.push(this.myData.data);
            this.allRbys[this.allRbys.length-1].fullName=this.allRbys[this.allRbys.length-1].firstName;
            this.referredBy=this.myData.data;
           // this.showSuccess(this.responseMessage.message);
          },
          (err: HttpErrorResponse) => {
              this.isError=true;
              if (err.error instanceof Error) {
                console.log("Client-side error occured.",err);
              } else {
                console.log("Server-side error occured.",err);
              }
            }
          );
      }
    }

//    ngAfterViewInit(){
//       this.contactType = this.ContactType;
//       console.log("In BASIC CONTACT ",this.ContactType);
//    }

//    filterContacts(event){
//         console.log("Query is ",event.query)
//         this.filteredContacts=[];
//         for(let i = 0; i < this.ContactData.length; i++) {
//             let agent = this.ContactData[i];
//             if(agent.fullName.toLowerCase().indexOf(event.query.toLowerCase()) !==-1){
//                 this.filteredContacts.push(agent);
//             }
//         }
//       }

//    onContactClear(event){
//       this.contactName={}
//    }



}
