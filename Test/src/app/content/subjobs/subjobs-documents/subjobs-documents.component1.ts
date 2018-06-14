import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DocumentDetails } from '../../../models/document';
import { APIUrls } from '../../../shared/constants/apiurls';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { DocumentsInfo } from '../../../models/documents';

@Component({
  selector: 'subjob-documents',
  templateUrl: './subjobs-documents.component.html',
})


export class SubJobsDocumentsComponent implements OnInit {
  document: any;
  file: any;
  url: string;
  myData: any;
  selectedDocuments: any;
  showMessage: boolean=false;
  @Input() documents: DocumentsInfo[]; 
  @Output() addDocument = new EventEmitter<any>();
  @Output() deletedDocuments = new EventEmitter<any>();

  constructor(private http : HttpClient) {
  }
 
  display: boolean = false;
    showDialog() {
      this.display = true;
  }
  
  ngOnInit(): void {
    this.document={};
    this.selectedDocuments=[];
  }

    saveDocument(f){
      if(f.valid){
        this.addDocument.emit({"document":this.document,"file":this.file});
        this.display=false;
      }
      else{
        console.log("Mandatory fields are missing");
      }
    }

    onChange(files){
      this.file=files[0];
    }

    onCheckboxChange(document, event) {
        if(event.target.checked) {
          this.selectedDocuments.push(document.id);
        } else {
          for(var i=0 ; i < this.document.length; i++) {
            if(this.selectedDocuments[i] == document.id){
              this.selectedDocuments.splice(i,1);
            }
          }
        }
        console.log(this.selectedDocuments);
    }

    deleteDocuments(){
      if(this.selectedDocuments!=undefined && this.selectedDocuments.length>0){
        this.showMessage=false;
        this.deletedDocuments.emit({"selDocs": this.selectedDocuments});
      }
      else{
        this.showMessage=true;
      }
    }
}
