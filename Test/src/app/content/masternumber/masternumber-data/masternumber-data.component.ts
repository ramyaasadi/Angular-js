import { Component, OnInit, Input, Output,EventEmitter} from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';

import {TitleTextService} from '../../../shared/services/titletext.service';
import {APIUrls} from '../../../shared/constants/apiurls';
import {TokenValue} from '../../../shared/services/httpcall/token.constant';
import {Messages} from '../../../shared/constants/messages';
import {MasterNumberData} from '../../../models/masternumber-data';
import {InsuranceDetails} from '../../../models/insurance-details';

@Component({
  selector: 'masternumber-data',
  templateUrl: './masternumber-data.component.html',
})


export class MasterNumberDataComponent implements OnInit {
  @Input() masterNumberData: MasterNumberData;
  @Input() insurances: InsuranceDetails;
  @Output() update = new EventEmitter<any>();
  dtOptions: DataTables.Settings = {};
    sub:any;
    id:string;
    url:string;
    myData:any;
    isError:boolean;
    serverErrorMessage:string;
    parameterID:string;

    display: boolean = false;
    showDialog() {
      this.display = true;
  }
  onClose(){
    this.display = false;
}

  constructor(private data: TitleTextService, private route: ActivatedRoute, private http: HttpClient) {
  }
 
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers'
    }

  }

  updateMasterNumberData($event){
    this.update.emit({
      masterNumberData: $event.masterNumberData
    });
    this.display=false;
  }

}
