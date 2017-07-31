import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from 'environments/environment';

import 'rxjs/add/operator/toPromise';

import { Malt } from 'models';

@Injectable()
export class MaltService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getMalts(): Promise<Malt[]> {
    const url = `${environment.apiUrl}/malts`;
    return this.http
      .get(url, {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Malt[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
