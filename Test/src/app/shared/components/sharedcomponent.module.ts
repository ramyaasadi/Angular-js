
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule} from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputMaskModule} from 'primeng/inputmask';
import {DialogModule} from 'primeng/dialog';
import { AgmCoreModule } from '@agm/core';

import { GoogleMapComponent } from './googlemap/googlemap.component';
import {ScrollPanelModule} from 'primeng/scrollpanel';

import {HorizontalGraphComponent} from './horizontalgraph/horizontalgraph.component';
import {DemoModalServiceStaticComponent} from './dialogbox/dialogbox.component';

import {AddressFormComponent} from './address/address-form.component';
import {BasicContactFormComponent} from './basic-contact/basic-contact.component';


@NgModule({
  declarations: [
      HorizontalGraphComponent,
      GoogleMapComponent,
      DemoModalServiceStaticComponent,
      AddressFormComponent,
      BasicContactFormComponent
  ],
  imports: [
      CommonModule,
      FormsModule,
      AutoCompleteModule,
      InputMaskModule,
      ScrollPanelModule,
      DialogModule,
      AgmCoreModule.forRoot({ apiKey: 'AIzaSyC9hk9yNXmzJVmQ3rP3PJ0aNtc4EBUo7aY'}) 
  ],
  exports: [
      HorizontalGraphComponent,
      GoogleMapComponent,
      DemoModalServiceStaticComponent,
      AddressFormComponent,
      BasicContactFormComponent
   ],
  providers: [],
})
export class SharedComponentsModule { 
    
}






