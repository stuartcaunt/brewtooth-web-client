import {Component, OnInit, ViewChild} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {Malt} from 'models';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'malt-create-modal',
  template: `<bt-malt-create #maltCreateComponent></bt-malt-create>`
})

export class MaltCreateModalComponent implements OnInit {

  malt: Malt = new Malt();

  @ViewChild('maltCreateComponent') maltCreateComponent;

  constructor(public dialogRef: MdDialogRef<MaltCreateModalComponent>) {
  }

  ngOnInit(): void {
    let observable: Observable<Malt> = this.maltCreateComponent
      .getMaltObservable()
      .subscribe(malt => {
      this.dialogRef.close(malt);
    });
  }

}
