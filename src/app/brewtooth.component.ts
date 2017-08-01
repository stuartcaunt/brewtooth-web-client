import { Component } from '@angular/core';

@Component({
  selector: 'brewtooth-root',
  template: `
    <h1>{{title}}</h1>
    <bt-malt-list></bt-malt-list>
  `
})


export class BrewtoothComponent {
  title = 'BrewTooth';
}
