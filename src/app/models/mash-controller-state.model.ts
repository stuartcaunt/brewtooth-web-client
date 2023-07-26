import { TemperatureProfile } from '.';

export class MashControllerState {
  running: boolean = false;
  currentTimeS: number = 0.0;
  runTimeS: number = 0.0;
  temperatureC: number = 0.0;
  controlType: string = 'SETPOINT';
  temperatureProfile: TemperatureProfile;
  setpointC: number = 0.0;
  controllerOutput: number = 0.0;
  heaterActive: boolean = false;
  agitatorActive: boolean = false;
  autoTemperatureControl: boolean = false;
  kp: number = 1.0;
  ki: number = 1.0;
  kd: number = 1.0;
  outputMax: number = 0.0;
  outputPercent: number = this.outputMax == 0 ? 0 : this.controllerOutput / this.outputMax;
}
