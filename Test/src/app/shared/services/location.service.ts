import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {LocationDetails} from '../../models/location';
@Injectable()
export class LocationService {
  defaultLocations=JSON.parse(localStorage.getItem("locations"));
  public location = new BehaviorSubject<LocationDetails>(this.defaultLocations[0]);
  currentLocation = this.location.asObservable();
  constructor() { }
  changeLocation(location: LocationDetails) {
    this.location.next(location);
  }
}
