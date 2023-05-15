
import {catchError, map} from 'rxjs/operators';
import { Injectable }    from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'environments/environment';


import { Yeast } from 'models';
import {Observable, throwError} from 'rxjs';

@Injectable()
export class YeastService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getYeasts(): Observable<Yeast[]> {
    const url = `${environment.apiUrl}/yeasts`;
    return this.http.get<Yeast[]>(url, {headers: this.headers});
  }

  save(yeast: Yeast): Observable<Yeast> {
    if (yeast.id == null) {
      return this.create(yeast);

    } else {
      return this.update(yeast);
    }
  }

  create(yeast: Yeast): Observable<Yeast> {
    const url = `${environment.apiUrl}/yeasts`;
    return this.http.post<Yeast>(url, JSON.stringify(yeast), {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  update(yeast: Yeast): Observable<Yeast> {
    const url = `${environment.apiUrl}/yeasts/${yeast.id}`;
    return this.http.put<Yeast>(url, JSON.stringify(yeast), {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(yeast: Yeast): Observable<Yeast> {
    const url = `${environment.apiUrl}/yeasts/${yeast.id}`;
    return this.http.delete<Yeast>(url, {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<Yeast> {
    console.error('An error occurred', error);
    return throwError(() => new Error(error.message || error));
  }

}
