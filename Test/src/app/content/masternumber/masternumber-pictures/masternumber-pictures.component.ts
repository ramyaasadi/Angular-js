import { Component, OnInit } from '@angular/core';
//import {SubJobTask} from '../../../models/subjobs-task';

@Component({
  selector: 'masternumber-picture',
  templateUrl: './masternumber-pictures.component.html',
})


export class MasterNumberPicutures implements OnInit {
  constructor() {
  }
  images: any[];
    
  ngOnInit(): void  {
        this.images = [];
        this.images.push({source:'./assets/images/bg-img.jpg', alt:'Description for Image 1', title:'Title 1'});
        this.images.push({source:'./assets/images/pic3.jpg', alt:'Description for Image 2', title:'Title 2'});
        this.images.push({source:'./assets/images/pic4.jpg', alt:'Description for Image 3', title:'Title 3'});
        this.images.push({source:'./assets/images/pic5.jpg', alt:'Description for Image 4', title:'Title 4'});
        this.images.push({source:'./assets/images/pic3.jpg', alt:'Description for Image 5', title:'Title 5'});
        this.images.push({source:'./assets/images/bg-img.jpg', alt:'Description for Image 6', title:'Title 6'});
        this.images.push({source:'./assets/images/pic4.jpg', alt:'Description for Image 7', title:'Title 7'});
        this.images.push({source:'./assets/images/bg-img.jpg', alt:'Description for Image 8', title:'Title 8'});
        this.images.push({source:'./assets/images/pic5.jpg', alt:'Description for Image 9', title:'Title 9'});
        this.images.push({source:'./assets/images/bg-img.jpg', alt:'Description for Image 10', title:'Title 10'});
        this.images.push({source:'./assets/images/pic3.jpg', alt:'Description for Image 11', title:'Title 11'});
        this.images.push({source:'./assets/images/pic5.jpg', alt:'Description for Image 12', title:'Title 12'});
    }

}
