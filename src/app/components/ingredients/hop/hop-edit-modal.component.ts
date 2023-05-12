import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Hop} from 'models';
import {Observable} from 'rxjs';

@Component({
  selector: 'bt-hop-edit-modal',
  template: `<div class="hop-edit-modal-container"><bt-hop-edit #hopEditComponent></bt-hop-edit></div>`,
  styles: ['.hop-edit-modal-container { width:500px}']
})

export class HopEditModalComponent implements OnInit {

  hop: Hop = new Hop();

  @ViewChild('hopEditComponent') hopEditComponent;

  constructor(public dialogRef: MatDialogRef<HopEditModalComponent>) {
  }

  ngOnInit(): void {
    this.hopEditComponent.hop = this.hop;

    let observable: Observable<Hop> = this.hopEditComponent
      .getHopObservable()
      .subscribe(hop => {
      this.dialogRef.close(hop);
    });
  }

}
