import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TitleTextService} from '../../shared/services/titletext.service';
import { RouterModule,Routes } from '@angular/router';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';

import {SchedulesComponent} from '../schedule/schedule.component';
import {ScheduleGridComponent} from './schedule-grid/schedule-grid.component';


import {ScheduleModule} from 'primeng/schedule';

@NgModule({
    declarations: [
        SchedulesComponent,
        ScheduleGridComponent
    ],
    imports: [
        CommonModule,
        TableModule,
        RouterModule,
        DialogModule,
        ScheduleModule,
    ],
    exports: [
        SchedulesComponent,
        ScheduleGridComponent
    ],
    providers: [TitleTextService],
})
export class SchedulesModule {
 
}