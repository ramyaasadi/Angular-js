
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import { AlertModule } from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap';
import {DialogModule} from 'primeng/dialog';
import {InputMaskModule} from 'primeng/inputmask';
import {GrowlModule} from 'primeng/growl';

import {TitleTextService} from '../../shared/services/titletext.service';
import { DataTablesModule } from 'angular-datatables';

import {MaskedInputDirective} from 'angular2-text-mask'
import {TabViewModule} from 'primeng/tabview';

import { MasterNumberComponent } from './masternumber.component';
import {MasterNumberGridComponent} from './masternumber-grid/masternumber-grid.component';
import {MasterNumberDetailsComponent} from './masternumber-details/masternumber-details.component';
import {WhiteboardComponent} from './masternumber-whiteboard/whiteboard.component';
import {AddMasterNumberComponent} from './masternumber-new/masternumber-new.component';
import {MasterNumberDataComponent} from './masternumber-data/masternumber-data.component';
import {MasterNumberPopUpComponent} from './masternumber-popup/masternumber-popup.component';
import { EmailMasterNumberComponent } from './masternumber-email/masternumber-email.component';
import { MasterNumberPicutures } from './masternumber-pictures/masternumber-pictures.component';



// import {MasterNumberMasterDetailsComponent} from './masternumber-masterdetails/masternumber-masterdetails.component';


 import{SharedComponentsModule} from '../../shared/components/sharedcomponent.module';

import {CommonFeaturesModule} from '../../common/common.module';
import {   ButtonModule } from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { ScrollPanelModule } from 'primeng/scrollpanel';

import {GalleriaModule} from 'primeng/galleria';

@NgModule({
  declarations: [
      MasterNumberComponent,
      MasterNumberGridComponent,
      MasterNumberDetailsComponent,
      WhiteboardComponent,
      AddMasterNumberComponent,
      MaskedInputDirective,
      MasterNumberDataComponent,
      MasterNumberPopUpComponent,
      EmailMasterNumberComponent,
      MasterNumberPicutures,
     // MasterNumberMasterDetailsComponent
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
      DialogModule,
      InputMaskModule,
      SharedComponentsModule,
      GrowlModule,
      TabViewModule,
      ScrollPanelModule,
      GalleriaModule,
   ],
  exports: [
       MasterNumberComponent,
       MasterNumberGridComponent,
       RouterModule,
       MasterNumberDetailsComponent,
       WhiteboardComponent,
       AddMasterNumberComponent,
       MaskedInputDirective,
       MasterNumberDataComponent,
       MasterNumberPopUpComponent,
       EmailMasterNumberComponent,
       MasterNumberPicutures,
   ],
   entryComponents: [
        //MasterNumberMasterDetailsComponent
    ],
  providers: [TitleTextService],
})
export class MasterNumberModule {
 
 }
