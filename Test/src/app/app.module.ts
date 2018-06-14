import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms'

import {AppComponent} from './app.component';
import { LoginComponent } from './login/login.component';
import {ContentModule} from './content/content.module';
import {MasterNumberModule} from './content/masternumber/masternumber.module';
import {SharedComponentsModule} from './shared/components/sharedcomponent.module';
import {CommonFeaturesModule} from './common/common.module';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
//import { ModalModule } from '../../node_modules/ng2-bootstrap';
//import {LoginModule} from './login/login.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ContentModule,
    BrowserAnimationsModule,
    MasterNumberModule,
    SharedComponentsModule,
    CommonFeaturesModule,
    ModalModule.forRoot()
    
    //ModalModule
  ],
  providers: [
   {provide:LocationStrategy, useClass:HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
