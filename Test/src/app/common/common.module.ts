
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { PopoverModule } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap';
import {CalendarModule} from 'primeng/calendar';


import { DialogModule } from 'primeng/dialog';
import { ScrollPanelModule } from 'primeng/scrollpanel';

import { ContactsFeatureComponent } from './contacts/contacts.component';
import { ContactsNewFeatureComponent } from './contacts1/contacts.component';
import { FilesFeatureComponent } from './files/files.component';
import { InsuranceFeatureComponent } from './insurance/insurance-summary.component';
import { NotesFeatureComponent } from './notes/notes.component';
import { MileStoneComponent } from './milestone/milestone.component';
import { RolesComponent } from './roles/roles.component';
import { WhiteboardComponent } from './whiteboard/whiteboard.component';
import { PicturesComponent } from './pictures/pictures.component';
//import {BackButtonComponent} from './back/back.component';

import { SharedComponentsModule } from '../shared/components/sharedcomponent.module';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

import { ContactService } from './contacts/contact.component.service';

import { GalleriaModule } from 'primeng/galleria';

@NgModule({
  declarations: [
      ContactsFeatureComponent,
      FilesFeatureComponent,
      InsuranceFeatureComponent,
      NotesFeatureComponent,
      MileStoneComponent,
      RolesComponent,
      ContactsNewFeatureComponent,
      WhiteboardComponent,
      PicturesComponent
      //BackButtonComponent,
  ],
  imports: [
      CommonModule,
      DataTablesModule,
      CollapseModule,
      PopoverModule.forRoot(),
      DialogModule,
      ScrollPanelModule,
      SharedComponentsModule,
      FormsModule,
      CalendarModule,
      RouterModule,
      TableModule,
      GalleriaModule
   ],
  exports: [
     ContactsFeatureComponent,
     FilesFeatureComponent,
     InsuranceFeatureComponent,
     NotesFeatureComponent,
     MileStoneComponent,
     RolesComponent,
     ContactsNewFeatureComponent,
     WhiteboardComponent,
     PicturesComponent
     //BackButtonComponent,
   ],
  providers: [ContactService],
})
export class CommonFeaturesModule {
 
 }
