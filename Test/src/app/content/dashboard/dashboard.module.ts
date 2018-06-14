
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import {FormsModule} from '@angular/forms';
import { ChartModule } from 'angular-highcharts';

import {HttpClient,HttpHeaders, HttpParams} from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';

import { DataTablesModule } from 'angular-datatables';

import {TitleTextService} from '../../shared/services/titletext.service';

import { DashboardComponent } from './dashboard.component';
import {DashboardJobsComponent} from './jobs/dashboard-jobs.component';
import {DashboardJobsCountComponent} from './jobs/jobscount/dashboard-jobscount.component';
import {DashboardMasterNumbersComponent} from './masternumbers/dashboard-masternumbers.component';
import {DashboardFinancialsComponent} from './financials/dashboard-financials.component';
import {DashboardCustomersComponent} from './customers/dashboard-customers.component';
import {DashboardTaskComponent} from './tasks/dashboard-tasks.component';
import {DashboardStatusWallComponent} from './statuswall/dashboard-statuswall.component';
import {DashboardMasterTpaJobs} from './tpajobs/dashboard-tpajobs.component';
import {DashboardGoogleJobs} from './googlejobs/dashboard-googlejobs.component';
import {DashboardChartComponent} from './dashboard-chart/dashboard-chart.component';

import {TabViewModule} from 'primeng/tabview';
import {DashboardJobService} from './jobs/jobscount/dashboard-jobscount.service';
import {DashboardTpaJobService} from './tpajobs/dashboard-tpajobs.service';
import {DashboardCustomerService} from './customers/dashboard-customers.service';
import {HttpCallService} from '../../shared/services/httpcall/httpcall.service';

import {SharedComponentsModule} from '../../shared/components/sharedcomponent.module';

import { AlertModule } from 'ngx-bootstrap';
import { NgCircleProgressModule } from 'ng-circle-progress';

import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [
      DashboardComponent,
      DashboardJobsComponent,
      DashboardJobsCountComponent,
      DashboardMasterNumbersComponent,
      DashboardFinancialsComponent,
      DashboardCustomersComponent,
      DashboardTaskComponent,
      DashboardStatusWallComponent,
      DashboardMasterTpaJobs,
      DashboardGoogleJobs,
      DashboardChartComponent
  ],
  imports: [
      AlertModule.forRoot(),
      CommonModule,
      RouterModule,
      FormsModule,
      HttpClientModule,
      ChartModule,
      TabViewModule,
      JwtModule.forRoot({
      config: {
        tokenGetter: () => {
                return 'aeyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1MTkzNzQ3OTMsImxhc3ROYW1lIjoiQ2hlbm51cGF0aSIsImVtYWlsIjoicmFtYWRldmkuY2hlbm51cGF0aUB3aXNzZW5pbmZvdGVjaC5jb20iLCJ1c2VySWQiOjEsImNvbXBhbnkiOjEsInByb2ZpbGVQaWMiOm51bGwsImZpcnN0TmFtZSI6IlJhbWFkZXZpIiwiaWF0IjoxNTE4NzY5OTkzLCJtb2JpbGUiOiI5NjExMTIyNzgyIn0.jGuoZ-KBbvZU0lT78l53mk1Yhk1r9HLsPDP_mFSZki5nQSnZSgSQBJgFMWImW7vEn9HuYTACxOdSHR1EiMIzpQ';
            },
            whitelistedDomains: [] 
            }
        }),
      SharedComponentsModule,
      DataTablesModule,
      NgCircleProgressModule.forRoot({
        // set defaults here
        radius: 100,
        outerStrokeWidth: 16,
        innerStrokeWidth: 8,
        outerStrokeColor: "#78C000",
        innerStrokeColor: "#C7E596",
        animationDuration: 300,
      }),
      TableModule,
      
   ],
  exports: [
      RouterModule,
       DashboardComponent,
        DashboardJobsComponent,
        DashboardJobsCountComponent,
        DashboardMasterNumbersComponent,
        DashboardFinancialsComponent,
        DashboardCustomersComponent,
        DashboardTaskComponent,
        DashboardStatusWallComponent,
        DashboardMasterTpaJobs,
        DashboardGoogleJobs,
       
        
   ],
  providers: [DashboardJobService, DashboardTpaJobService, DashboardCustomerService,
                HttpCallService,
   
  ],
})
export class DashboardModule {
 
 }
