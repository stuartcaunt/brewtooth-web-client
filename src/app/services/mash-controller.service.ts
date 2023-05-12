
import {timer as observableTimer, Observable, Subject, BehaviorSubject} from 'rxjs';

import {map} from 'rxjs/operators';
import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';




import { MashControllerState, MashControllerHistory, TemperatureProfile, PIDParams } from 'models';

@Injectable()
export class MashControllerService {

  private static UPDATE_PERIOD: number = 2000;
  private headers = new Headers({'Content-Type': 'application/json'});
  
  private history: MashControllerHistory[] = new Array<MashControllerHistory>();
  private historyObservable: Subject<MashControllerHistory[]> = new Subject<MashControllerHistory[]>();
  
  private lastUpdateTime: number = 0;
  private stateObservable: BehaviorSubject<MashControllerState> = new BehaviorSubject<MashControllerState>(new MashControllerState());
  private timer:Observable<number> = null;

  constructor(private http: Http) { 
    this.getHistory().subscribe(history => {
      this.history = history;
      this.historyObservable.next(this.history);
    });

    this.timer = observableTimer(0, MashControllerService.UPDATE_PERIOD);
    this.timer.subscribe(t => this.updateState());
  }

  private setState(state: MashControllerState): void {
    let history: MashControllerHistory = MashControllerHistory.createFromState(state);

    if (this.history.length > 0) {
      this.history.push(history);
      this.historyObservable.next(this.history);
    }

    state.outputPercent = state.outputMax == 0 ? 0 : state.controllerOutput / state.outputMax * 100;
    
    this.stateObservable.next(state);
  }

  updateState(): void {
    const url = `${environment.mashControllerApiUrl}/state`;
    this.http
      .get(url).pipe(
      map(response => response.json() as MashControllerState))
      .subscribe(state => {
        this.setState(state);
      });
  }

  getStateObservable(): BehaviorSubject<MashControllerState> {
    return this.stateObservable;
  }

  getHistoryObservable(): Subject<MashControllerHistory[]> {
    return this.historyObservable;
  }

  getHistory(): Observable<MashControllerHistory[]> {
    const url = `${environment.mashControllerApiUrl}/history`;
    return this.http
      .get(url).pipe(
      map(response => {
        let history = response.json() as MashControllerHistory[];
        return history;
      }));
  }

  setPID(kp: number, ki: number, kd: number): void {
    let pidParams: PIDParams = new PIDParams();
    pidParams.kp = kp;
    pidParams.ki = ki;
    pidParams.kd = kd;
    const url = `${environment.mashControllerApiUrl}/pid`;
    this.http
      .post(url, JSON.stringify(pidParams)).pipe(
      map(response => response.json() as PIDParams))
      .subscribe(pidParams => {
      });
  }

  enableAutoControl(enabled: boolean): void {
    const url = `${environment.mashControllerApiUrl}/` + (enabled ? 'automatic' : 'manual');
    this.http
      .get(url).pipe(
      map(response => response.json() as MashControllerState))
      .subscribe(state => {
        this.setState(state);
      });
  }

  enableHeater(enabled: boolean): void {
    const url = `${environment.mashControllerApiUrl}/heater/` + (enabled ? 'start' : 'stop');
    this.http
      .get(url).pipe(
      map(response => response.json() as MashControllerState))
      .subscribe(state => {
        this.setState(state);
      });
  }

  enableAgitator(enabled: boolean): void {
    const url = `${environment.mashControllerApiUrl}/agitator/` + (enabled ? 'start' : 'stop');
    this.http
      .get(url).pipe(
      map(response => response.json() as MashControllerState))
      .subscribe(state => {
        this.setState(state);
      });
  }

  startControlWithTemperatureProfile(temperatureProfile: TemperatureProfile): void {
    const url = `${environment.mashControllerApiUrl}/start`;
    this.http
      .post(url, JSON.stringify(temperatureProfile)).pipe(
      map(response => response.json() as MashControllerState))
      .subscribe(state => {
        this.setState(state);
      });    
  }

  startTemperatureControlProfileLevel(): void {
    const url = `${environment.mashControllerApiUrl}/profile/start`;
    this.http
    .get(url).pipe(
    map(response => response.json() as MashControllerState))
    .subscribe(state => {
      this.setState(state);
    });

  }

  skipTemperatureControlProfileLevel(): void {
    const url = `${environment.mashControllerApiUrl}/profile/skip`;
    this.http
    .get(url).pipe(
    map(response => response.json() as MashControllerState))
    .subscribe(state => {
      this.setState(state);
    });

  }

  stopControl(): void {
    const url = `${environment.mashControllerApiUrl}/stop`;
    this.http
      .get(url).pipe(
      map(response => response.json() as MashControllerState))
      .subscribe(state => {
        this.setState(state);
      });    
  }
}
