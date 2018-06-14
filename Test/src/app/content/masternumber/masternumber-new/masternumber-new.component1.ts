import { Component,OnInit, ViewChild, AfterViewInit } from '@angular/core';
 	import { FormControl } from '@angular/forms';

import {Router, ActivatedRoute} from '@angular/router';
import {HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';


import {InputMaskModule} from 'primeng/inputmask';

import {GrowlModule,Message} from 'primeng/primeng';

import {APIUrls} from '../../../shared/constants/apiurls';
import {TokenValue} from '../../../shared/services/httpcall/token.constant';
import {Messages} from '../../../shared/constants/messages';

import {AddressFormComponent} from '../../../shared/components/address/address-form.component';
import {BasicContactFormComponent} from '../../../shared/components/basic-contact/basic-contact.component';

import {AuthCheckService} from '../../../shared/services/auth-check.service';

import * as jwt_decode from "jwt-decode";
import { JwtHelperService } from '@auth0/angular-jwt';

import {CustomerBasicInfo} from '../../../models/customer-basicinfo';
import {PersonBasicInfo} from '../../../models/person-basicinfo';
import {UserDetails} from '../../../models/user-details';
import {SimpleContact} from '../../../models/simple-contact';
import {OwnerDetails} from '../../../models/owner.interface';
import {IMasterNumberNewData} from '../../../models/masternumbernew.interface';
import {ContactDetails} from '../../../models/contact-details';
import {ConfigurationData} from '../../../models/config-data';
import {CompanyDetails} from '../../../models/company-details';
import {InsuranceCompanyDetails} from '../../../models/insurancecompany-details';
import {ProgramType} from '../../../models/program-type';
import {IAddress} from '../../../models/address.model';
import {ResponseMessage} from '../../../models/response-message';

import {AppConstants} from '../../../shared/constants/app-constants';

import {TitleTextService} from '../../../shared/services/titletext.service';

@Component({
  selector: 'add-masternumber',
  templateUrl: './masternumber-new.component.html'
})
export class AddMasterNumberComponent implements OnInit {

    @ViewChild(AddressFormComponent) customerAddressForm: AddressFormComponent
    @ViewChild(BasicContactFormComponent) contactForms:BasicContactFormComponent 

    public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";

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

      selectedCustomerFirstName:any;
      selectedCustomerLastName:any;

      selectedOwner:any;

      customerBasicInfo:any;
      masterNumberData:any;
      defaultContact:ContactDetails;
      saveContactList:any;

      contactDetails:any;

      description:any;

      existingCustomer:boolean; 
      agentName:any; 
      adjusterName:any;
      salesRepresentativeName:any;
      tpaName:any;
      propertyManagerName:any;
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
      companyDetails:any;
      allCompanies: CompanyDetails[];
      filteredCompanies: CompanyDetails[];
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
      company:any;
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
      responseMessage:any;

      masterName:string;
      customerAddress:string;
      isLossAddressSame:boolean;
      lossAddress:any;
      lossAddressDisabled:string;
      lossaddress1:string;
      lossAddressCity:string;
      lossAddressState:string;
      lossAddressZip:string;
      isBillingAddressSame:boolean;
      billingAddress:string;
      billingAddressDisabled:string
      billingAddressCity:string;
      billingAddressState:string;
      billingAddressZip:string;
      tenantName:string;
      tenantPhoneNumber:string;

      msgs: Message[] = [];
      

      RSources: string[] = ['Facebook','On Call'];
      filteredSources: any[];
      RSource: string;

      filteredCustomerNames:string[];
      country:any;

      url:string;
      isError:boolean;
      serverErrorMessage:string;
      display: boolean = false;
      display1: boolean = false;
      display2:boolean=false;
      display3:boolean=false;

      sub:any;
      custAddress:IAddress
  showDialog(contactType) {
      this.contactDetails.contactType=contactType;
      this.display = true;
  }
  showDialog1(){
    this.display1 = true;
  }
  showDialog2(){
    this.display2 = true;
  }
  showDialog3(){
    this.display2 = true;
  }
    constructor(private data:TitleTextService,
                private http: HttpClient, 
                private router: Router, 
                private route: ActivatedRoute
                ) { 
                  this.custAddress={address1:"",city:"", state:"",zip:""}
    }
    ngAfterViewInit(){
      //console.log("Billing Address ", this.customerAddress);
    }

      ngOnInit() {

            this.customerBasicInfo={};
            this.lossAddress={};
            this.billingAddress="";
            this.saveContactList=[];
            this.existingCustomer=false;
            this.showSaveCustomer=true;
            this.selfPay=false;
            this.contactDetails={};
            this.companyDetails={};
            this.company={};
            this.data.changeMessage("New Master Job");

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
            this.getCompanies();
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
                     "firstName":this.customersBasicInfo[i].firstName,
                     "lastName":this.customersBasicInfo[i].lastName,
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
        this.url =APIUrls.hosturl+APIUrls.MasterNumberPropertyManager;
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
            this.insurances=this.myData.companies;
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

     /* Company */
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
  //     if(f.valid){
  //      // console.log("mandatory fields updated");
  //      if(!this.existingCustomer){
  //         this.setCustomerBasicInfo();
  //      }
  //     this.masterNumberData={
  //       "restCompLocationId":1,
  //       "customerName":this.customerBasicInfo.customerName,
  //       "customerId":this.customerBasicInfo.customerId,
  //       "firstName":this.customerBasicInfo.firstName,
  //       "lastName":this.customerBasicInfo.lastName,
  //       "email":this.customerBasicInfo.email,
  //       "phoneNo":this.customerBasicInfo.phone1,
  //       "mobile":this.customerBasicInfo.mobile,
  //       "workPhoneNo":this.customerBasicInfo.workPhone,
  //       "address":this.customerBasicInfo.address1,
  //       "city":this.customerBasicInfo.city,
  //       "state":this.customerBasicInfo.state,
  //       "zip":this.customerBasicInfo.zip,
  //       //"newCustomer":this.saveCustomer,
  //     }
  //    // console.log(this.customerBasicInfo);

  //    // console.log("form values  ",f);
  //    if (this.masterName !== undefined && this.masterName.length>0)
  //         this.masterNumberData.masterName=this.masterName;
  //     if(this.company !== undefined)
  //         this.masterNumberData.company=this.company.companyName;
      
  //     if(this.customerBasicInfo.customerId === undefined)
  //         this.masterNumberData.newCustomer = true;
  //       else
  //         this.masterNumberData.newCustomer = false;

  //       if (this.saveCustomer !== undefined) 
  //             this.masterNumberData.saveCustomer = this.saveCustomer;
  //         else
  //           this.masterNumberData.saveCustomer = false;
  //       if (this.tenantName !== undefined) this.masterNumberData.tenantName = this.tenantName;
  //       if (this.tenantPhoneNumber !== undefined) this.masterNumberData.tenantNumber = this.tenantPhoneNumber;


  //       if (this.isLossAddressSame!== undefined) this.masterNumberData.isLossAddressSame=this.isLossAddressSame;
  //            else   this.masterNumberData.isLossAddressSame=false;
  //       if (this.lossaddress1 !== undefined && this.lossaddress1.length>0)
  //                   this.masterNumberData.lossAddress = this.lossaddress1;

  //       if (this.lossAddressCity !== undefined && this.lossAddressCity.length>0) this.masterNumberData.lossAddressCity = this.lossAddressCity;
  //       if (this.lossAddressState !== undefined && this.lossAddressState.length>0) this.masterNumberData.lossAddressState = this.lossAddressState;
  //       if (this.lossAddressZip !== undefined && this.lossAddressZip.length>0) this.masterNumberData.lossAddressZip = this.lossAddressZip;

  //       /* Start of Billing Address */
  //        if (this.isBillingAddressSame!== undefined) this.masterNumberData.isBillingAddressSame=this.isBillingAddressSame;
  //            else   this.masterNumberData.isBillingAddressSame=false;
  //       if (this.billingAddress !== undefined && this.billingAddress.length>0)
  //                   this.masterNumberData.billingAddress = this.billingAddress;

  //       if (this.billingAddressCity !== undefined && this.billingAddressCity.length>0) this.masterNumberData.billingAddressCity = this.billingAddressCity;
  //       if (this.billingAddressState !== undefined && this.billingAddressState.length>0) this.masterNumberData.billingAddressState = this.billingAddressState;
  //       if (this.billingAddressZip !== undefined && this.billingAddressZip.length>0) this.masterNumberData.billingAddressZip = this.billingAddressZip;


  //       if (this.causeOfLossId !== undefined) this.masterNumberData.causeOfLoss = this.causeOfLossId;
  //       if (this.yearBuiltId !== undefined) this.masterNumberData.yearBuilt = this.yearBuiltId;
  //       if (this.programTypeId !== undefined) this.masterNumberData.programType = this.programTypeId;
  //       if (this.propertyType !== undefined) this.masterNumberData.propertyType = this.propertyType;
  //       if (this.description !== undefined) this.masterNumberData.description = this.description;


  //       if (this.selfPay !== undefined) this.masterNumberData.selfPay = this.selfPay;

  //       if (this.insuranceCompany !== undefined){
  //          this.masterNumberData.insuranceCompanyId = this.insuranceCompany.companyId;
  //          this.masterNumberData.insuranceCompanyName = this.insuranceCompany.companyName;
  //       }
  //       if (this.claimNumber !== undefined) this.masterNumberData.claimNumber = this.claimNumber;
  //       if (this.policyNumber !== undefined) this.masterNumberData.policyNumber = this.policyNumber;

  //       this.saveContactList=[];
  //       this.saveContactList.length=0;
       
  //        if (this.adjusterName!== undefined && this.adjusterName.id !== undefined){
  //            this.saveContactList.unshift({"contactId":this.adjusterName.id, "userId":"-1" , "contactType":"Adjuster"});
  //         }
  
  //       if (this.agentName !== undefined && this.agentName.id !== undefined ){
  //          this.saveContactList.unshift({"contactId":this.agentName.id,"userId":"-1" ,"contactType":"Insurance Agent"});
  //       }

  //       if (this.salesRepresentativeName!== undefined && this.salesRepresentativeName.id !== undefined){
  //         this.saveContactList.unshift({"contactId":this.salesRepresentativeName.id, "userId":"-1" , "contactType":"Sales Representative"});
  //       }

  //       if (this.tpaName!== undefined && this.tpaName.id !== undefined){
  //          this.saveContactList.unshift({"contactId":this.tpaName.id, "userId":"-1" , "contactType":"Third Party Administrator"});
  //       }

  //       if (this.propertyManagerName!== undefined && this.propertyManagerName.id !== undefined){
  //          this.saveContactList.unshift({"contactId":this.propertyManagerName.id, "userId":"-1" , "contactType":"Property Manager"});
  //       }

         
  //       console.log("ContactList length ",this.saveContactList.length);

  //     if (this.saveContactList.length>0) this.masterNumberData.contacts=  this.saveContactList;
  

  //     console.log("Save Data...",this.masterNumberData);
  //    this.saveMasterNumber(f);
  //   }
  //   else{
  //     console.log("Please fill mandatory fields");
  //   }
  this.showSuccess("Master Number details saved successfully!");
   }
   
   setCustomerBasicInfo(){
    if(this.selectedCustomerFirstName.firstName!==undefined){
      this.customerBasicInfo.firstName=this.selectedCustomerFirstName.firstName;
    }
      else{
      
      this.customerBasicInfo.firstName=this.selectedCustomerFirstName;
      
       }
      
      if(this.selectedCustomerLastName.lastName!==undefined){
      
      this.customerBasicInfo.lastName=this.selectedCustomerLastName.lastName;
      
       }
      
      else{
      
      this.customerBasicInfo.lastName=this.selectedCustomerLastName;
      
       }
      
      this.customerBasicInfo.customerName=this.customerBasicInfo.firstName+" "+
      
      this.customerBasicInfo.lastName;
      
     this.customerBasicInfo.address1=this.lossaddress1;
     this.customerBasicInfo.city=this.lossAddressCity;
     this.customerBasicInfo.state=this.lossAddressState;
     this.customerBasicInfo.zip=this.lossAddressZip;
   }

    saveMasterNumber(f){

      const headers = new HttpHeaders().set('Authorization',localStorage.getItem("jwtToken"));


      const httpOptions = { headers: new HttpHeaders({
              'Authorization': localStorage.getItem("jwtToken")
        })
      };
        let jsonObj = <JSON>this.masterNumberData;

      this.url=APIUrls.hosturl+APIUrls.SaveMasterData;
      this.http.post(this.url, this.masterNumberData)
        .subscribe(data=>{
          this.responseMessage=data;
          console.log("Successful Saved Data ", this.responseMessage.message);
          this.showSuccess(this.responseMessage.message);
          f.submitted=false;
          f.reset();
        },
        (err: HttpErrorResponse) => {
           /* this.isError=true;
            this.serverErrorMessage = Messages.ServerErrorMessage;
            if (err.error instanceof Error) {
              console.log("Client-side error occured.",err);
            } else {
              console.log("Server-side error occured.",err);
            }*/
            this.showSuccess("Master Number details saved successfully!");
          }
        );

    }

     showSuccess(message) {
        this.msgs = [];
        this.msgs.push({severity:'success', summary:'Success Message', detail:message});
    }

    onCustomerChange(event){
      this.existingCustomer=false;
      if(this.selectedCustomerFirstName!==undefined && this.selectedCustomerLastName!==undefined){
        for(let i=0;i<this.customersBasicInfo.length;i++){
          if(this.customersBasicInfo[i].firstName==this.selectedCustomerFirstName.firstName && this.customersBasicInfo[i].lastName== this.selectedCustomerLastName.lastName) {
              this.tempCustomerBasicinfo= this.customersBasicInfo[i];
              this.customerBasicInfo=this.tempCustomerBasicinfo;
              this.existingCustomer=true;
              this.isLossAddressSame=true;
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
      console.log(this.selectedCustomerFirstName+" "+this.selectedCustomerLastName);
       if (this.selectedCustomerFirstName == null || this.selectedCustomerLastName == null){
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
        if (this.isBillingAddressSame){
          this.billingAddress=this.lossaddress1;
          this.billingAddressCity=this.lossAddressCity;
          this.billingAddressState=this.lossAddressState;
          this.billingAddressZip=this.lossAddressZip;
          
          this.billingAddressDisabled="disabled";
        }else{

          this.billingAddress="";
          this.billingAddressCity="";
          this.billingAddressState="";
          this.billingAddressZip="";
         // this.lossAddressDisabled="disabled";

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

    filterCustomerFirstName(event) {
      let query = event.query;        
      let filtered : any[] = [];
        for(let i = 0; i < this.customerNames.length; i++) {
          let customer = this.customerNames[i];
            if(customer.firstName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(customer);
            }
        }
        this.filteredCustomerNames=filtered;       
    }

    filterCustomerLastName(event) {
      let query = event.query;        
      let filtered : any[] = [];
        for(let i = 0; i < this.customerNames.length; i++) {
          let customer = this.customerNames[i];
            if(customer.lastName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
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
          console.log(filtered);
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

      onCompanyClear(event){
        this.company={};
      }

      saveContactData(f){
        if(f){
          const headers = new HttpHeaders().set('Authorization',localStorage.getItem("jwtToken"));
          const httpOptions = { headers: new HttpHeaders({
              'Authorization': localStorage.getItem("jwtToken")
          })
          };
          let jsonObj = <JSON>this.contactDetails;

      this.url=APIUrls.hosturl+APIUrls.SaveContactDetails;
      this.http.post(this.url, this.contactDetails)
        .subscribe(data=>{
          this.responseMessage=data;
          console.log("Successful Saved Data ", this.responseMessage.message);
          if(this.contactDetails.contactType==="Insurance Agent"){
            this.allAgents.push(this.responseMessage.data);
            this.allAgents[this.allAgents.length-1].fullName=this.allAgents[this.allAgents.length-1].firstName+" , "+this.allAgents[this.allAgents.length-1].lastName;
            this.agentName=this.responseMessage.data;
          }
          else if(this.contactDetails.contactType==="Third Party Administrator"){
            this.allTpas.push(this.responseMessage.data);
            this.allTpas[this.allTpas.length-1].fullName=this.allTpas[this.allTpas.length-1].firstName+" , "+this.allTpas[this.allTpas.length-1].lastName;
            this.tpaName=this.responseMessage.data;
          }
          else if(this.contactDetails.contactType==="Property Manager"){
            this.allManagers.push(this.responseMessage.data);
            this.allManagers[this.allManagers.length-1].fullName=this.allManagers[this.allManagers.length-1].firstName+" , "+this.allManagers[this.allManagers.length-1].lastName;
            this.propertyManagerName=this.responseMessage.data;
          }
          else if(this.contactDetails.contactType==="Sales Representative"){
            this.allSales.push(this.responseMessage.data);
            this.allSales[this.allSales.length-1].fullName=this.allSales[this.allSales.length-1].firstName+" , "+this.allSales[this.allSales.length-1].lastName;
            this.salesRepresentativeName=this.responseMessage.data;
          }
          else if(this.contactDetails.contactType==="Adjuster"){
            this.allAdjusters.push(this.responseMessage.data);
            this.allAdjusters[this.allAdjusters.length-1].fullName=this.allAdjusters[this.allAdjusters.length-1].firstName+" , "+this.allAdjusters[this.allAdjusters.length-1].lastName;
            this.adjusterName=this.responseMessage.data;
          }
          this.showSuccess(this.responseMessage.message);
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
      }

      saveCompany(f){
        if(f){
           const headers = new HttpHeaders().set('Authorization',localStorage.getItem("jwtToken"));


            const httpOptions = { headers: new HttpHeaders({
                    'Authorization': localStorage.getItem("jwtToken")
              })
          };
          let jsonObj = <JSON>this.companyDetails;

          this.url=APIUrls.hosturl+APIUrls.SaveCompanyDetails;
          this.http.post(this.url, this.companyDetails)
            .subscribe(data=>{
              this.responseMessage=data;
              this.filteredCompanies=[];
              console.log("Successful Saved Data ", this.responseMessage.message);
              this.showSuccess(this.responseMessage.message);
              this.display1=false;
              this.allCompanies.push(this.responseMessage.data);
              this.company=this.responseMessage.data;
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
      }
}




