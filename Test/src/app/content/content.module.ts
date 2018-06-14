
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import {DashboardModule} from './dashboard/dashboard.module';
import {SubJobModule} from './subjobs/subjobs.module';
import {CustomersModule} from './customer/customer.module';
import {MainTasksModule} from './tasks/tasks.module';
import {SalesModule} from './salesactivities/salesactivities.module';
import {SchedulesModule} from './schedule/schedule.module';
import { CrmModule } from './crm/crm.module'



import {TitleTextService} from '../shared/services/titletext.service';

// import { LayoutHeaderComponent } from '../layout/header/layoutheader.component';
// import {LayoutSidebarComponent} from '../layout/sidebar/layoutsidebar.component';
//import {LoginComponent} from '../login/login.component';

//import {DashboardComponent} from './dashboard/dashboard.component';

import {ContentComponent  } from './content.component';


import {LayoutModule} from '../layout/layout.module';
import {ContentRouting} from './content.routing';
import {AuthGuardService} from '../shared/services/auth-guard.service'
import {AuthCheckService} from '../shared/services/auth-check.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../shared/services/httpcall/token-interceptor';

@NgModule({
  declarations: [
     // LayoutHeaderComponent,
     // LayoutSidebarComponent,
      ContentComponent,
      //    LoginComponent
      //    DashboardComponent
      
  ],
  imports: [
      CommonModule,
      FormsModule,
      ContentRouting,
      DashboardModule,
      SubJobModule,
      CustomersModule,
      MainTasksModule,
      CrmModule,
      SalesModule,
      SchedulesModule,
      LayoutModule
  ],
  exports: [
      ContentComponent
   ],
  providers: [
        TitleTextService,
        AuthGuardService,
        AuthCheckService,
        AuthCheckService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
})
export class ContentModule { 
    
}






