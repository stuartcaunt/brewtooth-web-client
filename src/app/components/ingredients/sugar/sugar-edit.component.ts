import {Component} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Sugar} from 'models';
import {SugarService} from 'services';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'bt-sugar-edit',
  templateUrl: './sugar-edit.component.html',
  styleUrls: ['./sugar-edit.component.scss']
})
export class SugarEditComponent {

  sugarSubject: Subject<Sugar> = new Subject<Sugar>();
  private _sugar: Sugar = new Sugar();

  get sugar(): Sugar {
    return this._sugar;
  }

  set sugar(sugar: Sugar) {
    this._sugar = new Sugar().copy(sugar);
  }

  nameFormControl = new FormControl('', [Validators.required]);

  constructor(private sugarService: SugarService) {
  }

  getSugarObservable(): Observable<Sugar> {
    return this.sugarSubject.asObservable();
  }

  save() {
    if (this.nameFormControl.valid) {

      // Save sugar
      this.sugarService.save(this._sugar).then(sugar => {
        this._sugar = sugar;

        // Notify observers
        this.sugarSubject.next(this._sugar);
      });
    }
  }

  cancel() {
    // Notify observers - send null object
    this.sugarSubject.next(null);
  }
}
