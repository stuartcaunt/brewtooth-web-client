import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Hop} from 'models';
import {HopService} from 'services';
import {Subject} from 'rxjs/Subject';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'bt-hop-edit',
  templateUrl: './hop-edit.component.html',
  styleUrls: ['./hop-edit.component.scss']
})
export class HopEditComponent {

  hopSubject: Subject<Hop> = new Subject<Hop>();
  private _hop: Hop = new Hop();

  get hop(): Hop {
    return this._hop;
  }

  set hop(hop: Hop) {
    this._hop = new Hop().copy(hop);
  }

  pellets = [
    {value: null, viewValue: ''},
    {value: false, viewValue: 'No'},
    {value: true, viewValue: 'Yes'}];

  nameFormControl = new FormControl('', [Validators.required]);
  alphaAcidFormControl = new FormControl('', [Validators.required, Validators.min(0.0)]);
  isPelletFormControl = new FormControl('', [Validators.required]);

  constructor(private hopService: HopService) {
  }

  getHopObservable(): Observable<Hop> {
    return this.hopSubject.asObservable();
  }

  save() {
    if (this.nameFormControl.valid && this.alphaAcidFormControl.valid && this.isPelletFormControl.valid) {

      // Save hop
      this.hopService.save(this._hop).then(hop => {
        this._hop = hop;

        // Notify observers
        this.hopSubject.next(this._hop);
      });
    }
  }

  cancel() {
    // Notify observers - send null object
    this.hopSubject.next(null);
  }
}
