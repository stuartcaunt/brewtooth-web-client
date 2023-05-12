import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';

import {MashControllerHistory, MashControllerState} from 'models';
import {MashControllerService} from 'services';
import {BaseChartDirective} from 'ng2-charts/ng2-charts';

@Component({
  selector: 'bt-mash-control-graph',
  templateUrl: './mash-control-graph.component.html',
  styleUrls: ['./mash-control-graph.component.scss']
})
export class MashControlGraphComponent implements OnInit {

  @ViewChild('chart') chart: BaseChartDirective;

  private chartType = 'line';
  private chartOptions  = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        type: 'time',
        displayFormats: {
          minute: 'h:mm'
        } 
      }],
      yAxes: [
        {
          id: 'temperature',
          type: 'linear',
          position: 'left',
          scalePositionLeft: true
        },
        {
          id: 'power',
          type: 'linear',
          position: 'right',
          scalePositionLeft: false,
          beginAtZero: true,
          ticks: {
            min: 0,
            max: 100
          }
        }
      ]
    }
  };

  private datasets: Array<any> = [{
    label: "Temperature °c",
    yAxisID: 'temperature',
    data: [],
    pointRadius: 0,
    fill: false
  }, {
    label: "Heater",
    yAxisID: 'power',
    data: [],
    pointRadius: 0,
    fill: true
  }, {
    label: "Controller",
    yAxisID: 'power',
    data: [],
    pointRadius: 0,
    fill: false
  }];

  private timeOffsetMs: number = 0;

  constructor (private mashControllerService: MashControllerService) {
  }

  ngOnInit(): void {
    this.mashControllerService.getHistory().subscribe(history => {
      this.initGraphData(history);
    })
    this.mashControllerService.getStateObservable().subscribe(state => {
      this.updateGraphData(state);
    })
  }

  private initGraphData(history: MashControllerHistory[]) {
    // Reset all arrays
    this.datasets[0].data.length = 0;
    this.datasets[1].data.length = 0;
    this.datasets[2].data.length = 0;
    
    history.forEach(historyValue => {
      let timeMs = historyValue.timeS * 1000;
      let time = new Date(timeMs + this.timeOffsetMs);
      
      // Temperature
      this.datasets[0].data.push({
        x: time,
        y: historyValue.temperatureC
      });
      
      // Heater state
      this.datasets[1].data.push({
        x: time,
        y: historyValue.heaterActive ? 100 : 0
      });

      // Controller output
      this.datasets[2].data.push({
        x: time,
        y: historyValue.controllerOutputPercent
      });
    });

    this.chart.chart.update();
  }

  private updateGraphData(state: MashControllerState) {
    // Ignore bad data
    if (state.currentTimeS == 0) {
      return;
    }

    let timeMs = state.currentTimeS * 1000;

    // Calculate time offset
    if (this.timeOffsetMs == 0) {
      let now = new Date().getTime();

      this.timeOffsetMs = now - timeMs;

      // Update all existing data to apply date offset
      for (let j = 0; j < 3; j++) {
        for (let i = 0; i < this.datasets[j].data.length; i++) {
          let value = this.datasets[j].data[i];
          let timeMs = value.x.getTime() + this.timeOffsetMs;
          value.x = new Date(timeMs);
        }
      }
    }

    let time = new Date(timeMs + this.timeOffsetMs);

    // Temperature
    this.datasets[0].data.push({
      x: time,
      y: state.temperatureC
    });

    // Heater state
    this.datasets[1].data.push({
      x: time,
      y: state.heaterActive ? 100 : 0
    });

    // Controller output
    this.datasets[2].data.push({
      x: time,
      y: state.outputPercent
    });

    this.chart.chart.update();
  }
}


