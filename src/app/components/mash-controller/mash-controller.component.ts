import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {MashControllerService} from 'services';
import {MashControllerHistory} from 'models';
import {MashControllerState} from '../../models/mash-controller-state.model';

@Component({
  selector: 'bt-mash-controller',
  templateUrl: './mash-controller.component.html',
  styleUrls: ['./mash-controller.component.scss']
})
export class MashControllerComponent implements OnInit {

  history: MashControllerHistory[];
  state: MashControllerState;

  constructor (private mashControllerService: MashControllerService) {
  }

  ngOnInit(): void {
    this.mashControllerService.getHistory().subscribe(history => {
      this.history = history;
    });

    this.mashControllerService.getStateObservable().subscribe(state => {
      this.state = state;
    })
  }

}


