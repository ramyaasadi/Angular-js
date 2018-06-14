import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';

import {Observable} from 'rxjs/Observable';

import {RouteInfo} from '../../models/RouteInfo';

@Component({
  selector: 'layout-sidebar',
  templateUrl: './layoutsidebar.component.html',
  styleUrls: ['./layoutsidebar.component.css']
})
export class LayoutSidebarComponent implements OnInit {
  menuItems: any[];

   ROUTES: RouteInfo[] = [
    {  path: 'Dashboard', redirectTo:'', pathMatch: 'full',
       title: 'Dashboard',  imgsrc: '../../assets/images/dashboard.png',
       class: '', activeImage:'../../assets/images/dashboard_.png'},
    {  path: 'AddMasterNumber', redirectTo:'', pathMatch: 'full',
       title: 'New Master Job',  imgsrc:'../../assets/images/new_master.png',
       class: 'router-link-active_0', activeImage:'../../assets/images/new_master_.png' },
    {  path: 'MasterNumber', redirectTo:'MasterNumber/all', pathMatch: 'full',
       title: 'Master Jobs',  imgsrc:'../../assets/images/master_num.png',
       class: 'router-link-active_1' , activeImage:'../../assets/images/master_num_.png'},
    { path: 'SubJobs', redirectTo:'', pathMatch: 'full',
      title: 'Files',  imgsrc:'../../assets/images/job.png',
      class: 'router-link-active_2' , activeImage:'../../assets/images/job_.png'},
    { path: 'Tasks', redirectTo:'', pathMatch: 'full',
       title: 'Tasks',  imgsrc:'../../assets/images/task.png',
       class: 'router-link-active_3', activeImage:'../../assets/images/task_.png' },
    // { path: 'Schedule', redirectTo:'', pathMatch: 'full',
    //   title: 'Schedule',  imgsrc:'../../assets/images/schedule.png',
    //   class: 'router-link-active_4' , activeImage:'../../assets/images/schedule_.png' },
    // { path: 'Customers', redirectTo:'', pathMatch: 'full',
    //   title: 'Customers',  imgsrc:'../../assets/images/customer.png',
    //   class: 'router-link-active_5' , activeImage:'../../assets/images/customer_.png' },
    { path: 'CRM', redirectTo:'', pathMatch: 'full',
      title: 'CRM', imgsrc:'../../assets/images/crm.png',   
      class: 'router-link-active_4' , activeImage:'../../assets/images/crm_.png' },
    // { path: 'Sales', redirectTo:'', pathMatch: 'full',
    //   title: 'Sales Activities',  imgsrc:'../../assets/images/sale.png',
    //    class: 'active-pro', activeImage:'../../assets/images/sale_.png' },
    { path: '/Reports', redirectTo:'', pathMatch: 'full',
      title: 'Reports',  imgsrc:'../../assets/images/reports.png',
       class: 'active-pro', activeImage:'../../assets/images/reports_.png' },
    { path: '/Financials', redirectTo:'', pathMatch: 'full',
      title: 'Financials',  imgsrc:'../../assets/images/fenancial.png',
      class: '' , activeImage:'../../assets/images/fenancial_.png' },
    { path: '/Equipment', redirectTo:'', pathMatch: 'full',
      title: 'Equipment',  imgsrc:'../../assets/images/equipments.png',
      class: 'active-pro' , activeImage:'../../assets/images/equipments_.png' }
  ];

  // url:Observable<string>;
  currentURL:string;

  innerHeight: any;
  outerHeight:any;
 constructor(private router:Router) {

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd ) {
           let  parts = event.url.split("/");
           this.currentURL = parts[2];

      }
    });
  }

   ngOnInit() {
      this.menuItems = this.ROUTES.filter(menuItem => menuItem);
      this.innerHeight = (window.innerHeight) + "px";
      this.outerHeight = (window.outerHeight) + "px";
    // alert('Inner Height :'+this.innerHeight);
    // alert('Outer Height :' +this.outerHeight);
    $('#sidebar').css('height',this.innerHeight);
    // $('#sidebar').css('height', $('.content-right').height() + "px");
    // alert('Body Height :' +$('body').height() + "px");
    // alert('Window Height :' +window.screen.height);
   }


}
