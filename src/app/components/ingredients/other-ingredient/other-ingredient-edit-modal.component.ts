import {Component, OnInit, ViewChild} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {OtherIngredient} from 'models';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'bt-other-ingredient-edit-modal',
  template: `
    <div class="other-ingredient-edit-modal-container">
      <bt-other-ingredient-edit #otherIngredientEditComponent></bt-other-ingredient-edit>
    </div>`,
  styles: ['.other-ingredient-edit-modal-container { width:500px}']
})
export class OtherIngredientEditModalComponent implements OnInit {

  otherIngredient: OtherIngredient = new OtherIngredient();

  @ViewChild('otherIngredientEditComponent') otherIngredientEditComponent;

  constructor(public dialogRef: MdDialogRef<OtherIngredientEditModalComponent>) {
  }

  ngOnInit(): void {
    this.otherIngredientEditComponent.otherIngredient = this.otherIngredient;

    let observable: Observable<OtherIngredient> = this.otherIngredientEditComponent
      .getOtherIngredientObservable()
      .subscribe(otherIngredient => {
      this.dialogRef.close(otherIngredient);
    });
  }

}
