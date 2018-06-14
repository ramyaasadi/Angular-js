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
import {LocationService} from '../../shared/services/location.service';
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
import {AutoCompleteModule} from 'primeng/autocomplete';
import {LocationDetails} from '../../models/location';

@Component({
  selector: 'layout-header',
  templateUrl: './layoutheader.component.html',
  styleUrls: ['./layoutheader.component.css'],
})
export class LayoutHeaderComponent implements OnInit {
    modalRef: BsModalRef;
    tokenInfo:any;
    jwtToken:any;

    url:string;
    isError:boolean;
    serverErrorMessage:string;
    myData:any;

    isLoggedIn: Observable<boolean>
    i:number;
    modalConfig:any;
    
    message: string;
    profileImage: any;
    userLocations: LocationDetails[];
    showLocations: boolean=false;
    filteredLocations: LocationDetails[];
    selectedLocation: any;

    display: boolean = false;
    showDialog() {
      this.display = true;
    }

    constructor(private router:Router, private location: Location, private data: TitleTextService,private http: HttpClient,private authCheckService:AuthCheckService, private modalService: BsModalService,public jwtHelper: JwtHelperService,public userLocation: LocationService) { }
    ngOnInit() {
      this.data.currentMessage.subscribe(message => this.message = message);
      this.isLoggedIn= this.authCheckService.isLoggedIn;
      this.getDecodedAccessToken();
      this.getProfilePic();
      this.getLocations();
      this.userLocation.changeLocation(this.selectedLocation);
    }
    goBack() {
       this.location.back();
    }

    getLocations(){
      this.userLocations=JSON.parse(localStorage.getItem("locations"));
     // console.log("Locations---->"+this.userLocations);
     if(this.userLocations.length==1){
      this.showLocations=false;
     }
      else{
        this.showLocations=true;
      }
      this.selectedLocation=this.userLocations[0];
    }

    filterLocation(event){
      this.filteredLocations=[];
      //console.log(this.insurances.length);
      for(let i = 0; i < this.userLocations.length; i++) {
          let loc = this.userLocations[i];
          if(loc.code.toLowerCase().indexOf(event.query.toLowerCase()) !==-1){
              this.filteredLocations.push(loc);
          }
      }
     }

     changeLocation(event){
       this.userLocation.changeLocation(this.selectedLocation);
     }


    openModal(template: TemplateRef<any>) {
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

    getProfilePic(){
      this.profileImage =APIUrls.hosturl+APIUrls.FileLink+this.tokenInfo.profilePic;
    }

   
    decline(): void {
      //this.messages = 'Declined!';
      this.modalRef.hide();
    }

    
    getDecodedAccessToken() {
      try{
        this.jwtToken=localStorage.getItem("jwtToken");
        this.tokenInfo= jwt_decode(this.jwtToken);
        //console.log("Token info in Header", this.tokenInfo );
        //let tokenInfo = this.getDecodedAccessToken(token); // decode token
        //let expireDate = tokenInfo.exp; // get token expiration dateTime

      }
      catch(Error){
          return null;
      }
   }


    



}
