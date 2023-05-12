
import {map} from 'rxjs/operators';
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from 'environments/environment';




import { OtherIngredient } from 'models';
import {Observable} from 'rxjs';

@Injectable()
export class OtherIngredientService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getOtherIngredients(): Observable<OtherIngredient[]> {
    const url = `${environment.apiUrl}/otherIngredients`;
    return this.http
      .get(url, {headers: this.headers}).pipe(
      map(response => response.json() as OtherIngredient[]));
  }

  save(otherIngredient: OtherIngredient): Promise<OtherIngredient> {
    if (otherIngredient.id == null) {
      return this.create(otherIngredient);

    } else {
      return this.update(otherIngredient);
    }
  }

  create(otherIngredient: OtherIngredient): Promise<OtherIngredient> {
    const url = `${environment.apiUrl}/otherIngredients`;
    return this.http
      .post(url, JSON.stringify(otherIngredient), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as OtherIngredient)
      .catch(this.handleError);
  }

  update(otherIngredient: OtherIngredient): Promise<OtherIngredient> {
    const url = `${environment.apiUrl}/otherIngredients/${otherIngredient.id}`;
    return this.http
      .put(url, JSON.stringify(otherIngredient), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as OtherIngredient)
      .catch(this.handleError);
  }

  delete(otherIngredient: OtherIngredient): Promise<OtherIngredient> {
    const url = `${environment.apiUrl}/otherIngredients/${otherIngredient.id}`;
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
