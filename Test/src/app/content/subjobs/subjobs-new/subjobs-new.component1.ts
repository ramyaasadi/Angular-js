import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
//import {SubJobTask} from '../../../models/subjobs-task';

import {TitleTextService} from '../../../shared/services/titletext.service';
import {JobImagesList} from '../../../models/jobimages-new';



@Component({
  selector: 'subjob-new',
  templateUrl: './subjobs-new.component.html',
})


export class SubJobsNewComponent implements OnInit {
  disabled: boolean = false;
  imagearray :JobImagesList[];
  otherimagedsbl: boolean = false;
  displayImageName:string ='';
  constructor(private data: TitleTextService, private route: ActivatedRoute, private http: HttpClient) {
  }
 
  onImgClick(itemNumber){
    
   //alert('Clicked imaged Index Value :' + itemNumber);
    
    for (let i = 0; i < this.imagearray.length;i++ )
    {
       this.imagearray[i].imageActive=false;
    }
    this.imagearray[itemNumber].imageActive=true;
    this.displayImageName = this.imagearray[itemNumber].jobName;
    // console.log(this.imagearray[itemNumber].jobName);
    // console.log(displayImageName);
    console.log(this.imagearray[itemNumber].imageActive);
  }

  ngOnInit(): void {
                      this.data.changeMessage("Master Number : M_Jackson_94");
      this.imagearray = [
                          {
                            jobActiveImage :'./assets/images/Water_r.png',
                            jobInactiveImage:'./assets/images/Water_.png',
                            imageActive:false,
                            jobName:'Water',
                          },
                          {
                            jobActiveImage :'./assets/images/Reconstruction_r.png',
                            jobInactiveImage :'./assets/images/Reconstruction_.png',
                            imageActive:false,
                            jobName:'Reconstruction',
                          },
                          {
                            jobActiveImage :'./assets/images/Content_r.png',
                            jobInactiveImage :'./assets/images/Content_.png',
                            imageActive:false,
                            jobName:'Content',
                          },
                          {
                            jobActiveImage :'./assets/images/Mold_r.png',
                            jobInactiveImage :'./assets/images/Mold_.png',
                            imageActive:false,
                            jobName:'Mold',
                          },
                          {
                            jobInactiveImage :'./assets/images/Asbestos_.png',
                            jobActiveImage :'./assets/images/Asbestos_r.png',
                            imageActive:false,
                            jobName:'Asbestos',
                          },
                          {
                            jobInactiveImage :'./assets/images/Board_.png',
                            jobActiveImage :'./assets/images/Boardup_r.png',
                            imageActive:false,
                            jobName:'Board Up',
                          },
                          {
                            jobInactiveImage :'./assets/images/Consulting_.png',
                            jobActiveImage :'./assets/images/Consulting_r.png',
                            imageActive:false,
                            jobName:'Consulting',
                          },
                          {
                            jobInactiveImage :'./assets/images/Bio_.png',
                            jobActiveImage :'./assets/images/Bio_r.png',
                            imageActive:false,
                            jobName:'Bio',
                          },
                        ]

    }

}
