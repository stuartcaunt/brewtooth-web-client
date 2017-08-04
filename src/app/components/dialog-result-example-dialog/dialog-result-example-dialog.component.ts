import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {Malt} from 'models';

@Component({
  selector: 'dialog-result-example-dialog',
  template: `<div>hello</div>
    <button type="button" md-raised-button (click)="dialogRef.close(this.malt)">OK</button>
    <button type="button" md-button (click)="dialogRef.close()">Cancel</button>`
})

export class DialogResultExampleDialog implements OnInit {

  malt: Malt = new Malt();

  constructor(public dialogRef: MdDialogRef<DialogResultExampleDialog>) {}

  ngOnInit(): void {
    this.malt.name = 'toto';
  }

}
