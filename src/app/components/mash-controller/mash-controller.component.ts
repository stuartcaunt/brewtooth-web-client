import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {MashControllerService} from 'services';
import {MashControllerHistory} from 'models';
import {MashControllerState} from '../../models/mash-controller-state.model';

@Component({
  selector: 'bt-mash-controller',
  templateUrl: './mash-controller.component.html',
  styleUrls: ['./mash-controller.component.scss']
})
export class MashControllerComponent implements OnInit {

  history: MashControllerHistory[];
  temperatureC: number;
  setpointC: number;
  currentControllerOutput: number;

  constructor (private mashControllerService: MashControllerService) {
  }

  ngOnInit(): void {
    this.mashControllerService.getHistory().subscribe(history => {
      this.history = history;
    });

    let timer = Observable.timer(5000, 5000);
    timer.subscribe(t => this.updateState());
  }

  updateState(): void {
    this.mashControllerService.getState().subscribe(state => {
      let history: MashControllerHistory = MashControllerHistory.createFromState(state);
      this.history.push(history);

      this.temperatureC = state.temperatureC;
      this.setpointC = state.setpointC;
      this.currentControllerOutput = history.controllerOutputPercent;
    });
  }

}


