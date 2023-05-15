
import {catchError, map} from 'rxjs/operators';
import { Injectable }    from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'environments/environment';


import { Malt } from 'models';
import {Observable, throwError} from 'rxjs';

@Injectable()
export class MaltService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getMalts(): Observable<Malt[]> {
    const url = `${environment.apiUrl}/malts`;
    return this.http.get<Malt[]>(url, {headers: this.headers});
  }

  save(malt: Malt): Observable<Malt> {
    if (malt.id == null) {
      return this.create(malt);

    } else {
      return this.update(malt);
    }
  }

  create(malt: Malt): Observable<Malt> {
    const url = `${environment.apiUrl}/malts`;
    return this.http.post<Malt>(url, JSON.stringify(malt), {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  update(malt: Malt): Observable<Malt> {
    const url = `${environment.apiUrl}/malts/${malt.id}`;
    return this.http.put<Malt>(url, JSON.stringify(malt), {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(malt: Malt): Observable<Malt> {
    const url = `${environment.apiUrl}/malts/${malt.id}`;
    return this.http.delete<Malt>(url, {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<Malt> {
    console.error('An error occurred', error);
    return throwError(() => new Error(error.message || error));
  }

}
