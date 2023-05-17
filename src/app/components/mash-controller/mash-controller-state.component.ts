import {Component, OnInit} from '@angular/core';
import {filter, Observable} from 'rxjs';

import {MashControllerService} from 'services';
import {MashControllerHistory, MashControllerState} from 'models';

@Component({
  selector: 'bt-mash-controller-state',
  templateUrl: './mash-controller-state.component.html',
  styleUrls: ['./mash-controller-state.component.scss']
})
export class MashControllerStateComponent implements OnInit {

  state: MashControllerState = new MashControllerState();
  kp: number = 0.0;
  ki: number = 0.0;
  kd: number = 0.0;
  firstState: boolean = true;

  constructor (private mashControllerService: MashControllerService) {
  }

  ngOnInit(): void {
    this.mashControllerService.state$.pipe(
        filter(state => state != null)
      ).subscribe(state => {
        this.state = state;
        if (this.firstState && this.state.currentTimeS != 0) {
          this.kp = state.kp;
          this.ki = state.ki;
          this.kd = state.kd;
          this.firstState = false;
        }
      });
  }

  setPID(): void {
    this.mashControllerService.setPID(this.kp, this.ki, this.kd);
  }

  toggleAutoControl(): void {
    this.mashControllerService.enableAutoControl(!this.state.autoControl);
  }

  toggleHeater(): void {
    this.mashControllerService.enableHeater(!this.state.heaterActive);
  }

  toggleAgitator(): void {
    this.mashControllerService.enableAgitator(!this.state.agitatorActive);
  }
}


