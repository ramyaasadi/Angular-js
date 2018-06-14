import { Component, OnInit, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
import {Router, ActivatedRoute} from '@angular/router';
// import { Component, OnInit,  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap';


import { NgForm } from '@angular/forms';

import {APIUrls} from '../../shared/constants/apiurls';
import {TokenValue} from '../../shared/services/httpcall/token.constant';
import {Messages} from '../../shared/constants/messages';

import {AuthCheckService} from '../../shared/services/auth-check.service';

import {TitleTextService} from '../../shared/services/titletext.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';

import {CustomerBasicInfo} from '../../models/customer-basicinfo';
import {InsuranceCompanyDetails} from '../../models/insurancecompany-details';
import {PersonBasicInfo} from '../../models/person-basicinfo';
import {ConfigurationData} from '../../models/config-data';
import {UserDetails} from '../../models/user-details';
import {SimpleContact} from '../../models/simple-contact';

@Component({
  selector: 'layout-header',
  templateUrl: './layoutheader.component.html',
  styleUrls: ['./layoutheader.component.css']
})
export class LayoutHeaderComponent implements OnInit {
    modalRef: BsModalRef;
    tokenInfo:any;
    jwtToken:any;

    url:string;
    isError:boolean;
    serverErrorMessage:string;
    myData:any;

    masterNumberData:any;


    isLoggedIn: Observable<boolean>
    i:number;
    customersBasicInfo:CustomerBasicInfo[];
    customerSequenceId:any;
    customerBasicInfo:CustomerBasicInfo;
    isLossAddressSame:boolean;
    lossAddress:string;
    lossAddressDisabled:string;
    isBillingAddressSame:boolean;
    billingAddress:string;
    billingAddressDisabled:string;

    companyId:number;
    insuranceCompanyId:number;
    description:string;
    propertyType:any;
    claimNumber:string;
    configurationData:ConfigurationData[];
    causeOfLossIds:ConfigurationData[];
    causeOfLossId:number;

    yearBuiltIds:ConfigurationData[];
    yearBuiltId:number;

    programTypeIds:ConfigurationData[];
    programTypeId:number;

    projectManagers:UserDetails[];
    projectManagerId:number;

    sales:UserDetails[];
    salesId:number;

    insuranceCompanies:InsuranceCompanyDetails[];
    // insurnaceCompany:InsuranceCompanyDetails;

    adjusterIds:PersonBasicInfo[];
    adjusterId:number;
    adjusterPhoneNumber:string;
    persons0:PersonBasicInfo[];
    tempurl:any;
    modalConfig:any;
    contacts: SimpleContact[];
    message: string;
    constructor(private router:Router, private location: Location, private data: TitleTextService,private http: HttpClient,private authCheckService:AuthCheckService, private modalService: BsModalService,public jwtHelper: JwtHelperService) { }
    ngOnInit() {
      this.data.currentMessage.subscribe(message => this.message = message);
      this.isLoggedIn= this.authCheckService.isLoggedIn;
      this.getDecodedAccessToken();
    }
    goBack() {
      // alert('back');
       this.location.back();
      // console.log('Location path is ',this.location.path());
      //  this.tempurl=this.location.path();
      //   this.router.navigate([this.tempurl]);
    }
    openModal(template: TemplateRef<any>) {
      this.getData();
      this.modalConfig = {
          animated: true,
          keyboard: false,
          backdrop: false,
          ignoreBackdropClick: true
        };

     // this.modalRef = this.modalService.show(template, {{'ignoreBackdropClick': 'Disable'});
      this.modalRef = this.modalService.show(template,Object.assign({}, this.modalConfig, { class: 'gray modal-lg' })
    );
    }

    confirmLogOut(){
      console.log("Signing off... ");
      localStorage.removeItem('jwtToken');
    // this.modalRef.hide();
      this.authCheckService.logout();

    }

    confirmData(): void {
      //this.messages = 'Confirmed!';
      console.log("Confirmed .... ");
      this.modalRef.hide();
    }

    getData(){
      this.adjusterPhoneNumber="";
      this.customerSequenceId="";
      this.lossAddressDisabled="";
      this.billingAddressDisabled="";
      this.adjusterPhoneNumber="";
      this.causeOfLossId=2;
      this.adjusterIds=[{ id: -1, firstName: "Select", lastName:"", phoneNo: "" }];
     // this.getInsuranceCompanies();
      this.getCustomers();
      this.getConfigurationData();
     //
      this.projectManagers=[
	          {userId:2, createdBy:"",createdDatetime:"", emailId:"pavan.galeveti@wisseninfotech.com",firstName:"Pavan", inactiveReason:"", lastName:"Galeveti", mobileNo:"",	phoneNo:"", profilePic:"", status:"", userName:"pavan" }
]
     }

/*
    onCompanyChange(event){
      this.adjusterIds=[];
      this.adjusterId=-1
      this.adjusterPhoneNumber="";
      this.adjusterIds=[{ id: -1, firstName: "Select", lastName:"", phoneNo: "" }];
      if (event!=0){
           for(this.i = 0;this.i<this.insuranceCompanies[event].personBasicInfo.length;this.i++) {
              this.adjusterIds[this.i+1]={ id: this.insuranceCompanies[event].personBasicInfo[this.i].id, firstName: this.insuranceCompanies[event].personBasicInfo[this.i].firstName, lastName:this.insuranceCompanies[event].personBasicInfo[this.i].lastName, phoneNo: this.insuranceCompanies[event].personBasicInfo[this.i].phoneNo };
          }
      }
    }

    onAdjusterChange(event){
        if (event!=0){
          this.adjusterPhoneNumber=this.adjusterIds[event].phoneNo
        }else{
          this.adjusterPhoneNumber="";
        }
    }
*/
    decline(): void {
      //this.messages = 'Declined!';
      this.modalRef.hide();
    }

    saveData(){
      this.masterNumberData={
        "restCompLocationId":1,
         "customerId": this.customerBasicInfo.customerId,
          "city": null,
          "zip": null,
          "sourceType": null,
          "sourceId": 0,
          "isInsured": null,
        //  "insuranceCompany": this.insuranceCompanies[this.companyId].companyId,
        //  "insuranceCompanyName": this.insuranceCompanies[this.companyId].companyName,
          "policyNumber": null,
          "tpa": null,
          "tpaName": null,
    //      "contacts": [
    //      {"contactId":0,
    //      "userId":0,
    //     "contactType":""
    //      }]
        }
        if (this.companyId === undefined || this.insuranceCompanies[this.companyId].companyId==0){
        }else{
           this.masterNumberData.insuranceCompany= this.insuranceCompanies[this.companyId].companyId;
          this.masterNumberData.insuranceCompanyName= this.insuranceCompanies[this.companyId].companyName;
/*          if (this.adjusterId!=-1){
            this.adjusterId= this.adjusterIds[this.adjusterId].id;
            console.log("ADJUSTERS ",this.adjusterId);
            if (this.contacts==undefined){
              this.contacts[0]={contactId:this.adjusterId, userId:0, contactType:"Adjustors"};
            }else{
              this.contacts.splice(0,0, {contactId:this.adjusterId, userId:0, contactType:"Adjustors"});
            }
            this.masterNumberData.contacts=this.contacts;
          };
*/
        }

        if (this.causeOfLossId !== undefined) this.masterNumberData.causeOfLoss = this.causeOfLossId;
        if (this.yearBuiltId !== undefined) this.masterNumberData.yearBuilt = this.yearBuiltId;
        if (this.programTypeId !== undefined) this.masterNumberData.programType = this.programTypeId;


        if (this.propertyType !== undefined) this.masterNumberData.propertyType = this.propertyType;
        if (this.lossAddress !== undefined) this.masterNumberData.lossAddress = this.lossAddress;
        if (this.billingAddress !== undefined) this.masterNumberData.billingAddress = this.billingAddress;
        if (this.claimNumber !== undefined) this.masterNumberData.claimNumber = this.claimNumber;

    console.log("Company Id ",this.companyId);
      console.log("Save Data...",this.masterNumberData);
      this.saveMasterNumber();
      this.modalRef.hide();
    }

    saveMasterNumber(){
      this.url=APIUrls.hosturl+APIUrls.SaveMasterData;
     this.http.post(this.url, this.masterNumberData)
        .subscribe(data=>{
         //this.setUserInfo(data);
          console.log("Successful Saved Data ", data);
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

    onCustomerChange(event){
      console.log("On CustomerChange ",event);
      this.customerSequenceId=event;
      this.customerBasicInfo=this.customersBasicInfo[event];
      console.log("OnCustomer Change ",this.customerBasicInfo.email);
      this.isLossAddressChanged();
      this.isBillingAddressChanged();
    }

    isLossAddressChanged(){
      if (this.isLossAddressSame){
        this.lossAddress=this.customerBasicInfo.address1+this.customerBasicInfo.address2+this.customerBasicInfo.city+this.customerBasicInfo.state+this.customerBasicInfo.zip;
        this.lossAddressDisabled="disabled";
      }else{
        this.lossAddress="";
        this.lossAddressDisabled="";
      }
  }
    isBillingAddressChanged(){
      if (this.isBillingAddressSame){
        this.billingAddress=this.customerBasicInfo.address1+this.customerBasicInfo.address2+this.customerBasicInfo.city+this.customerBasicInfo.state+this.customerBasicInfo.zip;
       this.billingAddressDisabled="disabled";
      }else{
        this.billingAddress="";
        this.billingAddressDisabled="";
      }
  }

    getDecodedAccessToken() {
      try{
        this.jwtToken=localStorage.getItem("jwtToken");
        this.tokenInfo= jwt_decode(this.jwtToken);
        console.log("Token info in Header", this.tokenInfo );
        //let tokenInfo = this.getDecodedAccessToken(token); // decode token
        //let expireDate = tokenInfo.exp; // get token expiration dateTime

      }
      catch(Error){
          return null;
      }
   }

/*
    getInsuranceCompanies(){
      this.persons0=[{ id: -1, firstName: "Select 01", lastName:"", phoneNo: "" }];
      this.url =APIUrls.hosturl+APIUrls.MasterNumberInsuranceCompanies
      this.http.get(this.url)
          .subscribe(data=>{
            this.myData=data;
            this.insuranceCompanies=this.myData.insuranceCompanies;
             for (this.i = 0; this.i < this.myData.insuranceCompanies.length; this.i++) {
                 this.insuranceCompanies[this.i].personBasicInfo=this.myData.insuranceCompanies[this.i].adjusters;
              }
          this.insuranceCompanies.splice(0, 0,    {	companyId:0, companyName:"Select Company", companyCode:"Select" ,companyHashCode:"",
             personBasicInfo:this.persons0} );
          },
          (err: HttpErrorResponse) => {
              this.isError=true;
              this.serverErrorMessage = Messages.ServerErrorMessage;
              if (err.error instanceof Error) {
                console.log("Client-side error occured.");
              } else {
                console.log("Server-side error occured.",err);
              }
            }
          );
    }
*/
     getCustomers(){
        this.url =APIUrls.hosturl+APIUrls.MasterNumberCustomers;
        this.http.get(this.url)
            .subscribe(data=>{
              this.myData=data;
              this.customersBasicInfo=this.myData.customerDetails;
              console.log("customer list",this.customersBasicInfo);
              this.customerBasicInfo=this.customersBasicInfo[0];
              this.customerSequenceId=0;
            },
            (err: HttpErrorResponse) => {
                this.isError=true;
                this.serverErrorMessage = Messages.ServerErrorMessage;
                if (err.error instanceof Error) {
                  console.log("Client-side error occured.");
                } else {
                  console.log("Server-side error occured.",err);
                }
              }
            );
      }
      getConfigurationData(){
        this.persons0=[{ id: -1, firstName: "Select 01", lastName:"", phoneNo: "" }];
        this.url =APIUrls.hosturl+APIUrls.MasterNumberConfigurationData;
        this.http.get(this.url)
            .subscribe(data=>{
              this.myData=data;
              this.configurationData=this.myData.configData;
              this.causeOfLossIds =  this.configurationData.filter(x => x.configName == "Cause of Loss");
              this.programTypeIds =  this.configurationData.filter(x => x.configName == "Program Type");
              this.yearBuiltIds =  this.configurationData.filter(x => x.configName == "Year Built");
            },
            (err: HttpErrorResponse) => {
                this.isError=true;
                this.serverErrorMessage = Messages.ServerErrorMessage;
                if (err.error instanceof Error) {
                  console.log("Client-side error occured.");
                } else {
                  console.log("Server-side error occured.",err);
                }
              }
            );
      }



}
