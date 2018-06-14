import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { APIUrls } from '../../../shared/constants/apiurls';
import { MasterNumberData } from '../../../models/masternumber-data';
import { InsuranceDetails } from '../../../models/insurance-details';

@Component({
  selector: 'email-masternumber',
  templateUrl: './masternumber-email.component.html',
})
export class EmailMasterNumberComponent implements OnInit {
    elRef: ElementRef
    hash: string;
    url: string;
    myData: any;
    isError: boolean;
    serverErrorMessage: string;
    masterNumberData: MasterNumberData;
    insurances: InsuranceDetails;
    selfPay: string;
    constructor(elRef: ElementRef, private http: HttpClient) {
        this.elRef = elRef;
    }      
    @Input()
    set mastNumHash(mastNumHash: string){
        this.hash=mastNumHash;
        this.getMasterNumberDetails();
    }

    getHtmlContent() {
        return this.elRef.nativeElement.innerHTML;
    }
     ngOnInit() {
         
     }

     getMasterNumberDetails(){
      let getParams = new HttpParams().set('mastNumHash', this.hash);
      this.url =APIUrls.hosturl+APIUrls.MasterNumberDetails
      this.http.get(this.url,{params:getParams})
      .subscribe(data=>{
          this.myData = data;
          this.masterNumberData=this.myData.masterNumberDetails;
          console.log(this.masterNumberData);
      },
      (err: HttpErrorResponse) => {
          this.isError=true;
            if (err.error instanceof Error) {
              console.log("Client-side error occured.");
            } else {
              console.log("Server-side error occured.");
            }
          }
      );
    }

    getInsuranceDetails(){
      const params = new HttpParams().set('mastNumHash',this.hash);
      this.url =APIUrls.hosturl+APIUrls.MasterNumberInsuranceDetails;
      this.http.get(this.url,{params:params})
        .subscribe(data=>{
          this.myData=data;
          this.insurances=this.myData.insuranceDetails;
           if(this.insurances!=null && this.insurances!=undefined){
               this.selfPay="No";
           }
           else{
               this.selfPay="Yes";
           }
        },
        (err: HttpErrorResponse) => {
            this.isError=true;
            if (err.error instanceof Error) {
              console.log("Client-side error occured.");
            } else {
              console.log("Server-side error occured.");
            }
          }
        );
    }
}