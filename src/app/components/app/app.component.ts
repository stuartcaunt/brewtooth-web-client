import { Component } from '@angular/core';

interface MenuItem {
  title: string;
  route: string;
}

interface MenuGroup extends MenuItem {
  menuItems: MenuItem[];
}


let menu: MenuGroup[] = [
  {
    title: 'Recipes',
    menuItems: [
      {
        title: 'Latest',
        route: null
      },
      {
        title: 'Popular',
        route: null
      },
      {
        title: 'All',
        route: null
      }
    ],
    route: null
  },
  {
    title: 'Mashes',
    menuItems: [
      {
        title: 'Latest',
        route: null
      },
      {
        title: 'All',
        route: null
      }
    ],
    route: null
  },
  {
    title: 'Ingredients',
    route: '/ingredients',
    menuItems: [
      {
        title: 'Malts',
        route: '/malts'
      },
      {
        title: 'Hops',
        route: null
      },
      {
        title: 'Yeasts',
        route: null
      },
      {
        title: 'Other ingredients',
        route: null
      }
    ]
  }
];

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'BrewTooth';
  menu = menu;
}
