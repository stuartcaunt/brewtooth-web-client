import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Malt} from 'models';
import {MaltService} from 'services';
import {Subject} from 'rxjs/Subject';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'bt-malt-create',
  templateUrl: './malt-create.component.html',
  styleUrls: [ './malt-create.component.css' ]
})

export class MaltCreateComponent {

  maltSubject: Subject<Malt> = new Subject<Malt>();
  malt: Malt = new Malt();

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
      // this.malt.name = this.nameFormControl.value;
      // this.malt.grain = this.grainFormControl.value;
      // this.malt.yield = this.yieldFormControl.value;
      // this.malt.ebc = this.ebcFormControl.value;

      // Save malt
      this.maltService.create(this.malt).then(malt => {
        this.malt = malt;

        // Notify observers
        this.maltSubject.next(this.malt);
      });
    }
  }
}
