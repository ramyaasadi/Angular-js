
import { Component } from '@angular/core';

import {GoogleMapMarker} from '../../../models/googlemap-marker';

declare const google: any;

@Component({
    selector: 'google-map',
    templateUrl:'./googlemap.component.html',
    //styleUrls: ['./googlemap.component.css']
})

export class GoogleMapComponent {

zoom: number = 7;
fullscreenControl = true;
// initial center position for the map
 lat: number = 26.7153424;
  lng: number = -80.0533746;
}