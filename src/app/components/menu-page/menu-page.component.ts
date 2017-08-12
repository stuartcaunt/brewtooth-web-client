import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuService} from 'services';
import {MenuItem} from 'models';

@Component({
  selector: 'bt-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: [ './menu-page.component.scss' ]
})
export class MenuPageComponent implements OnInit {
  menu: MenuItem;

  constructor(private router: Router, private route: ActivatedRoute, private menuService: MenuService) {
  }

  ngOnInit(): void {
    this.menu = this.menuService.getMenuForRoute(this.route);
  }

  navigateTo(menuItem: MenuItem): void {
    if (menuItem.route != null) {
      this.router.navigate([menuItem.route]);
    }
  }

}


