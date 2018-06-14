import { Component } from '@angular/core';
import { LocationService } from '../shared/services/location.service';
import { GetDropdownListService } from '../shared/services/dropdown.service';

@Component({
  selector: 'content-body',
  templateUrl: './content.component.html',
  providers: [ LocationService,GetDropdownListService ]
  //styleUrls: ['./content.component.css']
})
export class ContentComponent  {
isLoggedIn:boolean
constructor() { 
  this.isLoggedIn=false;
}
  
}
