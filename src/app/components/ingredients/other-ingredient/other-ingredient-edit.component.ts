import {Component} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {OtherIngredient} from 'models';
import {OtherIngredientService} from 'services';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'bt-other-ingredient-edit',
  templateUrl: './other-ingredient-edit.component.html',
  styleUrls: ['./other-ingredient-edit.component.scss']
})
export class OtherIngredientEditComponent {

  otherIngredientSubject: Subject<OtherIngredient> = new Subject<OtherIngredient>();
  private _otherIngredient: OtherIngredient = new OtherIngredient();

  get otherIngredient(): OtherIngredient {
    return this._otherIngredient;
  }

  set otherIngredient(otherIngredient: OtherIngredient) {
    this._otherIngredient = new OtherIngredient().copy(otherIngredient);
  }

  nameFormControl = new FormControl('', [Validators.required]);

  constructor(private otherIngredientService: OtherIngredientService) {
  }

  getOtherIngredientObservable(): Observable<OtherIngredient> {
    return this.otherIngredientSubject.asObservable();
  }

  save() {
    if (this.nameFormControl.valid) {

      // Save otherIngredient
      this.otherIngredientService.save(this._otherIngredient).subscribe(otherIngredient => {
        this._otherIngredient = otherIngredient;

        // Notify observers
        this.otherIngredientSubject.next(this._otherIngredient);
      });
    }
  }

  cancel() {
    // Notify observers - send null object
    this.otherIngredientSubject.next(null);
  }
}
