export interface DashboardHorizontalGraphCount {
	status:string;
   message:string;
   dashboardCount: DashboardHorizontalGrapValue[];
}

export interface DashboardHorizontalGrapValue{
   keyName:string;
   kayValue:string;
}