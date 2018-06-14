import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';

import {TitleTextService} from '../../../shared/services/titletext.service';
import {APIUrls} from '../../../shared/constants/apiurls';
import {Messages} from '../../../shared/constants/messages';
//import {SubJobTask} from '../../../models/subjobs-task';
import { MasterNumberData } from '../../../models/masternumber-data';
import { InsuranceDetails } from '../../../models/insurance-details';
import { Description } from '../../../models/description';

@Component({
  selector: 'subjobs-data',
  templateUrl: './subjobs-data.component.html',
})


export class SubJobsDataComponent implements OnInit {
  @Input() insurances: InsuranceDetails;
  @Input() fileDetails: any; 
  @Output() update = new EventEmitter<any>();
  @Output() updateDesc = new EventEmitter<any>();
  @Input() description: Description[];
  constructor(private data: TitleTextService, private route: ActivatedRoute, private http: HttpClient) {
  }

  display: boolean = false;
    showDialog() {
      this.display = true;
  }
 
  ngOnInit(): void {
    
  }

  updatefileData($event){
    this.update.emit({
      fileData: $event.fileData
    });
    this.display=false;
  }

  updateDescription($event){
     this.updateDesc.emit({
        description: $event.description
      });
  }

}
