import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {Description} from '../../../models/description';


@Component({
  selector: 'masternumber-whiteboard',
  templateUrl: './whiteboard.component.html',
  //styleUrls: ['./whiteboard.component.css']
})
export class WhiteboardComponent implements OnInit {
  @Input() description: Description[];
  @Output() updateDesc = new EventEmitter<any>();
  display: boolean = false;
  isDescriptionEmpty: boolean = false;
  mastNumDescription: string;
  showDialog() {
      this.mastNumDescription="";
      this.isDescriptionEmpty = false;
      this.display = true;
  }
  constructor() { }

  ngOnInit():void {

  }

  scroll(el) {
      //alert('scroll');
      el.scrollIntoView();
  }
  updateDescription(){
    if(this.mastNumDescription==undefined || this.mastNumDescription==null || this.mastNumDescription.replace(/ /g, "")==""){
      this.isDescriptionEmpty = true;
    }
    else{
      this.updateDesc.emit({
        description: this.mastNumDescription
      });
      this.display=false;
    }
  }

}