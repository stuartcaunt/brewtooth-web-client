import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {MashControllerService} from 'services';
import {MashControllerHistory, MashControllerState} from 'models';

@Component({
  selector: 'bt-mash-controller-state',
  templateUrl: './mash-controller-state.component.html',
  styleUrls: ['./mash-controller-state.component.scss']
})
export class MashControllerStateComponent implements OnInit {

  state: MashControllerState;

  constructor (private mashControllerService: MashControllerService) {
  }

  ngOnInit(): void {
    this.mashControllerService.getStateObservable().subscribe(state => {
      this.state = state;
    })
  }
}


