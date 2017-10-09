import {MashControllerState} from './mash-controller-state.model';

export class MashControllerHistory {
  timeS: number;
  temperatureC: number;
  setpointC: number;
  controllerOutputPercent: number;
  heaterActive: boolean;
  agitatorActive: boolean;

  static createFromState(state: MashControllerState): MashControllerHistory {
    let history: MashControllerHistory = new MashControllerHistory();
    history.timeS = state.currentTimeS;
    history.temperatureC = state.temperatureC;
    history.setpointC = state.setpointC;
    history.controllerOutputPercent = 100.0 * state.controllerOutput / state.outputMax;
    history.heaterActive = state.heaterActive;
    history.agitatorActive = state.agitatorActive;

    return history;
  }
}

