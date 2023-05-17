
import {timer as observableTimer, Observable, Subject, BehaviorSubject} from 'rxjs';

import {map} from 'rxjs/operators';
import { Injectable }    from '@angular/core';
import { environment } from 'environments/environment';




import { MashControllerState, MashControllerHistory, TemperatureProfile, PIDParams } from 'models';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MashControllerService {

  private static UPDATE_PERIOD: number = 2000;

  private _state$: BehaviorSubject<MashControllerState> = new BehaviorSubject<MashControllerState>(null);
  private timer:Observable<number> = null;

  get state$(): BehaviorSubject<MashControllerState> {
    return this._state$;
  }

  constructor(private http: HttpClient) {
    this.timer = observableTimer(0, MashControllerService.UPDATE_PERIOD);
    this.timer.subscribe(t => this.updateState());
  }

  private setState(state: MashControllerState): void {
    state.outputPercent = state.outputMax == 0 ? 0 : state.controllerOutput / state.outputMax * 100;

    this._state$.next(state);
  }

  updateState(): void {
    const url = `${environment.mashControllerApiUrl}/state`;
    this.http.get<MashControllerState>(url).subscribe(state => {
      this.setState(state);
    });
  }

  getHistory(): Observable<MashControllerHistory[]> {
    const url = `${environment.mashControllerApiUrl}/history`;
    return this.http.get<MashControllerHistory[]>(url);
  }

  setPID(kp: number, ki: number, kd: number): void {
    let pidParams: PIDParams = new PIDParams();
    pidParams.kp = kp;
    pidParams.ki = ki;
    pidParams.kd = kd;
    const url = `${environment.mashControllerApiUrl}/pid`;
    this.http.post<PIDParams>(url, JSON.stringify(pidParams)).subscribe(pidParams => {});
  }

  enableAutoControl(enabled: boolean): void {
    const url = `${environment.mashControllerApiUrl}/` + (enabled ? 'automatic' : 'manual');
    this.http.get<MashControllerState>(url).subscribe(state => {
      this.setState(state);
    });
  }

  enableHeater(enabled: boolean): void {
    const url = `${environment.mashControllerApiUrl}/heater/` + (enabled ? 'start' : 'stop');
    this.http.get<MashControllerState>(url).subscribe(state => {
      this.setState(state);
    });
  }

  enableAgitator(enabled: boolean): void {
    const url = `${environment.mashControllerApiUrl}/agitator/` + (enabled ? 'start' : 'stop');
    this.http.get<MashControllerState>(url).subscribe(state => {
      this.setState(state);
    });
  }

  startControlWithTemperatureProfile(temperatureProfile: TemperatureProfile): void {
    const url = `${environment.mashControllerApiUrl}/start`;
    this.http.post<MashControllerState>(url, JSON.stringify(temperatureProfile)).subscribe(state => {
      this.setState(state);
    });
  }

  startTemperatureControlProfileLevel(): void {
    const url = `${environment.mashControllerApiUrl}/profile/start`;
    this.http.get<MashControllerState>(url).subscribe(state => {
      this.setState(state);
    });

  }

  skipTemperatureControlProfileLevel(): void {
    const url = `${environment.mashControllerApiUrl}/profile/skip`;
    this.http.get<MashControllerState>(url).subscribe(state => {
      this.setState(state);
    });

  }

  stopControl(): void {
    const url = `${environment.mashControllerApiUrl}/stop`;
    this.http.get<MashControllerState>(url).subscribe(state => {
      this.setState(state);
    });
  }
}
