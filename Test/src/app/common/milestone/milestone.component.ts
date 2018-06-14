import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'common-milestone',
  templateUrl: './milestone.component.html',
  //styleUrls: ['./insurancedetails.component.css']
})
export class MileStoneComponent implements OnInit {
  display: boolean = false;
  date3: Date;
  constructor() { }

  showDialog() {
    this.display = true;
}

  ngOnInit() {
  }

}