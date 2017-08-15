import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from 'environments/environment';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Yeast } from 'models';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class YeastService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getYeasts(): Observable<Yeast[]> {
    const url = `${environment.apiUrl}/yeasts`;
    return this.http
      .get(url, {headers: this.headers})
      .map(response => response.json() as Yeast[]);
  }

  save(yeast: Yeast): Promise<Yeast> {
    if (yeast.id == null) {
      return this.create(yeast);

    } else {
      return this.update(yeast);
    }
  }

  create(yeast: Yeast): Promise<Yeast> {
    const url = `${environment.apiUrl}/yeasts`;
    return this.http
      .post(url, JSON.stringify(yeast), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Yeast)
      .catch(this.handleError);
  }

  update(yeast: Yeast): Promise<Yeast> {
    const url = `${environment.apiUrl}/yeasts/${yeast.id}`;
    return this.http
      .put(url, JSON.stringify(yeast), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Yeast)
      .catch(this.handleError);
  }

  delete(yeast: Yeast): Promise<Yeast> {
    const url = `${environment.apiUrl}/yeasts/${yeast.id}`;
    return this.http
      .delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
