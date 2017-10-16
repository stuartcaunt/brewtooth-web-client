import { TemperatureLevel } from '.';

export class TemperatureProfile {
  name: string;
  state: string;
  levels: TemperatureLevel[] = new Array<TemperatureLevel>();
  activeLevel: number;
}
