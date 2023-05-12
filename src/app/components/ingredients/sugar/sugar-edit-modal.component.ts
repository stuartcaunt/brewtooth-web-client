import {Component, OnInit, ViewChild} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {Sugar} from 'models';
import {Observable} from 'rxjs';

@Component({
  selector: 'bt-sugar-edit-modal',
  template: `<div class="sugar-edit-modal-container"><bt-sugar-edit #sugarEditComponent></bt-sugar-edit></div>`,
  styles: ['.sugar-edit-modal-container { width:500px}']
})

export class SugarEditModalComponent implements OnInit {

  sugar: Sugar = new Sugar();

  @ViewChild('sugarEditComponent') sugarEditComponent;

  constructor(public dialogRef: MdDialogRef<SugarEditModalComponent>) {
  }

  ngOnInit(): void {
    this.sugarEditComponent.sugar = this.sugar;

    let observable: Observable<Sugar> = this.sugarEditComponent
      .getSugarObservable()
      .subscribe(sugar => {
      this.dialogRef.close(sugar);
    });
  }

}
