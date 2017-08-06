import { Component } from '@angular/core';

@Component({
  selector: 'brewtooth-root',
  template: `
    <md-toolbar color="primary" class="mat-elevation-z6">
      <h1>{{title}}</h1>
    </md-toolbar>
    <router-outlet></router-outlet>
  `
})


export class BrewtoothComponent {
  title = 'BrewTooth';
}
