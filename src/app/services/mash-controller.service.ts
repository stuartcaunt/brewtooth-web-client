import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { MashControllerState, MashControllerHistory } from 'models';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MashControllerService {

  constructor(private http: Http) { }

  getState(): Observable<MashControllerState> {
    const url = `${environment.mashControllerApiUrl}/state`;
    return this.http
      .get(url)
      .map(response => response.json() as MashControllerState);
  }

  getHistory(): Observable<MashControllerHistory[]> {
    const url = `${environment.mashControllerApiUrl}/history`;
    return this.http
      .get(url)
      .map(response => response.json() as MashControllerHistory[]);
  }
}
