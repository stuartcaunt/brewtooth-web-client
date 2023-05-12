
import {map} from 'rxjs/operators';
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from 'environments/environment';




import { Sugar } from 'models';
import {Observable} from 'rxjs';

@Injectable()
export class SugarService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getSugars(): Observable<Sugar[]> {
    const url = `${environment.apiUrl}/sugars`;
    return this.http
      .get(url, {headers: this.headers}).pipe(
      map(response => response.json() as Sugar[]));
  }

  save(sugar: Sugar): Promise<Sugar> {
    if (sugar.id == null) {
      return this.create(sugar);

    } else {
      return this.update(sugar);
    }
  }

  create(sugar: Sugar): Promise<Sugar> {
    const url = `${environment.apiUrl}/sugars`;
    return this.http
      .post(url, JSON.stringify(sugar), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Sugar)
      .catch(this.handleError);
  }

  update(sugar: Sugar): Promise<Sugar> {
    const url = `${environment.apiUrl}/sugars/${sugar.id}`;
    return this.http
      .put(url, JSON.stringify(sugar), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Sugar)
      .catch(this.handleError);
  }

  delete(sugar: Sugar): Promise<Sugar> {
    const url = `${environment.apiUrl}/sugars/${sugar.id}`;
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
