import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TitleTextService} from '../../shared/services/titletext.service';
import { RouterModule,Routes } from '@angular/router';

import {CustomersComponent  } from '../customer/customer.component';
import {CustomersGridsComponent} from './customer-grid/customer-grid.component';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';

@NgModule({
    declarations: [
        CustomersComponent,
        CustomersGridsComponent,
    ],
    imports: [
        CommonModule,
        TableModule,
        RouterModule,
        DialogModule,
    ],
    exports: [
        CustomersComponent,
        CustomersGridsComponent,
    ],
    providers: [TitleTextService],
})
export class CustomersModule {
 
}