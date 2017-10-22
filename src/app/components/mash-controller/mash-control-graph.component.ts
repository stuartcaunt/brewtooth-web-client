import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';

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
    scales: {
      xAxes: [{
          type: 'time',
          displayFormats: {
            quarter: 'h:mm:ss'
        }
      }]
    }
  };

  private datasets: Array<any> = [
      {
        label: "Temperature °c",
        data: []
      }
    ];


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
    let data = new Array<any>();
    history.forEach(historyValue => {
      let timeMs = historyValue.timeS * 1000;

      this.datasets[0].data.push({
          x: new Date(timeMs),
          y: historyValue.temperatureC
        });
    });

    this.chart.chart.update();
  }

  private updateGraphData(state: MashControllerState) {
    if (this.datasets[0].data.length == 0) {
      return;
    }

    let timeMs = state.currentTimeS * 1000;

    this.datasets[0].data.push({
      x: new Date(timeMs),
      y: state.temperatureC
    });

    this.chart.chart.update();
  }
}


