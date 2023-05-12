import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'yes-no-dialog',
  templateUrl: 'yes-no-dialog.component.html',
  styleUrls: ['yes-no-dialog.component.scss']
})

export class YesNoDialogComponent {
  message: String = 'A message';

  constructor(public dialogRef: MatDialogRef<YesNoDialogComponent>) {
  }

  yes() {
    this.dialogRef.close(true);
  }

  no() {
    this.dialogRef.close(false);
  }
}
