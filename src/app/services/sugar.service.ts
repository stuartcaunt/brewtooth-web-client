
import {catchError, map} from 'rxjs/operators';
import { Injectable }    from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'environments/environment';


import { Sugar } from 'models';
import {Observable, throwError} from 'rxjs';

@Injectable()
export class SugarService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getSugars(): Observable<Sugar[]> {
    const url = `${environment.apiUrl}/sugars`;
    return this.http.get<Sugar[]>(url, {headers: this.headers});
  }

  save(sugar: Sugar): Observable<Sugar> {
    if (sugar.id == null) {
      return this.create(sugar);

    } else {
      return this.update(sugar);
    }
  }

  create(sugar: Sugar): Observable<Sugar> {
    const url = `${environment.apiUrl}/sugars`;
    return this.http.post<Sugar>(url, JSON.stringify(sugar), {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  update(sugar: Sugar): Observable<Sugar> {
    const url = `${environment.apiUrl}/sugars/${sugar.id}`;
    return this.http.put<Sugar>(url, JSON.stringify(sugar), {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(sugar: Sugar): Observable<Sugar> {
    const url = `${environment.apiUrl}/sugars/${sugar.id}`;
    return this.http.delete<Sugar>(url, {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<Sugar> {
    console.error('An error occurred', error);
    return throwError(() => new Error(error.message || error));
  }

}
