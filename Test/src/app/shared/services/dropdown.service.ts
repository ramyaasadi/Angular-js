
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIUrls } from '../constants/apiurls';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ConfigurationData } from '../../models/config-data';

@Injectable()
export class GetDropdownListService  {
    private url:string;
    private myData:any;
    constructor (private http: HttpClient) {
      
    }
    configData: ReplaySubject<ConfigurationData[]> = new ReplaySubject();
    public getConfigData(): Observable<ConfigurationData[]>{
      this.url =APIUrls.hosturl+APIUrls.MasterNumberConfigurationData;
      return this.http.get(this.url).map(data => {
        this.myData=data;
        return this.myData.map((config) => new ConfigurationData(config));
      })
    }
  

    // getConfigData() {
    //     this.url =APIUrls.hosturl+APIUrls.MasterNumberConfigurationData;
    //     this.http.get(this.url).subscribe(data => {
    //         this.myData=data;
    //         this.configData.next(this.myData.configData);
    //     });
    // }

    public getProgramTypes(){
      this.url =APIUrls.hosturl+APIUrls.MasterNumberProgramType;
      this.http.get(this.url).subscribe(data=>{
          return data;          
       });
    }
}