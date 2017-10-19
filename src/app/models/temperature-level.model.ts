export class TemperatureLevel {
  name: string;
  setpointC: number = 20;
  durationS: number = 60;
  startTimeS: number;
  timerS: number;
  state: string;
}
