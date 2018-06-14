import { Component, OnInit, Input, Output,EventEmitter,ViewChild } from '@angular/core';
import {MasterNumberData} from '../../../models/masternumber-data';
import {HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {APIUrls} from '../../../shared/constants/apiurls';
import {CustomerBasicInfo} from '../../../models/customer-basicinfo';
import {CompanyDetails} from '../../../models/company-details';
import {InsuranceDetails} from '../../../models/insurance-details';
import {ConfigurationData} from '../../../models/config-data';
import {ProgramType} from '../../../models/program-type';
import {GrowlModule,Message} from 'primeng/primeng';

import {Messages} from '../../../shared/constants/messages';
import {AddressFormComponent} from '../../../shared/components/address/address-form.component';

@Component({
  selector: 'masternumber-popup',
  templateUrl: './masternumber-popup.component.html',
})


export class MasterNumberPopUpComponent implements OnInit {
  @Input() insurances: InsuranceDetails;
  masterNumberData: MasterNumberData;
  customerNames:any;
  myData:any;
  url:string;
  isError:boolean;
  serverErrorMessage:string;

  customersBasicInfo:CustomerBasicInfo[];
  customerBasicInfo:any;

  allCompanies: CompanyDetails[];
  filteredCompanies: CompanyDetails[];
  company: any;
  lossAddress: any;
  billingAddress: any;
  display: boolean = false;

  insuranceCompanies: CompanyDetails[];
  filteredInsuranceCompanys: CompanyDetails[];
  insuranceCompany:any;
  selfPay: boolean = false;
  causeOfLossIds:ConfigurationData[];
  programtypes:ProgramType[];
  yearBuiltIds:ConfigurationData[];
  configurationData: ConfigurationData[];
  causeOfLossId: number;
  yearBuiltId: number;
  programTypeId: number;
  billingAddressDisabled: string;
  showSaveCustomer:boolean = false;
  display1:boolean = false;
  companyDetails:any;
  msgs: Message[] = [];
  //  @ViewChild(AddressFormComponent)
  //   private addressComponent: AddressFormComponent[];
  @Output() update = new EventEmitter<any>();
  @ViewChild('lossAddr')
  lossAddr: AddressFormComponent;

  @ViewChild('billingAddr')
  billingAddr: AddressFormComponent;

  // onClose(){
  //     this.display = false;
  // }
  constructor( private http: HttpClient) {
  }

  @Input()
  set masterNumberDetails(masterNumberDetails: MasterNumberData){
    this.masterNumberData=masterNumberDetails;
     this.lossAddress={};
     this.lossAddress.address1=this.masterNumberData.lossAddress;
     this.lossAddress.city=this.masterNumberData.lossAddressCity;
     this.lossAddress.state=this.masterNumberData.lossAddressState;
     this.lossAddress.zip=this.masterNumberData.lossAddressZip;
     this.billingAddress={};
     this.billingAddress.address1=this.masterNumberData.billingAddress;
     this.billingAddress.city=this.masterNumberData.billingAddressCity;
     this.billingAddress.state=this.masterNumberData.billingAddressState;
     this.billingAddress.zip=this.masterNumberData.billingAddressZip;
  }
 
  showDialog() {
    this.display = true;
  }
 
  ngOnInit(): void {
    this.getCustomerDetails();
    this.getCompanies(); 
    this.getInsuranceCompanies();   
    this.getConfigData();
    this.getProgramType();
    this.companyDetails={};
  }

   getCustomerDetails(){
     const params = new HttpParams().set('mastNumHash',this.masterNumberData.mastNumHash);
      this.customerNames=[];
       this.url =APIUrls.hosturl+APIUrls.MasterNumberCustomerDetails;
       this.http.get(this.url,{params:params})
           .subscribe(data=>{
             this.myData=data;
             this.customerBasicInfo=this.myData.data;
             console.log(this.customerBasicInfo);
              //  for(let i=0;i<this.customersBasicInfo.length;i++){
              //        this.customerNames[i]={"name":this.customersBasicInfo[i].firstName+" "+this.customersBasicInfo[i].lastName,
              //        "firstName":this.customersBasicInfo[i].firstName,
              //        "lastName":this.customersBasicInfo[i].lastName,
              //        "id":this.customersBasicInfo[i].customerId};
              //  }
              // console.log(this.customersBasicInfo);
              //  this.customerBasicInfo=this.customersBasicInfo.filter(x => x.customerId == this.masterNumberData.customerId)[0];
               
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

     getCompanies(){
      this.url =APIUrls.hosturl+APIUrls.MasterNumberCompanies;
      this.http.get(this.url)
          .subscribe(data=>{
            this.myData=data;
            this.allCompanies=this.myData.companies;
            this.company=this.allCompanies.filter(x => x.companyName == this.masterNumberData.company)[0];
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
      this.filteredCompanies=[];
      for(let i = 0; i < this.allCompanies.length; i++) {
          let agent = this.allCompanies[i];
          if(agent.companyName.toLowerCase().indexOf(event.query.toLowerCase()) !==-1){
              this.filteredCompanies.push(agent);
          }
      }
     }

     getInsuranceCompanies(){
      this.url =APIUrls.hosturl+APIUrls.MasterNumberInsuranceCompanies;
      this.http.get(this.url)
          .subscribe(data=>{
            this.myData=data;
            this.insuranceCompanies=this.myData.companies;
            if(this.insurances!=null){
              this.insuranceCompany=this.insuranceCompanies.filter(x => x.companyName == this.insurances.insuranceCompanyName)[0];
              this.selfPay=false;
            }
            else{
              this.insurances=new InsuranceDetails();
              this.selfPay=true;
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
    
    filterIsuranceCompany(event){
      console.log("Query is ",event.query)
      this.filteredInsuranceCompanys=[];
      for(let i = 0; i < this.insuranceCompanies.length; i++) {
          let company = this.insuranceCompanies[i];
          if(company.companyName.toLowerCase().indexOf(event.query.toLowerCase()) !==-1){
              this.filteredInsuranceCompanys.push(company);
          }
      }
    }

    getConfigData(){
      this.url =APIUrls.hosturl+APIUrls.MasterNumberConfigurationData;
     this.http.get(this.url)
         .subscribe(data=>{
           this.myData=data;
           this.configurationData=this.myData.configData;
           this.causeOfLossIds =  this.configurationData.filter(x => x.configName == "Cause of Loss");
           if(this.masterNumberData.causeOfLoss!=null)
           this.causeOfLossId=this.causeOfLossIds.filter(x => x.configValue == this.masterNumberData.causeOfLoss)[0].configId;
           this.yearBuiltIds =  this.configurationData.filter(x => x.configName == "Year Built");
           if(this.masterNumberData.yearBuilt!=null)
           this.yearBuiltId=this.yearBuiltIds.filter(x => x.configValue == this.masterNumberData.yearBuilt)[0].configId;
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
     
     getProgramType(){
      this.url =APIUrls.hosturl+APIUrls.MasterNumberProgramType;
      this.http.get(this.url)
          .subscribe(data=>{
            this.myData=data;
            this.programtypes=this.myData.programTypes;
            if(this.masterNumberData.programType!=null)
            this.programTypeId=this.programtypes.filter(x => x.programType == this.masterNumberData.programType)[0].programTypeId;
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

     isBillingAddressChanged(){
        if (this.masterNumberData.billingAddressSame){
          this.billingAddr.address.address1=this.lossAddr.address.address1;
          this.billingAddr.address.city=this.lossAddr.address.city;
          this.billingAddr.address.state=this.lossAddr.address.state;
          this.billingAddr.address.zip=this.lossAddr.address.zip;
          
          this.billingAddr.isAddressSame=true;
        }else{

          this.billingAddr.isAddressSame=false;
        }
     }

     showDialog1(){
        this.display1=true;
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
              this.myData=data;
              this.filteredCompanies=[];
              console.log("Successful Saved Data ", this.myData.message);
              this.showSuccess(this.myData.message);
              this.display1=false;
              this.allCompanies.push(this.myData.data);
              this.company=this.myData.data;
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

    showSuccess(message) {
        this.msgs = [];
        this.msgs.push({severity:'success', summary:'Success Message', detail:message});
    }

    updateMasterNumber(){
      
      let mastNumData: any;
      mastNumData={
        "customerId":this.customerBasicInfo.customerId,
        "customerName":this.customerBasicInfo.customerName,
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
     
     if (this.masterNumberData.masterName !== undefined && this.masterNumberData.masterName!=null)
          mastNumData.masterName=this.masterNumberData.masterName;
      if(this.company !== undefined)
          mastNumData.company=this.company.companyName;

        // if (this.saveCustomer !== undefined) 
        //       this.masterNumberData.saveCustomer = this.saveCustomer;
        //   else
        //     this.masterNumberData.saveCustomer = false;
        if (this.masterNumberData.tenantName !== undefined) mastNumData.tenantName = this.masterNumberData.tenantName;
        if (this.masterNumberData.tenantNumber !== undefined) mastNumData.tenantNumber = this.masterNumberData.tenantNumber;

        if (this.masterNumberData.billingAddressSame!== undefined) mastNumData.billingAddressSame=this.masterNumberData.billingAddressSame;
             else   mastNumData.billingAddressSame=false;
        if (this.lossAddr.address.address1 !== undefined && this.lossAddr.address.address1!=null)
                    mastNumData.lossAddress = this.lossAddr.address.address1;

        if (this.lossAddr.address.city !== undefined && this.lossAddr.address.city!=null) mastNumData.lossAddressCity = this.lossAddr.address.city;
        if (this.lossAddr.address.state !== undefined && this.lossAddr.address.state!=null) mastNumData.lossAddressState = this.lossAddr.address.state;
        if (this.lossAddr.address.zip !== undefined && this.lossAddr.address.zip!=null) mastNumData.lossAddressZip = this.lossAddr.address.zip;

        /* Start of Billing Address */
    
        if (this.billingAddr.address.address1 !== undefined && this.billingAddr.address.address1!=null)
                    mastNumData.billingAddress = this.billingAddr.address.address1;

        if (this.billingAddr.address.city !== undefined && this.billingAddr.address.city!=null) mastNumData.billingAddressCity = this.billingAddr.address.city;
        if (this.billingAddr.address.state !== undefined && this.billingAddr.address.state!=null) mastNumData.billingAddressState = this.billingAddr.address.state;
        if (this.billingAddr.address.zip !== undefined && this.billingAddr.address.zip!=null) mastNumData.billingAddressZip = this.billingAddr.address.zip;


        if (this.causeOfLossId !== undefined) mastNumData.causeOfLoss = this.causeOfLossId;
        if (this.yearBuiltId !== undefined) mastNumData.yearBuilt = this.yearBuiltId;
        if (this.programTypeId !== undefined) mastNumData.programType = this.programTypeId;
        if (this.masterNumberData.propertyType !== undefined) mastNumData.propertyType = this.masterNumberData.propertyType;
  


        if (this.selfPay !== undefined) mastNumData.selfPay = this.selfPay;

        if (this.insuranceCompany !== undefined){
           mastNumData.insuranceCompanyId = this.insuranceCompany.companyId;
           mastNumData.insuranceCompanyName = this.insuranceCompany.companyName;
        }
        if (this.insurances.claimNumber !== undefined)mastNumData.claimNumber = this.insurances.claimNumber;
        if (this.insurances.policyNumber !== undefined) mastNumData.policyNumber = this.insurances.policyNumber;
        if(this.masterNumberData.responsibleParty!==undefined) mastNumData.responsibleParty = this.masterNumberData.responsibleParty;
        this.update.emit({"masterNumberData":mastNumData});
        this.display=false;
    }

}
