import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TitleTextService} from '../../shared/services/titletext.service';
import { RouterModule,Routes } from '@angular/router';

import {CrmComponent  } from '../crm/crm.component';
import {CompaniesListComponent  } from './companies/companies.component';
import {IndividualListComponent} from './individuals/individuals.component';
import {WarmleadsListComponent} from './warmleads/warmleads.component';
import {CrmCustomersComponent} from './customers/customers.component';
import {CrmSalesActivitiesComponent} from './sales-act/sales-act.component';




import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';

@NgModule({
    declarations: [
        CrmComponent,
        CompaniesListComponent,
        IndividualListComponent,
        WarmleadsListComponent,
        CrmCustomersComponent,
        CrmSalesActivitiesComponent,
    ],
    imports: [
        CommonModule,
        TableModule,
        RouterModule,
        DialogModule,
    ],
    exports: [
        CrmComponent,
        CompaniesListComponent,
    ],
    providers: [TitleTextService],
})
export class CrmModule {
 
}