import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from 'environments/environment';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Malt } from 'models';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MaltService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getMalts(): Observable<Malt[]> {
    const url = `${environment.apiUrl}/malts`;
    return this.http
      .get(url, {headers: this.headers})
      .map(response => response.json() as Malt[]);
  }

}
