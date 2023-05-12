import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Malt} from 'models';
import {Observable} from 'rxjs';

@Component({
  selector: 'bt-malt-edit-modal',
  template: `<div class="malt-edit-modal-container"><bt-malt-edit #maltEditComponent></bt-malt-edit></div>`,
  styles: ['.malt-edit-modal-container { width:500px}']
})

export class MaltEditModalComponent implements OnInit {

  malt: Malt = new Malt();

  @ViewChild('maltEditComponent') maltEditComponent;

  constructor(public dialogRef: MatDialogRef<MaltEditModalComponent>) {
  }

  ngOnInit(): void {
    this.maltEditComponent.malt = this.malt;

    let observable: Observable<Malt> = this.maltEditComponent
      .getMaltObservable()
      .subscribe(malt => {
      this.dialogRef.close(malt);
    });
  }

}
