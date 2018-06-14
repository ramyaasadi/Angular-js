export class MasterNumberGrid {
   masterHash:string;
   masterNumber:string;
   customerName:string;
   address:string;
   city:string;
   zip:string;
   phoneNo:string;
   jobsCount:number;
   jobs:MasterNumberGridJob [];
}

export class MasterNumberGridJob{
   jobType:string;
   jobHash:string[];
   jobImage:string;
}