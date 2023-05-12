
import {map} from 'rxjs/operators';
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from 'environments/environment';




import { Malt } from 'models';
import {Observable} from 'rxjs';

@Injectable()
export class MaltService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getMalts(): Observable<Malt[]> {
    const url = `${environment.apiUrl}/malts`;
    return this.http
      .get(url, {headers: this.headers}).pipe(
      map(response => response.json() as Malt[]));
  }

  save(malt: Malt): Promise<Malt> {
    if (malt.id == null) {
      return this.create(malt);

    } else {
      return this.update(malt);
    }
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

  delete(malt: Malt): Promise<Malt> {
    const url = `${environment.apiUrl}/malts/${malt.id}`;
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
