import {Component, OnInit} from '@angular/core';

import {MenuItem} from 'models';
import {MenuService} from 'services';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'BrewTooth';
  menu: MenuItem;

  constructor(private menuService: MenuService) {
  }

  ngOnInit(): void {
    this.menu = this.menuService.getMainMenu();
  }
}
