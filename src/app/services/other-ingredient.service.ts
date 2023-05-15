
import {catchError, map} from 'rxjs/operators';
import { Injectable }    from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'environments/environment';


import { OtherIngredient } from 'models';
import {Observable, throwError} from 'rxjs';

@Injectable()
export class OtherIngredientService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getOtherIngredients(): Observable<OtherIngredient[]> {
    const url = `${environment.apiUrl}/otherIngredients`;
    return this.http.get<OtherIngredient[]>(url, {headers: this.headers});
  }

  save(otherIngredient: OtherIngredient): Observable<OtherIngredient> {
    if (otherIngredient.id == null) {
      return this.create(otherIngredient);

    } else {
      return this.update(otherIngredient);
    }
  }

  create(otherIngredient: OtherIngredient): Observable<OtherIngredient> {
    const url = `${environment.apiUrl}/otherIngredients`;
    return this.http.post<OtherIngredient>(url, JSON.stringify(otherIngredient), {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  update(otherIngredient: OtherIngredient): Observable<OtherIngredient> {
    const url = `${environment.apiUrl}/otherIngredients/${otherIngredient.id}`;
    return this.http.put<OtherIngredient>(url, JSON.stringify(otherIngredient), {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(otherIngredient: OtherIngredient): Observable<OtherIngredient> {
    const url = `${environment.apiUrl}/otherIngredients/${otherIngredient.id}`;
    return this.http.delete<OtherIngredient>(url, {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<OtherIngredient> {
    console.error('An error occurred', error);
    return throwError(() => new Error(error.message || error));
  }

}
