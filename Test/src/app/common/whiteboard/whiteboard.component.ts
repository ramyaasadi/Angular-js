import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Description } from '../../models/description';


@Component({
  selector: 'common-whiteboard',
  templateUrl: './whiteboard.component.html',
  //styleUrls: ['./whiteboard.component.css']
})
export class WhiteboardComponent implements OnInit {
  @Input() description: Description[];
  @Input() add: boolean;
  @Output() updateDesc = new EventEmitter<any>();
  display: boolean = false;
  isDescriptionEmpty: boolean = false;
  desc: string;
  showDialog() {
      this.desc="";
      this.isDescriptionEmpty = false;
      this.display = true;
  }
  constructor() { }

  ngOnInit():void {

  }

  scroll(el) {
      el.scrollIntoView();
  }
  updateDescription(){
    if(this.desc==undefined || this.desc==null || this.desc.replace(/ /g, "")==""){
      this.isDescriptionEmpty = true;
    }
    else{
      this.updateDesc.emit({
        description: this.desc
      });
      this.display=false;
    }
  }

}