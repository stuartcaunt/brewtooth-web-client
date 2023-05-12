
import {map} from 'rxjs/operators';
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from 'environments/environment';




import { Hop } from 'models';
import {Observable} from 'rxjs';

@Injectable()
export class HopService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getHops(): Observable<Hop[]> {
    const url = `${environment.apiUrl}/hops`;
    return this.http
      .get(url, {headers: this.headers}).pipe(
      map(response => response.json() as Hop[]));
  }

  save(hop: Hop): Promise<Hop> {
    if (hop.id == null) {
      return this.create(hop);

    } else {
      return this.update(hop);
    }
  }

  create(hop: Hop): Promise<Hop> {
    const url = `${environment.apiUrl}/hops`;
    return this.http
      .post(url, JSON.stringify(hop), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Hop)
      .catch(this.handleError);
  }

  update(hop: Hop): Promise<Hop> {
    const url = `${environment.apiUrl}/hops/${hop.id}`;
    return this.http
      .put(url, JSON.stringify(hop), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Hop)
      .catch(this.handleError);
  }

  delete(hop: Hop): Promise<Hop> {
    const url = `${environment.apiUrl}/hops/${hop.id}`;
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
