import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { InsuranceDetails } from '../../../models/insurance-details';
import { IAddress } from '../../../models/address.model';
import { ConfigurationData } from '../../../models/config-data';
import { ProgramType } from '../../../models/program-type';
import { CompanyDetails } from '../../../models/company-details';
import { AddressFormComponent } from '../../../shared/components/address/address-form.component';
import { GetDropdownListService } from '../../../shared/services/dropdown.service';
import { APIUrls } from '../../../shared/constants/apiurls';
import { Messages } from '../../../shared/constants/messages';

@Component({
  selector: 'subjobs-popup',
  templateUrl: './subjobs-popup.component.html',
})


export class SubJobsPopUpComponent implements OnInit {

  fileData: any; 
  lossAddress: any;
  billingAddress: any;
  configurationData:ConfigurationData[];
  causeOfLossIds:ConfigurationData[];
  programTypeIds:ConfigurationData[];
  yearBuiltIds:ConfigurationData[];
  programtypes:ProgramType[];
  causeOfLossId: number;
  yearBuiltId: number;
  programTypeId: number;
  insuranceCompanies: CompanyDetails[];
  insuranceCompany:any;
  selfPay: boolean;
  filteredInsuranceCompanys: CompanyDetails[];
  myData: any;
  url: string;
  isError:boolean;
  serverErrorMessage:string;
  @Input() insurances: InsuranceDetails;
  @Output() update = new EventEmitter<any>();

  @ViewChild('lossAddr')
  lossAddr: AddressFormComponent;

  @ViewChild('billingAddr')
  billingAddr: AddressFormComponent;

  @Input()
  set fileDetails(fileDetails: any){
     this.fileData=fileDetails;
     this.lossAddress={};
     this.lossAddress.address1=this.fileData.lossAddress;
     this.lossAddress.city=this.fileData.lossAddressCity;
     this.lossAddress.state=this.fileData.lossAddressState;
     this.lossAddress.zip=this.fileData.lossAddressZip;
     this.billingAddress={};
     this.billingAddress.address1=this.fileData.billingAddress;
     this.billingAddress.city=this.fileData.billingAddressCity;
     this.billingAddress.state=this.fileData.billingAddressState;
     this.billingAddress.zip=this.fileData.billingAddressZip;
  }
  
  constructor(private http: HttpClient) {
  }

  display: boolean = false;
    showDialog() {
      this.display = true;
  }
 
  ngOnInit(): void {
    this.getConfigData();
    this.getProgramType();
    this.getInsuranceCompanies();
  }

  getConfigData(){
      this.url =APIUrls.hosturl+APIUrls.MasterNumberConfigurationData;
     this.http.get(this.url)
         .subscribe(data=>{
           this.myData=data;
           this.configurationData=this.myData.configData;
           this.causeOfLossIds =  this.configurationData.filter(x => x.configName == "Cause of Loss");
           if(this.fileData.causeOfLoss!=null)
           this.causeOfLossId=this.causeOfLossIds.filter(x => x.configValue == this.fileData.causeOfLoss)[0].configId;
           this.yearBuiltIds =  this.configurationData.filter(x => x.configName == "Year Built");
           if(this.fileData.yearBuilt!=null)
           this.yearBuiltId=this.yearBuiltIds.filter(x => x.configValue == this.fileData.yearBuilt)[0].configId;
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
            console.log(this.fileData.programType);
            console.log(this.programtypes);
            if(this.fileData.programType!=null && this.fileData.programType!=undefined && this.fileData.programType!="")
            this.programTypeId=this.programtypes.filter(x => x.programType == this.fileData.programType)[0].programTypeId;
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
      this.filteredInsuranceCompanys=[];
      for(let i = 0; i < this.insuranceCompanies.length; i++) {
          let company = this.insuranceCompanies[i];
          if(company.companyName.toLowerCase().indexOf(event.query.toLowerCase()) !==-1){
              this.filteredInsuranceCompanys.push(company);
          }
      }
    }

    isBillingAddressChanged(){
        if (this.fileData.billingAddressSame){
          this.billingAddr.address.address1=this.lossAddr.address.address1;
          this.billingAddr.address.city=this.lossAddr.address.city;
          this.billingAddr.address.state=this.lossAddr.address.state;
          this.billingAddr.address.zip=this.lossAddr.address.zip;
          
          this.billingAddr.isAddressSame=true;
        }else{

          this.billingAddr.isAddressSame=false;
        }
     }

     updateFileData(){
      
      let fileData: any;
      fileData={};
        if (this.fileData.tenantName !== undefined) fileData.tenantName = this.fileData.tenantName;
        if (this.fileData.tenantNumber !== undefined) fileData.tenantNumber = this.fileData.tenantNumber;

        if (this.fileData.billingAddressSame!== undefined) fileData.billingAddressSame=this.fileData.billingAddressSame;
             else   fileData.billingAddressSame=false;
        if (this.lossAddr.address.address1 !== undefined && this.lossAddr.address.address1!=null)
                    fileData.lossAddress = this.lossAddr.address.address1;

        if (this.lossAddr.address.city !== undefined && this.lossAddr.address.city!=null) fileData.lossAddressCity = this.lossAddr.address.city;
        if (this.lossAddr.address.state !== undefined && this.lossAddr.address.state!=null) fileData.lossAddressState = this.lossAddr.address.state;
        if (this.lossAddr.address.zip !== undefined && this.lossAddr.address.zip!=null) fileData.lossAddressZip = this.lossAddr.address.zip;

        /* Start of Billing Address */
    
        if (this.billingAddr.address.address1 !== undefined && this.billingAddr.address.address1!=null)
                    fileData.billingAddress = this.billingAddr.address.address1;

        if (this.billingAddr.address.city !== undefined && this.billingAddr.address.city!=null) fileData.billingAddressCity = this.billingAddr.address.city;
        if (this.billingAddr.address.state !== undefined && this.billingAddr.address.state!=null) fileData.billingAddressState = this.billingAddr.address.state;
        if (this.billingAddr.address.zip !== undefined && this.billingAddr.address.zip!=null) fileData.billingAddressZip = this.billingAddr.address.zip;


        if (this.causeOfLossId !== undefined) fileData.causeOfLoss = this.causeOfLossId;
        if (this.yearBuiltId !== undefined) fileData.yearBuilt = this.yearBuiltId;
        if (this.programTypeId !== undefined) fileData.programType = this.programTypeId;
        if (this.fileData.propertyType !== undefined) fileData.propertyType = this.fileData.propertyType;
  
         if (this.fileData.jobDesc !== undefined && this.fileData.jobDesc!=null) fileData.jobDescription=this.fileData.jobDesc;

        if (this.selfPay !== undefined) fileData.selfPay = this.selfPay;
        if(this.insurances!=null){
          if (this.insuranceCompany !== undefined){
            fileData.insuranceCompanyId = this.insuranceCompany.companyId;
            fileData.insuranceCompanyName = this.insuranceCompany.companyName;
          }
          if (this.insurances.claimNumber !== undefined)fileData.claimNumber = this.insurances.claimNumber;
          if (this.insurances.policyNumber !== undefined) fileData.policyNumber = this.insurances.policyNumber;
        }
        console.log(fileData);
        this.update.emit({"fileData" : fileData});
        this.display=false;
    }

}
