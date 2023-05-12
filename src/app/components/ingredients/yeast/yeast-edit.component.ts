import {Component} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Yeast} from 'models';
import {YeastService} from 'services';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'bt-yeast-edit',
  templateUrl: './yeast-edit.component.html',
  styleUrls: ['./yeast-edit.component.scss']
})
export class YeastEditComponent {

  yeastSubject: Subject<Yeast> = new Subject<Yeast>();
  private _yeast: Yeast = new Yeast();

  get yeast(): Yeast {
    return this._yeast;
  }

  set yeast(yeast: Yeast) {
    this._yeast = new Yeast().copy(yeast);
  }

  manufacturerFormControl = new FormControl('', [Validators.required]);
  nameFormControl = new FormControl('', [Validators.required]);
  attenuationFormControl = new FormControl('', [Validators.required, Validators.min(0.0), Validators.max(1.0)]);

  constructor(private yeastService: YeastService) {
  }

  getYeastObservable(): Observable<Yeast> {
    return this.yeastSubject.asObservable();
  }

  save() {
    if (this.nameFormControl.valid && this.manufacturerFormControl.valid && this.attenuationFormControl.valid) {

      // Save yeast
      this.yeastService.save(this._yeast).then(yeast => {
        this._yeast = yeast;

        // Notify observers
        this.yeastSubject.next(this._yeast);
      });
    }
  }

  cancel() {
    // Notify observers - send null object
    this.yeastSubject.next(null);
  }
}
