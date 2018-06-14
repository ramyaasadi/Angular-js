import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {TitleTextService} from '../../shared/services/titletext.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customer.component.html',
})

export class CustomersComponent implements OnInit {
  constructor(private data: TitleTextService, private router: Router, private route: ActivatedRoute) {
  }
 
  ngOnInit(): void {
    this.data.changeMessage("Customers");
    }

}
