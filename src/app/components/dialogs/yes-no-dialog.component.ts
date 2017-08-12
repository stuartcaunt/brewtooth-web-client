import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'yes-no-dialog',
  templateUrl: 'yes-no-dialog.component.html',
  styleUrls: ['yes-no-dialog.component.scss']
})

export class YesNoDialogComponent {
  message: String = 'A message';

  constructor(public dialogRef: MdDialogRef<YesNoDialogComponent>) {
  }

  yes() {
    this.dialogRef.close(true);
  }

  no() {
    this.dialogRef.close(false);
  }
}
