
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {MasterNumberComponent} from './masternumber/masternumber.component';
import {MasterNumberGridComponent} from './masternumber/masternumber-grid/masternumber-grid.component';
import {DashboardJobsCountComponent} from './dashboard/jobs/jobscount/dashboard-jobscount.component';
import {MasterNumberDetailsComponent} from './masternumber/masternumber-details/masternumber-details.component';
import {AddMasterNumberComponent} from './masternumber/masternumber-new/masternumber-new.component';
// import {SubJobComponent} from './subjobs/subjobs.component';
// import {SubJobGridComponent} from './subjobs/subjobs-grid/subjobs-grid.component';
import {SubJobsDetailsComponent} from './subjobs/subjobs-details/subjobs-details.component';
import {LoginComponent } from '../login/login.component';
import {ContentComponent} from './content.component';
import {SubJobComponent} from './subjobs/subjobs.component';
import {SubJobsNewComponent} from './subjobs/subjobs-new/subjobs-new.component';
import {TasksComponent} from './tasks/tasks.component';
import {CustomersComponent  } from './customer/customer.component';
import {SalesActivitiesComponent  } from './salesactivities/salesactivities.component';
import {NewSalesActivitiesComponent  } from './salesactivities/./salesactivities-new/salesactivities-new.component';
import { CrmComponent } from './crm/crm.component';



import {AuthGuardService} from '../shared/services/auth-guard.service';

export const routes: Routes = [
        { path: '', redirectTo: '/Login', pathMatch: 'full' },
        { path: 'Login', component: LoginComponent },
        {path: 'Content', component: ContentComponent, canActivate: [AuthGuardService],
        children: [
        { path: 'Dashboard', canActivate: [AuthGuardService],  component: DashboardComponent,
           children: [
                    {path:'', component:DashboardJobsCountComponent},
                    { path: 'JobsCount/:id', component: DashboardJobsCountComponent }
            ]
        },
        { path: 'MasterNumber',
            children: [
                // {path: '', redirectTo: 'my', pathMatch: 'full' },
                {path: '', component: MasterNumberComponent },
                { path: 'MasterNumberDetails/:id', component: MasterNumberDetailsComponent },
                {  path: ':id', component: MasterNumberComponent}
            ]
        },
        { path: 'AddMasterNumber',
            children: [
                {path: '', component: AddMasterNumberComponent},
                {  path: ':id', component: AddMasterNumberComponent}
            ]
        },
        { path: 'SubJobs',
            children: [
                // {path: '', redirectTo: 'my', pathMatch: 'full' },
                {path:'', component:SubJobComponent},
                { path: 'SubJobsDetails/:id', component: SubJobsDetailsComponent },
                { path: 'NewSubJobs/:id', component: SubJobsNewComponent },
                {  path: ':id', component: SubJobComponent}
            ]
        },
        { path: 'Tasks',
            children: [
                {path: '', component: TasksComponent},
                {  path: ':id', component: TasksComponent}
            ]
        },
        { path: 'Customers',
            children: [
                {path: '', component: CustomersComponent},
                {  path: ':id', component: CustomersComponent}
            ]
        },
        { path: 'CRM',
            children: [
                {path: '', component: CrmComponent},
                {  path: ':id', component: CrmComponent}
            ]
        },
        { path: 'Sales',
            children: [
                {path: '', redirectTo: 'my', pathMatch: 'full'},
                { path: 'NewSalesActivities', component: NewSalesActivitiesComponent },
                {  path: ':id', component: SalesActivitiesComponent}
            ]
        }
        ] }
    ];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class ContentRouting {

}






