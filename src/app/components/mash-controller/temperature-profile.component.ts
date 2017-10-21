import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {FormControl, Validators} from '@angular/forms';

import {MashControllerService} from 'services';
import {MashControllerState, TemperatureProfile, TemperatureLevel} from 'models';

@Component({
  selector: 'bt-temperature-profile',
  templateUrl: './temperature-profile.component.html',
  styleUrls: ['./temperature-profile.component.scss']
})
export class TemperatureProfileComponent implements OnInit {

  private profile: TemperatureProfile = new TemperatureProfile();
  private state: MashControllerState;

  private temperatureFormControls: FormControl[] = new Array<FormControl>();
  private durationFormControls: FormControl[] = new Array<FormControl>();
  

  constructor (private mashControllerService: MashControllerService) {
  }

  ngOnInit(): void {
    // Add fist level to profile
    this.addLevel();

    this.mashControllerService.getStateObservable().subscribe(state => {
      this.state = state;
    })
  }

  addLevel(): void {
    let level: TemperatureLevel = new TemperatureLevel();
    this.profile.levels.push(level);

    this.temperatureFormControls.push(new FormControl('', [Validators.required, Validators.min(0.0)]));
    this.durationFormControls.push(new FormControl('', [Validators.required, Validators.min(0.0)]));
  }

  deleteLevel(index: number): void {
    this.profile.levels.splice(index, 1);
    this.temperatureFormControls.splice(index, 1);
    this.durationFormControls.splice(index, 1);
  }

  startControl(): void {
    let valid: boolean = true;
    for (let temperatureFormControl of this.temperatureFormControls) {
      if (!temperatureFormControl.valid) {
          valid = false;
      }
    }
    for (let durationFormControl of this.durationFormControls) {
      if (!durationFormControl.valid) {
          valid = false;
      }
    }

    if (valid) {
      this.mashControllerService.startControlWithTemperatureProfile(this.profile);
    }
  }

  stopControl(): void {
    this.mashControllerService.stopControl();
  }

  getTemperatureLevelClass(level: TemperatureLevel): string {
    console.log("called");
    var state = level.state;
    if (state == 'Inactive') {
      return 'temperature-level-inactive';

    } else if (state == 'Active') {
      return 'temperature-level-active';

    } else if (state == 'Pending') {
      return 'temperature-level-pending';

    } else if (state == 'Terminated') {
      return 'temperature-level-terminated';

    } else {
      return '';
    }
  }
}


