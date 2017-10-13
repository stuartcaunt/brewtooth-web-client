import { TemperatureLevel } from '.';

export class TemperatureProfile {
  name: string;
  state: string;
  levels: TemperatureLevel[];
  activeLevel: number;
}
