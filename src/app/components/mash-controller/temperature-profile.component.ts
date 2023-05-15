import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormControl, Validators} from '@angular/forms';

import {MashControllerService} from 'services';
import {MashControllerState, TemperatureProfile, TemperatureLevel} from 'models';

@Component({
  selector: 'bt-temperature-profile',
  templateUrl: './temperature-profile.component.html',
  styleUrls: ['./temperature-profile.component.scss']
})
export class TemperatureProfileComponent implements OnInit {
  get profile(): TemperatureProfile {
    return this._profile;
  }

  get state(): MashControllerState {
    return this._state;
  }

  get temperatureFormControls(): FormControl[] {
    return this._temperatureFormControls;
  }

  get durationFormControls(): FormControl[] {
    return this._durationFormControls;
  }

  private _profile: TemperatureProfile = new TemperatureProfile();
  private _state: MashControllerState;

  private _temperatureFormControls: FormControl[] = new Array<FormControl>();
  private _durationFormControls: FormControl[] = new Array<FormControl>();



  constructor (private mashControllerService: MashControllerService) {
  }

  ngOnInit(): void {
    // Add fist level to profile
    this.addLevel();

    this.mashControllerService.getStateObservable().subscribe(state => {
      this._state = state;

      if (state.running) {
        this._profile = state.temperatureProfile;
      }
    });
  }

  addLevel(): void {
    let level: TemperatureLevel = new TemperatureLevel();
    this._profile.levels.push(level);

    this._temperatureFormControls.push(new FormControl('', [Validators.required, Validators.min(0.0)]));
    this._durationFormControls.push(new FormControl('', [Validators.required, Validators.min(0.0)]));
  }

  deleteLevel(index: number): void {
    this._profile.levels.splice(index, 1);
    this._temperatureFormControls.splice(index, 1);
    this._durationFormControls.splice(index, 1);
  }

  startLevel(): void {
    this.mashControllerService.startTemperatureControlProfileLevel();
  }

  skipLevel(): void {
    this.mashControllerService.skipTemperatureControlProfileLevel();
  }

  startControl(): void {
    let valid: boolean = true;
    for (let temperatureFormControl of this._temperatureFormControls) {
      if (!temperatureFormControl.valid) {
          valid = false;
      }
    }
    for (let durationFormControl of this._durationFormControls) {
      if (!durationFormControl.valid) {
          valid = false;
      }
    }

    if (valid) {
      this.mashControllerService.startControlWithTemperatureProfile(this._profile);
    }
  }

  stopControl(): void {
    this.mashControllerService.stopControl();
  }

  getTemperatureLevelClass(level: TemperatureLevel): string {
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


