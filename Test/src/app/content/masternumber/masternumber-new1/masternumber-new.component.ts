import { Component,OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import {Router, ActivatedRoute} from '@angular/router';
import {HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';

import {InputMaskModule} from 'primeng/inputmask';

import {APIUrls} from '../../../shared/constants/apiurls';
import {TokenValue} from '../../../shared/services/httpcall/token.constant';
import {Messages} from '../../../shared/constants/messages';

import {AddressFormComponent} from '../../../shared/components/address/address-form.component';
import {BasicContactFormComponent} from '../../../shared/components/basic-contact/basic-contact.component';

import {AuthCheckService} from '../../../shared/services/auth-check.service';

import * as jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';

import {CustomerBasicInfo} from '../../../models/customer-basicinfo';
import {PersonBasicInfo} from '../../../models/person-basicinfo';
import {UserDetails} from '../../../models/user-details';
import {SimpleContact} from '../../../models/simple-contact';
import {OwnerDetails} from '../../../models/owner.interface';
import {IMasterNumberNewData} from '../../../models/masternumbernew.interface';
import {ContactDetails} from '../../../models/contact-details';
import {ConfigurationData} from '../../../models/config-data';
import {InsuranceCompanyDetails} from '../../../models/insurancecompany-details';
import {ProgramType} from '../../../models/program-type';
import {IAddress} from '../../../models/address.model';


import {AppConstants} from '../../../shared/constants/app-constants';

import {TitleTextService} from '../../../shared/services/titletext.service';

@Component({
  selector: 'add-masternumber',
  templateUrl: './masternumber-new.component.html',
})
export class AddMasterNumberComponent implements OnInit {

    @ViewChild(AddressFormComponent) customerAddressForm: AddressFormComponent
    @ViewChild(BasicContactFormComponent) contactForms:BasicContactFormComponent

    public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$';

      masterNumberHash:any;
      ownerDetails:OwnerDetails;
      customersBasicInfo:CustomerBasicInfo[];
      tempCustomerBasicinfo:CustomerBasicInfo;
      customerNames:any;
      customerMobileNumber:any;

      usaStates:any;
      filteredCustomerStates:any;
      saveCustomer:boolean;
      showSaveCustomer:boolean;

      selectedCustomerName:string;
      selectedOwner:any;
      customerBasicInfo:any;
      masterNumberData:any;
      defaultContact:ContactDetails;
      saveContactList:any;

      description:any;

      existingCustomer:boolean;
      agentName:any;
      adjusterName:any;
      salesRepresentativeName:any;
      tpaName:any;
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
      insurances:InsuranceCompanyDetails[];
      filteredInsuranceCompanys:InsuranceCompanyDetails[];
      allTpas:ContactDetails[];
      filteredTpasName:ContactDetails[];
      myData:any;

      selfPay:boolean;
      policyNumber:string;
      adjusters:ContactDetails[];
      agents:ContactDetails[];
      sales:ContactDetails[];
      tpas:ContactDetails[];
      companyId:number;
      adjusterId:number;
      agentId:number;
      saleId:number;
      tpaId:number;

      causeOfLossId:number;
      programTypeId:number;
      yearBuiltId:number;
      propertyType:string;
      claimNumber:string;
      configurationData:ConfigurationData[];
      causeOfLossIds:ConfigurationData[];
      programTypeIds:ConfigurationData[];
      yearBuiltIds:ConfigurationData[];
      programtypes:ProgramType[];

      customerAddress:string;
      isLossAddressSame:boolean;
      lossAddress:any;
      lossAddressDisabled:string;
      lossaddress1;string;
      lossAddressCity:string;
      lossAddressState:string;
      lossAddressZip:string;
      isBillingAddressSame:boolean;
      billingAddress:any;
      billingAddressDisabled:string
      billingAddressCity:string;
      billingAddressState:string;
      billingAddressZip:string;
      tenantName:string;
      tenantPhoneNumber:string;

      RSources: string[] = ['Facebook','On Call'];
      filteredSources: any[];
      RSource: string;

      filteredCustomerNames:string[];
      country:any;

      url:string;
      isError:boolean;
      serverErrorMessage:string;
      display: boolean = false;

      sub:any;
      custAddress:IAddress
  showDialog() {
      this.display = true;
  }

    constructor(private data:TitleTextService,
                private http: HttpClient,
                private router: Router,
                private route: ActivatedRoute,
                ) {
                  this.custAddress={address1:"",city:"", state:"",zip:""}
    }
    ngAfterViewInit(){
      console.log("Billing Address ", this.customerAddress);
  }

      ngOnInit() {

            this.customerBasicInfo={};
            this.lossAddress={};
            this.billingAddress={};
            this.saveContactList=[];
            this.existingCustomer=false;
            this.showSaveCustomer=true;
            this.selfPay=false;
            this.data.changeMessage("New Master");

            this.sub = this.route.params.subscribe(params => {
                 this.masterNumberHash = params['id']});

            if (this.masterNumberHash !== undefined){
              this.getMasterNumberDetails();
            }
            this.usaStates=AppConstants.USAStates;
            this.getCustomers();
            this.getInsuranceAgents();
            this.getAdjusters();
            this.getSales();
            this.getMangers();
            this.getReferredBy();
            this.getConfigData();
            this.getProgramType();
            this.getInsuranceCompanies();
            this.getTpa();
       }

      getMasterNumberDetails(){
            this.causeOfLossId=3;
            this.yearBuiltId=6;
            this.selfPay=true;
            this.customerBasicInfo={};
          //  this.customerBasicInfo.name=" Athena, frank";
            this.customerBasicInfo.lastName="Frank";
            this.customerBasicInfo.firstName="Athena";
            this.customerBasicInfo.email="atena@aa.com";
            this.data.changeMessage("Edit Master: "+this.masterNumberHash);

      }

    /* Customers */
    getCustomers(){
      this.customerNames=[];
       this.url =APIUrls.hosturl+APIUrls.MasterNumberCustomers;
       this.http.get(this.url)
           .subscribe(data=>{
             this.myData=data;
             this.customersBasicInfo=this.myData.customerDetails;
               for(let i=0;i<this.customersBasicInfo.length;i++){
                     this.customerNames[i]={"name":this.customersBasicInfo[i].firstName+" "+this.customersBasicInfo[i].lastName,
                   "id":this.customersBasicInfo[i].customerId};
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
 //               this.adjusterName=this.allAgents.filter(x => x.contactType == "Adjuster");

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
        console.log("Query is ",event.query)
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
        console.log("Query is ",event.query)
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
        console.log("Query is ",event.query)
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
        console.log("Query is ",event.query)
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
              this.allRbys[i].fullName=this.allRbys[i].firstName+" "+this.allRbys[i].lastName+" , "+this.allRbys[i].contactType;
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
      console.log("Query is ",event.query)
        this.filteredReferredBysName=[];
        for(let i = 0; i < this.allRbys.length; i++) {
            let agent = this.allRbys[i];
            if(agent.fullName.toLowerCase().indexOf(event.query.toLowerCase()) !==-1){
                this.filteredReferredBysName.push(agent);
            }
        }
    }

    /* Cause of Loss and Year Build and Program Type */
    getConfigData(){
      this.url =APIUrls.hosturl+APIUrls.MasterNumberConfigurationData;
     this.http.get(this.url)
         .subscribe(data=>{
           this.myData=data;
           this.configurationData=this.myData.configData;
           this.causeOfLossIds =  this.configurationData.filter(x => x.configName == "Cause of Loss");
          // this.programTypeIds =  this.configurationData.filter(x => x.configName == "Program Type");
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

     /* Progra, Types */
     getProgramType(){
      this.url =APIUrls.hosturl+APIUrls.MasterNumberProgramType;
      this.http.get(this.url)
          .subscribe(data=>{
            this.myData=data;
            this.programtypes=this.myData.programTypes;
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

     /*  Insurance Company */

     getInsuranceCompanies(){
      this.url =APIUrls.hosturl+APIUrls.MasterNumberInsuranceCompanies;
      this.http.get(this.url)
          .subscribe(data=>{
            this.myData=data;
            this.insurances=this.myData.insuranceCompanies;
            //console.log(this.insurances);
            // for (let i=0;i<this.insurances.length;i++){
            //   this.insurances[i].name=this.insurances[i].companyName;
            // }
            //console.log(this.insurances.length);
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

    filterIsuranceCompany(event){
      console.log("Query is ",event.query)
      this.filteredInsuranceCompanys=[];
      //console.log(this.insurances.length);
      for(let i = 0; i < this.insurances.length; i++) {
        //console.log(this.insurances[i]);
          let agent = this.insurances[i];
          if(agent.companyName.toLowerCase().indexOf(event.query.toLowerCase()) !==-1){
              this.filteredInsuranceCompanys.push(agent);
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
      console.log("Query is ",event.query)
        this.filteredTpasName=[];
        for(let i = 0; i < this.allTpas.length; i++) {
            let agent = this.allTpas[i];
            if(agent.fullName.toLowerCase().indexOf(event.query.toLowerCase()) !==-1){
                this.filteredTpasName.push(agent);
            }
        }
     }

     /* Form Save related Script */

     handleSubmit(f){
      console.log("FORM Values ... ",f);
    }
    saveData(f){

      this.masterNumberData={
        "restCompLocationId":1,
        "customerId":this.customerBasicInfo.customerId,
        "firstName":this.customerBasicInfo.firstName,
        "lastName":this.customerBasicInfo.lastName,
        "email":this.customerBasicInfo.email,
        "phoneNo":this.customerBasicInfo.phone1,
        "mobile":this.customerBasicInfo.mobile,
        "workPhoneNo":this.customerBasicInfo.workPhone,
        "address":this.customerBasicInfo.address1,
        "city":this.customerBasicInfo.city,
        "state":this.customerBasicInfo.state,
        "zip":this.customerBasicInfo.zip,
        //"newCustomer":this.saveCustomer,
      }
      console.log(this.customerBasicInfo);

      console.log("form values  ",f);

      if(this.customerBasicInfo.customerId === undefined)
          this.masterNumberData.newCustomer = true;
        else
          this.masterNumberData.newCustomer = false;

        if (this.saveCustomer !== undefined)
              this.masterNumberData.saveCustomer = this.saveCustomer;
          else
            this.masterNumberData.saveCustomer = false;
        if (this.tenantName !== undefined) this.masterNumberData.tenantName = this.tenantName;
        if (this.tenantPhoneNumber !== undefined) this.masterNumberData.tenantNumber = this.tenantPhoneNumber;


        if (this.isLossAddressSame!== undefined) this.masterNumberData.isLossAddressSame=this.isLossAddressSame;
             else   this.masterNumberData.isLossAddressSame=false;
        if (this.lossaddress1 !== undefined && this.lossaddress1.length>0)
                    this.masterNumberData.lossaddress1 = this.lossAddress.address1;

        if (this.lossAddressCity !== undefined && this.lossAddressCity.length>0) this.masterNumberData.lossAddressCity = this.lossAddressCity;
        if (this.lossAddressState !== undefined && this.lossAddressState.length>0) this.masterNumberData.lossAddressState = this.lossAddressState;
        if (this.lossAddressZip !== undefined && this.lossAddressZip.length>0) this.masterNumberData.lossAddressZip = this.lossAddressZip;

        /* Start of Billing Address */
        // if (this.isBillingAddressSame!== undefined) this.masterNumberData.isBillingAddressSame=this.isBillingAddressSame;
        //      else   this.masterNumberData.isBillingAddressSame=false;
        // if (this.billingAddress !== undefined && this.billingAddress.length>0)
        //             this.masterNumberData.billingAddress = this.billingAddress.address1;

        // if (this.billingAddressCity !== undefined && this.billingAddressCity.length>0) this.masterNumberData.billingAddressCity = this.billingAddressCity;
        // if (this.billingAddressState !== undefined && this.billingAddressState.length>0) this.masterNumberData.billingAddressState = this.billingAddressState;
        // if (this.billingAddressZip !== undefined && this.billingAddressZip.length>0) this.masterNumberData.billingAddressZip = this.billingAddressZip;


        if (this.causeOfLossId !== undefined) this.masterNumberData.causeOfLoss = this.causeOfLossId;
        if (this.yearBuiltId !== undefined) this.masterNumberData.yearBuilt = this.yearBuiltId;
        if (this.programTypeId !== undefined) this.masterNumberData.programType = this.programTypeId;
        if (this.propertyType !== undefined) this.masterNumberData.propertyType = this.propertyType;
        if (this.description !== undefined) this.masterNumberData.description = this.description;


        if (this.selfPay !== undefined) this.masterNumberData.selfPay = this.selfPay;

        if (this.insuranceCompany !== undefined) this.masterNumberData.insuranceCompanyId = this.insuranceCompany.companyId;
        if (this.claimNumber !== undefined) this.masterNumberData.claimNumber = this.claimNumber;
        if (this.policyNumber !== undefined) this.masterNumberData.policyNumber = this.policyNumber;

        this.saveContactList=[];
        this.saveContactList.length=0;

         if (this.adjusterName!== undefined && this.adjusterName.id !== undefined){
             this.saveContactList.unshift({"contactId":this.adjusterName.id, "userId":"-1" , "contactType":"Adjuster"});
          }

        if (this.agentName !== undefined && this.agentName.id !== undefined ){
           this.saveContactList.unshift({"contactId":this.agentName.id,"userId":"-1" ,"contactType":"Insurance Agent"});
        }

        if (this.salesRepresentativeName!== undefined && this.salesRepresentativeName.id !== undefined){
          this.saveContactList.unshift({"contactId":this.salesRepresentativeName.id, "userId":"-1" , "contactType":"Sales Representative"});
        }

        if (this.tpaName!== undefined && this.tpaName.id !== undefined){
           this.saveContactList.unshift({"contactId":this.tpaName.id, "userId":"-1" , "contactType":"Third Party Administrator"});
        }


        console.log("ContactList length ",this.saveContactList.length);

      if (this.saveContactList.length>0) this.masterNumberData.contacts=  this.saveContactList;


      console.log("Save Data...",this.masterNumberData);
      this.saveMasterNumber();
    }

    saveMasterNumber(){

      const headers = new HttpHeaders().set('Authorization','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1MTk3MzEyNTEsImxhc3ROYW1lIjoiSmFpbiIsImVtYWlsIjpudWxsLCJ1c2VySWQiOjEsImNvbXBhbnkiOjEsInByb2ZpbGVQaWMiOm51bGwsImZpcnN0TmFtZSI6IlNhcmFoIiwiaWF0IjoxNTE5MTI2NDUxLCJtb2JpbGUiOm51bGx9.s1mox0W4LUR7s0opYqypPaTc6hSzp6qHZ2HQ3JiWnIXNJy_iYYlsOVdJhqhQeQ4U_zk5a68bBBgtNyDDR2WWRw' );


      const httpOptions = { headers: new HttpHeaders({
              'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1MTk3MzEyNTEsImxhc3ROYW1lIjoiSmFpbiIsImVtYWlsIjpudWxsLCJ1c2VySWQiOjEsImNvbXBhbnkiOjEsInByb2ZpbGVQaWMiOm51bGwsImZpcnN0TmFtZSI6IlNhcmFoIiwiaWF0IjoxNTE5MTI2NDUxLCJtb2JpbGUiOm51bGx9.s1mox0W4LUR7s0opYqypPaTc6hSzp6qHZ2HQ3JiWnIXNJy_iYYlsOVdJhqhQeQ4U_zk5a68bBBgtNyDDR2WWRw'
        })
      };
        let jsonObj = <JSON>this.masterNumberData;

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
      if (this.selectedOwner!==null){
            for(let i=0;i<this.customersBasicInfo.length;i++){
              if (this.customersBasicInfo[i].customerId== this.selectedOwner.id) {
                    this.tempCustomerBasicinfo= this.customersBasicInfo[i];
                    this.customerBasicInfo=this.tempCustomerBasicinfo;
                    this.custAddress.address1=this.customerBasicInfo.address1;
                    this.custAddress.city=this.customerBasicInfo.city;
                    this.custAddress.state=this.customerBasicInfo.state;
                    this.custAddress.zip=this.customerBasicInfo.zip;
                    this.existingCustomer=true;
                    this.isLossAddressChanged();
                    this.isBillingAddressChanged();
                    this.showSaveCustomer=false;
                    break;
                }
             }
         }
    }


    onCustomerClear($event){
         this.customerBasicInfo={};
         this.existingCustomer=false;
         this.showSaveCustomer=true;
         this.isLossAddressChanged();
         this.isBillingAddressChanged();
         this.custAddress={address1:"",city:"", state:"",zip:""}
     }

    onCustomerBlur($event){
       if (this.selectedOwner == null){
        this.onCustomerClear($event);
      }
    }

    isLossAddressChanged(){
        if (this.isLossAddressSame && this.customerBasicInfo){
          this.lossaddress1=this.customerBasicInfo.address1;
          this.lossAddressCity=this.customerBasicInfo.city;
          this.lossAddressState=this.customerBasicInfo.state;
          this.lossAddressZip=this.customerBasicInfo.zip;
          this.lossAddressDisabled="disabled";
        }else{
//          this.lossAddress={};
         this.lossaddress1="";
          this.lossAddressCity="";
          this.lossAddressState="";
          this.lossAddressZip="";
          this.lossAddressDisabled="disabled";

          this.lossAddressDisabled="";
        }
    }
    isBillingAddressChanged(){
        if (this.isBillingAddressSame  && this.customerBasicInfo){
          // this.billingAddress=this.customerBasicInfo.address1;
          // this.billingAddressCity=this.customerBasicInfo.city;
          // this.billingAddressState=this.customerBasicInfo.state;
          // this.billingAddressZip=this.customerBasicInfo.zip;
          // this.billingAddressDisabled="disabled";
          this.billingAddress.address1=this.customerBasicInfo.address1;
          this.billingAddress.city=this.customerBasicInfo.city;
          this.billingAddress.state=this.customerBasicInfo.state;
          this.billingAddress.zip=this.customerBasicInfo.zip;
          this.billingAddressDisabled="disabled";
        }else{
          this.billingAddress={};

          // this.billingAddress="";
          // this.billingAddressCity="";
          // this.billingAddressState="";
          // this.billingAddressZip="";
          //this.lossAddressDisabled="disabled";

          this.billingAddressDisabled="";
        }
     }

    filterCustomer(event) {
      let query = event.query;
      let filtered : any[] = [];
        for(let i = 0; i < this.customerNames.length; i++) {
          let customer = this.customerNames[i];
            if(customer.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(customer);
            }
        }
        this.filteredCustomerNames=filtered;
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
          this.filteredCustomerStates=filtered;
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
}




