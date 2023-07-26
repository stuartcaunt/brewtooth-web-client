import { TemperatureLevel } from '.';

export class TemperatureProfile {
  state: string;
  levels: TemperatureLevel[] = new Array<TemperatureLevel>();
  activeLevel: number;
  toleranceC: number;
  startTimeS: number;
}
