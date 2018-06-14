import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'horizontal-graph',
  templateUrl: './horizontalgraph.component.html',
  styleUrls: ['./horizontalgraph.component.css']
})
export class HorizontalGraphComponent implements OnInit {
  @Input() graphValues:any[]
  @Input() barBackgroundColor:string;
  @Input() imageSource:string;
  @Input() totalValue:number;
  @Input() graphName:String;


  constructor() {}

  ngOnInit() {
 
  }

}
