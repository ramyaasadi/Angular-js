import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TitleTextService} from '../../shared/services/titletext.service';
import { RouterModule,Routes } from '@angular/router';

import {TasksComponent  } from '../tasks/tasks.component';
import {TasksListComponent} from './tasks-grid/tasks-grid.component';
import {AllTasksListComponent} from './tasks-grid-all/tasks-grid-all.component';

import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';

@NgModule({
    declarations: [
        TasksComponent,
        TasksListComponent,
        AllTasksListComponent
    ],
    imports: [
        CommonModule,
        TableModule,
        RouterModule,
        DialogModule,
    ],
    exports: [
        TasksComponent,
        TasksListComponent,
        AllTasksListComponent
    ],
    providers: [TitleTextService],
})
export class MainTasksModule {
 
}