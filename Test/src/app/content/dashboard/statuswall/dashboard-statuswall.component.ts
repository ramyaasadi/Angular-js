import { Component, OnInit } from '@angular/core';
import {DashboardWall} from '../../../models/status-wall';

@Component({
  selector: 'dashboard-statuswall',
  templateUrl: './dashboard-statuswall.component.html',
  styles: [`
    #scrollable {
      background: #ddd;
      border-radius: 3px;
      color: #333;
      height: 250px;
      padding: 16px 8px 16px 16px;
    }
  `]
})


export class DashboardStatusWallComponent implements OnInit {
 walls: DashboardWall[];
  constructor() {}
 
  ngOnInit(): void {
     this.walls =  [
                    { 
                        title: 'Just Now',
                        name: 'Paul Edward',
                        desc:'Shared new information about projects'
                    },
                    { 
                        title: '5 Mins Ago',
                        name: 'Stancy',
                        desc:'Holiday Season Coming.. Prepare'
                    },
                    { 
                        title: '10 Mins Ago',
                        name: 'John',
                        desc:'Town Hall Meeting in another 2 weeks'
                    },
                    { 
                        title: '4 Hours Ago',
                        name: 'Tim',
                        desc:'Expanding our Team'
                    },
                    { 
                        title: '8 Hours Ago',
                        name: 'Jack',
                        desc:'New Equipments ordered'
                    },
                    { 
                        title: '10 Hours Ago',
                        name: 'Britly',
                        desc:'client Meeting'
                    },
                    { 
                        title: '15 Hours Ago',
                        name: 'David',
                        desc:'Team Structure'
                    },
                    { 
                        title: '20 Hours Ago',
                        name: 'Parker',
                        desc:'Auditing'
                    }
               ];
  }

}
