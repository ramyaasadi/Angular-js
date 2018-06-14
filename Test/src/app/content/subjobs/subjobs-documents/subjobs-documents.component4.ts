import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

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
  fileMessage: boolean=true;
  @Input() documents: DocumentsInfo[]; 
  @Output() addDocument = new EventEmitter<any>();
  @Output() deletedDocuments = new EventEmitter<any>();
  @ViewChild('file')
  doc: any;

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
      if(f.valid && this.file!=undefined){
        this.addDocument.emit({"document":this.document,"file":this.file});
        this.display=false;
        f.submitted=false;
        f.reset();
        this.doc.nativeElement.value = "";
      }
      else{
        if(this.file==undefined){
            this.fileMessage=false;
        }
      }
    }

    reset(f){
      f.reset();
      this.display=false;
      this.doc.nativeElement.value = "";
    }

    onChange(files){
      this.file=files[0];
      if(files.length>0){
        this.fileMessage=true;
      }
      else{
        this.fileMessage=false;
      }
    }

    onCheckboxChange(document, event) {
        if(event.target.checked) {
          this.showMessage=false;
          this.selectedDocuments.push(document.id);
        } else {
          for(var i=0 ; i < this.selectedDocuments.length; i++) {
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
        this.selectedDocuments=[];
      }
      else{
        this.showMessage=true;
      }
    }

    downloadDocument(document){
      // let fileId=document.id+"";
      // let getParams = {"fileId": fileId.toString()};
      // this.url =APIUrls.hosturl+APIUrls.DownloadFileDocument;
      // console.log(getParams);
      // this.http.get(this.url,{params:getParams,responseType:'arraybuffer'})
      // .subscribe(data=>{
         
      // },
      // (err: HttpErrorResponse) => {
      //       if (err.error instanceof Error) {
      //         console.log("Client-side error occured.");
      //       } else {
      //         console.log(HttpErrorResponse);
      //         console.log("Server-side error occured.");
      //       }
      //     }
      // );
       var downloadPath = APIUrls.hosturl+APIUrls.DownloadFileDocument+"?fileId="+document.id;
       window.open(downloadPath, '_blank', '');
    }
}
