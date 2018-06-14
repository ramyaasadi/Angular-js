import { Component, OnInit, Input } from '@angular/core';
import { DocumentsInfo } from '../../models/documents';
import { APIUrls } from '../../shared/constants/apiurls';

@Component({
  selector: 'pictures',
  templateUrl: './pictures.component.html',
})


export class PicturesComponent implements OnInit {
  constructor() {
  }
  images: any[];

  @Input()
  set pictures(pictures: DocumentsInfo[]){
   console.log(pictures);
   this.images = [];
    for (let picture of pictures) {
      this.images.push({source: APIUrls.hosturl+APIUrls.FileLink+picture.id, alt: picture.comments, title:picture.name});
    }
  } 
  ngOnInit(): void  {
        
  }

}
