import { Component, OnInit, Input } from '@angular/core';

import { NotesInfo } from '../../models/notes';

//import {PopupComponent} from '../../common/popup/popup.component';

@Component({
  selector: 'common-notes',
  templateUrl: './notes.component.html',
  //styleUrls: ['./notes.component.css']
})
export class NotesFeatureComponent implements OnInit {
  display: boolean = false;
  @Input() notes: NotesInfo[];
  cols: any[];
  dtOptions: DataTables.Settings = {};

  constructor() { 
    this.cols = [
      { field: 'note', header: 'Note',showData:true },
      { field: 'jobImage', header: 'File Type', showData:true },
      { field: 'noteby', header: 'By', showData:true},
      { field: 'dttm', header: 'Date & Time', showData:true},
  ];
  }
  showDialog() {
    this.display = true;
}
  ngOnInit():void {
    
  }

}