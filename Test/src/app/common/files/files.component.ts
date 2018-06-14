import { Component, OnInit } from '@angular/core';

import {DocumentsInfo} from '../../models/documents';

@Component({
  selector: 'common-files',
  templateUrl: './files.component.html',
  //styleUrls: ['./files.component.css']
})
export class FilesFeatureComponent implements OnInit {
  documents: DocumentsInfo[];
  constructor() { }

  ngOnInit():void {

  }

}