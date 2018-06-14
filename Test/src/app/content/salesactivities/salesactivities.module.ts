import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TitleTextService} from '../../shared/services/titletext.service';
import { RouterModule,Routes } from '@angular/router';

import {SalesActivitiesComponent  } from '../salesactivities/salesactivities.component';
import {SalesActivitiesGridComponent } from './salesactivities-grid/salesactivities-grid.component';
import {SalesActivitiesGridAllComponent } from './salesactivities-grid-all/salesactivities-grid-all.component';
import {NewSalesActivitiesComponent } from './salesactivities-new/salesactivities-new.component';



import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';

@NgModule({
    declarations: [
        SalesActivitiesComponent,
        SalesActivitiesGridComponent,
        NewSalesActivitiesComponent,
        SalesActivitiesGridAllComponent,
    ],
    imports: [
        CommonModule,
        TableModule,
        RouterModule,
        DialogModule,
    ],
    exports: [
        SalesActivitiesComponent,
        SalesActivitiesGridComponent,
        NewSalesActivitiesComponent,
        SalesActivitiesGridAllComponent,
    ],
    providers: [TitleTextService],
})
export class SalesModule {
 
}