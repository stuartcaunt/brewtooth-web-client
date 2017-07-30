import { Component } from '@angular/core';
import { Malt } from 'models';

@Component({
  selector: 'bt-malt-list',
  templateUrl: './malt-list.component.html',
  styleUrls: [ './malt-list.component.css' ]
})

export class MaltListComponent {
  malts: Malt[];

}
