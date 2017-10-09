export class MashControllerState {
  running: boolean;
  currentTimeS: number;
  runTimeS: number;
  temperatureC: number;
  controlType: string;
  setpointC: number;
  controllerOutput: number;
  heaterActive: boolean;
  agitatorActive: boolean;
  autoControl: boolean;
  kp: number;
  ki: number;
  kd: number;
  outputMax: number;
}
