import { Component,Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import {IAddress} from '../../../models/address.model';
import {AppConstants} from '../../../shared/constants/app-constants';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
})
export class AddressFormComponent implements OnInit {
   @Input() address:IAddress;
   
   filteredCustomerStates:any;
   usaStates:any;
   isAddressSame: boolean=false;


   ngOnInit(){
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
          this.filteredCustomerStates=filtered;       
      }


}