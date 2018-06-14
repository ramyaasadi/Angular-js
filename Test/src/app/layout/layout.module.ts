
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import {FormsModule} from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap';

import{CommonFeaturesModule} from '../common/common.module';

import {BackButtonComponent} from '../common/back/back.component';

import {DialogModule} from 'primeng/dialog';

import {TitleTextService} from '../shared/services/titletext.service';


import { LayoutHeaderComponent } from './header/layoutheader.component';
import {LayoutSidebarComponent} from './sidebar/layoutsidebar.component';
// import {DemoModalServiceStaticComponent} from '../shared/components/dialogbox/dialogbox.component';
import {AutoCompleteModule} from 'primeng/autocomplete';


@NgModule({
  declarations: [
      LayoutHeaderComponent,
      LayoutSidebarComponent,
    //   DemoModalServiceStaticComponent,
      BackButtonComponent,
  ],
  imports: [
      CommonModule,
      RouterModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      CommonFeaturesModule,
      AutoCompleteModule,
      DialogModule
  ],
  exports: [
     LayoutHeaderComponent,
     LayoutSidebarComponent,
     RouterModule,
    // DemoModalServiceStaticComponent,
     BackButtonComponent,
  ],
  providers: [TitleTextService],
})
export class LayoutModule {
 
 }
