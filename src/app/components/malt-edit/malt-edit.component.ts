import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Malt} from 'models';
import {MaltService} from 'services';
import {Subject} from 'rxjs/Subject';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'bt-malt-edit',
  templateUrl: './malt-edit.component.html',
  styleUrls: [ './malt-edit.component.css' ]
})

export class MaltEditComponent {

  maltSubject: Subject<Malt> = new Subject<Malt>();
  private _malt: Malt = new Malt();

  get malt(): Malt {
    return this._malt;
  }

  set malt(malt: Malt) {
    this._malt = new Malt().copy(malt);
  }

  grains = [
    {value: 'BARLEY', viewValue: 'Barley'},
    {value: 'WHEAT', viewValue: 'Wheat'},
    {value: 'OAT', viewValue: 'Oat'}];

  nameFormControl = new FormControl('', [Validators.required]);
  grainFormControl = new FormControl('', [Validators.required]);
  yieldFormControl = new FormControl('', [Validators.required, Validators.max(1.0), Validators.min(0.0)]);
  ebcFormControl = new FormControl('', [Validators.required, Validators.min(0.0)]);

  constructor(private maltService: MaltService) {
  }

  getMaltObservable(): Observable<Malt> {
    return this.maltSubject.asObservable();
  }

  save() {
    if (this.nameFormControl.valid && this.grainFormControl.valid && this.yieldFormControl.valid && this.ebcFormControl.valid) {

      // Save malt
      this.maltService.save(this._malt).then(malt => {
        this._malt = malt;

        // Notify observers
        this.maltSubject.next(this._malt);
      });
    }
  }

  cancel() {
    // Notify observers - send null object
    this.maltSubject.next(null);
  }
}