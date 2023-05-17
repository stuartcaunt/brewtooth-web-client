import {Component, OnInit} from '@angular/core';
import {filter, Observable} from 'rxjs';
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
  private _state: MashControllerState = new MashControllerState();

  private _temperatureFormControls: FormControl[] = new Array<FormControl>();
  private _durationFormControls: FormControl[] = new Array<FormControl>();



  constructor (private mashControllerService: MashControllerService) {
  }

  ngOnInit(): void {
    // Add fist level to profile
    this.addLevel();

    this.mashControllerService.state$.pipe(
        filter(state => state != null)
      ).subscribe(state => {
        this._state = state;


        if (state.running) {
          this._profile = state.temperatureProfile;

        } else if (state.temperatureProfile) {
          while (this._profile.levels.length < state.temperatureProfile.levels.length) {
            this.addLevel();
          }

          for (let i = 0; i < state.temperatureProfile.levels.length; i++) {
            const deviceLevel = state.temperatureProfile.levels[i];
            const level = this._profile.levels[i];
            const temperatureFormControl = this._temperatureFormControls[i];
            const durationFormControl = this._durationFormControls[i];

            level.name = deviceLevel.name;
            level.setpointC = deviceLevel.setpointC;
            level.durationS = deviceLevel.durationS;
            temperatureFormControl.setValue(level.setpointC);
            durationFormControl.setValue(level.durationS);
          }

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
    for (let i = 0; i < this._temperatureFormControls.length; i++) {
      const temperatureFormControl = this._temperatureFormControls[i];
      if (!temperatureFormControl.valid) {
          valid = false;
      } else {
        const profileLevel = this._profile.levels[i];
        profileLevel.setpointC = temperatureFormControl.value;
      }
    }

    for (let i = 0; i < this._durationFormControls.length; i++) {
      const durationFormControl = this._durationFormControls[i];
      if (!durationFormControl.valid) {
          valid = false;
      } else {
        const profileLevel = this._profile.levels[i];
        profileLevel.durationS = durationFormControl.value;
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


