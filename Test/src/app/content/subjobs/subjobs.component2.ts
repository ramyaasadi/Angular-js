import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {TitleTextService} from '../../shared/services/titletext.service';

import {SubJobsGrid} from '../../models/subjobs-grid';


@Component({
  selector: 'app-subjobs',
  templateUrl: './subjobs.component.html',
  //styleUrls: ['./masternumber.component.css']
})
export class SubJobComponent implements OnInit {
   private sub: any;
    private id;
    subJobs1: SubJobsGrid[];
    subJobs2: SubJobsGrid[];
    cols: any[];
  constructor(private data: TitleTextService, private router: Router, private route: ActivatedRoute) { 
    this.cols = [
      { field: 'Status', header: 'Status', showData:true},
      { field: 'SubJobCode', header: 'File Number',showData:true },
      { field: 'CustomerName', header: 'Customer Name', showData:true },
      { field: 'LossAddress', header: 'Loss Address', showData:true},
      { field: 'City', header: 'City', showData:true},
      { field: 'State', header: 'State', showData:true},
      { field: 'Zip', header: 'Zip', showData:true},
      { field: 'Supervisor', header: 'Supervisor', showData:true},
      { field: 'Estimator', header: 'Estimator', showData:true},
      { field: 'CreatedDTTM', header: 'Created Date & Time',showData:true },
      { field: 'JobImage', header: 'File Details',showData:true},
  ];
       this.sub = this.route.queryParams.subscribe(params => {
               this.router.navigated = false;
        this.router.navigate([this.router.url]);
        this.id = params['id']; 
        if (typeof this.id == "undefined"){
            this.router.navigate(['./Content/SubJobs/my']);
        }
    });
  
  }
    
    
 
    ngOnInit() {
      this.data.changeMessage("File List");
//       this.subJobs1 =  
//          [
//                 { 
//                         SubJobCode:'FN_Sanchez_27_W',
//                         CustomerName:'Shannon , White',
//                         LossAddress:'186 Hiney Road',
//                         City:'Houston',
//                         State:'Texas',
//                         Zip:'77217',
//                         JobType:'recon',
//                         JobImage:'./assets/images/recon.png',
//                         Status:'current',
//                         Supervisor:'William',
//                         Estimator:'Estimator',
//                         CreatedDTTM:"02/14/2018 10:00AM"
                    
//                 },
//                 { 
//                         SubJobCode:'FN_Angela_63_M',
//                         CustomerName:'Iris , Vaughan',
//                         LossAddress:'1522 Spring Haven Trail',
//                         City:'Highland Lakes',
//                         State:'New Jersey',
//                         Zip:'07462',
//                         JobType:'Mold',
//                         JobImage:'./assets/images/mold.png',
//                         Status:'pending',
//                         Supervisor:'Paul',
//                         Estimator:'Estimator',
//                         CreatedDTTM:"02/16/2018 10:00AM"
                    
//                 }
//           ];
        //   this.subJobs2 =  
        //  [
        //         { 
        //                 SubJobCode:'FN_Ben_27_W',
        //                 CustomerName:'Ronnie , Soares',
        //                 LossAddress:'987 Vernon Street',
        //                 City:'Irvine',
        //                 State:'California',
        //                 Zip:'92614',
        //                 JobType:'Content',
        //                 JobImage:'./assets/images/content.png',
        //                 Status:'pending',
        //                 Supervisor:'Paulette',
        //                 Estimator:'Estimator',
        //                 CreatedDTTM:"03/10/2018 10:00AM"
                    
        //         },
        //         { 
        //                 SubJobCode:'FN_Harris_63_M',
        //                 CustomerName:'Pedro , Jordan',
        //                 LossAddress:'2362 Glen Falls Road',
        //                 City:'Jenkintown',
        //                 State:'Pennsylvania',
        //                 Zip:'19046',
        //                 JobType:'Bio',
        //                 JobImage:'./assets/images/bio.png',
        //                 Status:'current',
        //                 Supervisor:'Shirley',
        //                 Estimator:'Estimator',
        //                 CreatedDTTM:"03/22/2018 10:00AM"
                    
        //         }
        //   ];
    }

}