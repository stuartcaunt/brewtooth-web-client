import {Component, OnInit, ViewChild} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {Yeast} from 'models';
import {Observable} from 'rxjs';

@Component({
  selector: 'bt-yeast-edit-modal',
  template: `<div class="yeast-edit-modal-container"><bt-yeast-edit #yeastEditComponent></bt-yeast-edit></div>`,
  styles: ['.yeast-edit-modal-container { width:500px}']
})

export class YeastEditModalComponent implements OnInit {

  yeast: Yeast = new Yeast();

  @ViewChild('yeastEditComponent') yeastEditComponent;

  constructor(public dialogRef: MdDialogRef<YeastEditModalComponent>) {
  }

  ngOnInit(): void {
    this.yeastEditComponent.yeast = this.yeast;

    let observable: Observable<Yeast> = this.yeastEditComponent
      .getYeastObservable()
      .subscribe(yeast => {
      this.dialogRef.close(yeast);
    });
  }

}
