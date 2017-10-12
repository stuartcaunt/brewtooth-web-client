import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { MashControllerState, MashControllerHistory } from 'models';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class MashControllerService {

  private static UPDATE_PERIOD: number = 2000;

  private history: MashControllerHistory[];
  
  private lastUpdateTime: number = 0;
  private stateObservable: BehaviorSubject<MashControllerState> = new BehaviorSubject<MashControllerState>(new MashControllerState());
  private timer:Observable<number> = null;

  constructor(private http: Http) { 
    this.getHistory().subscribe(history => {
      this.history = history;
    });

    this.timer = Observable.timer(100, MashControllerService.UPDATE_PERIOD);
    this.timer.subscribe(t => this.updateState());
  }

  updateState(): void {
    const url = `${environment.mashControllerApiUrl}/state`;
    this.http
      .get(url)
      .map(response => response.json() as MashControllerState)
      .subscribe(state => {
        let history: MashControllerHistory = MashControllerHistory.createFromState(state);
        this.history.push(history);

        this.stateObservable.next(state);
      });
  }

  getStateObservable(): BehaviorSubject<MashControllerState> {
    return this.stateObservable;
  }

  getHistory(): Observable<MashControllerHistory[]> {
    const url = `${environment.mashControllerApiUrl}/history`;
    return this.http
      .get(url)
      .map(response => response.json() as MashControllerHistory[]);
  }
}
