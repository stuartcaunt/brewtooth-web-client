import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {MashControllerService} from 'services';
import {MashControllerHistory} from 'models';
import {MashControllerState} from '../../models/mash-controller-state.model';

@Component({
  selector: 'bt-mash-controller',
  templateUrl: './mash-controller.component.html',
  styleUrls: ['./mash-controller.component.scss'],
  host: {
    class: 'bt-content-element'
  }
})
export class MashControllerComponent {

}


