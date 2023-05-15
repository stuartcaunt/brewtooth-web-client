
import {catchError, map} from 'rxjs/operators';
import { Injectable }    from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'environments/environment';


import { Hop } from 'models';
import {Observable, throwError} from 'rxjs';

@Injectable()
export class HopService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getHops(): Observable<Hop[]> {
    const url = `${environment.apiUrl}/hops`;
    return this.http.get<Hop[]>(url, {headers: this.headers});
  }

  save(hop: Hop): Observable<Hop> {
    if (hop.id == null) {
      return this.create(hop);

    } else {
      return this.update(hop);
    }
  }

  create(hop: Hop): Observable<Hop> {
    const url = `${environment.apiUrl}/hops`;
    return this.http.post<Hop>(url, JSON.stringify(hop), {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  update(hop: Hop): Observable<Hop> {
    const url = `${environment.apiUrl}/hops/${hop.id}`;
    return this.http.put<Hop>(url, JSON.stringify(hop), {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(hop: Hop): Observable<Hop> {
    const url = `${environment.apiUrl}/hops/${hop.id}`;
    return this.http.delete<Hop>(url, {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<Hop> {
    console.error('An error occurred', error);
    return throwError(() => new Error(error.message || error));
  }

}
