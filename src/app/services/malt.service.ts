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

  create(malt: Malt): Promise<Malt> {
    const url = `${environment.apiUrl}/malts`;
    return this.http
      .post(url, JSON.stringify(malt), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Malt)
      .catch(this.handleError);
  }

  update(malt: Malt): Promise<Malt> {
    const url = `${environment.apiUrl}/malts/${malt.id}`;
    return this.http
      .put(url, JSON.stringify(malt), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Malt)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
