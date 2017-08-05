import {Component, OnInit, ViewChild} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {Malt} from 'models';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'malt-create-modal',
  template: `<div class="malt-create-modal-container"><bt-malt-create #maltCreateComponent></bt-malt-create></div>`,
  styles: ['.malt-create-modal-container { width:500px}']
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
