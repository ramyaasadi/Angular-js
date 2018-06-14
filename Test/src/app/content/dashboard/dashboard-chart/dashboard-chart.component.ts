import { Component, OnInit } from '@angular/core';
import {DashboardWall} from '../../../models/status-wall';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
})


export class DashboardChartComponent implements OnInit {
    chart:any;
    addPoint:string;
  constructor() {}
 
  add() {
    this.chart.addPoint(Math.floor(Math.random() * 10));
  }

  ngOnInit(): void {

    this.chart = new Chart({

        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },

        title: {
            text: 'Speedometer'
        },
        yAxis: {
            min: 0,
            max: 200,
            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            // labels: {step: 2,rotation: 'auto'},
        }
        
    // chart: {
    //     type: 'solidgauge'
    // },

    // title: null,

    // pane: {
    //     center: ['50%', '85%'],
    //     size: '140%',
    //     startAngle: -90,
    //     endAngle: 90,
    //     background: {
    //         backgroundColor: '#EEE',
    //         innerRadius: '60%',
    //         outerRadius: '100%',
    //         shape: 'arc'
    //     }
    // },

    // tooltip: {
    //     enabled: false
    // },

   
    // yAxis: {
    //     stops: [
    //         [0.1, '#55BF3B'],
    //         [0.5, '#DDDF0D'], 
    //         [0.9, '#DF5353']
    //     ],
    //     lineWidth: 0,
    //     minorTickInterval: null,
    //     tickAmount: 2,
    //     title: {
    //         y: -70
    //     },
    //     labels: {
    //         y: 16
    //     }
    // },

    // plotOptions: {
    //     solidgauge: {
    //         dataLabels: {
    //             y: 5,
    //             borderWidth: 0,
    //             useHTML: true
    //         }
    //     }
    // }
    
      });

      

  }

}
