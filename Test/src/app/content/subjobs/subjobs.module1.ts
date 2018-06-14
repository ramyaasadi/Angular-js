import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import { AlertModule } from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap';

import {TitleTextService} from '../../shared/services/titletext.service';
import { DataTablesModule } from 'angular-datatables';

import {TabViewModule} from 'primeng/tabview';
import {ScrollPanelModule} from 'primeng/scrollpanel';

import {DialogModule} from 'primeng/dialog';
import {InputMaskModule} from 'primeng/inputmask';

import { SubJobComponent } from './subjobs.component';
import { SubJobsGridComponent } from './subjobs-grid/subjobs-grid.component';
import { SubJobsTaskComponent } from './subjobs-task/subjobs-task.component';
import { SubJobsPicturesComponent } from './subjobs-pictures/subjobs-pictures.component';
import { SubJobsDocumentsComponent } from './subjobs-documents/subjobs-documents.component';
import { SubJobsFinancialComponent } from './subjobs-financial/subjobs-financial.component';
import { SubJobsNewComponent } from './subjobs-new/subjobs-new.component';
import { SubJobsDataComponent } from './subjobs-data/subjobs-data.component';
import { SubJobsPopUpComponent } from './subjobs-popup/subjobs-popup.component';
import { SubJobsRestorationsComponent } from './subjobs-restoration/subjobs-restoration.component';

import { SubJobsNoteComponent } from './subjobs-notes/subjobs-note.component';
import {SubJobsDetailsComponent} from './subjobs-details/subjobs-details.component';
import {SharedComponentsModule} from '../../shared/components/sharedcomponent.module';

import {CommonFeaturesModule} from '../../common/common.module';
import {   ButtonModule } from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {AutoCompleteModule} from 'primeng/autocomplete';

@NgModule({
  declarations: [
    SubJobComponent,
    SubJobsGridComponent,
    SubJobsDetailsComponent,
    SubJobsTaskComponent,
    SubJobsPicturesComponent,
    SubJobsDocumentsComponent,
    SubJobsFinancialComponent,
    SubJobsNewComponent,
    SubJobsNoteComponent,
    SubJobsDataComponent,
    SubJobsPopUpComponent,
    SubJobsRestorationsComponent,
  ],
  imports: [
      CommonModule,
      DataTablesModule,
      RouterModule,
      AlertModule,
      CommonFeaturesModule,
      MatDialogModule,
      FormsModule,
      ButtonModule,
      TableModule,
      AutoCompleteModule,
      TypeaheadModule.forRoot(),
      TabViewModule,
      ScrollPanelModule,
      DialogModule,
      InputMaskModule,
      SharedComponentsModule,
   ],
  exports: [
       SubJobComponent,
       SubJobsDetailsComponent,
       SubJobsDataComponent,
       SubJobsPopUpComponent,
       SubJobsRestorationsComponent
         
   ],
   entryComponents: [],
  providers: [TitleTextService],
})
export class SubJobModule {
 
 }
