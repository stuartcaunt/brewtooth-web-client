import { Injectable }    from '@angular/core';
import {ActivatedRoute, UrlSegment} from '@angular/router';

import { MenuItem } from 'models';

let menu: MenuItem = {
  title: 'Overview',
  route: '/',
  children: [
    {
      title: 'Recipes',
      route: '/recipes',
      description: 'Explore, edit and create new recipes',
      children: [
        {
          title: 'Latest',
        }, {
          title: 'Popular'
        }, {
          title: 'All'
        }
      ]
    }, {
      title: 'Mashes',
      route: '/mashes',
      description: 'All previous and current brews',
      children: [
        {
          title: 'Current',
          route: '/controller'
        },
        {
          title: 'Latest'
        },
        {
          title: 'All'
        }
      ]
    }, {
      title: 'Ingredients',
      route: '/ingredients',
      description: 'Explore, edit and create ingredients to add to your recipes',
      children: [
        {
          title: 'Malts',
          route: '/malts'
        }, {
          title: 'Hops',
          route: '/hops'
        }, {
          title: 'Yeasts',
          route: '/yeasts'
        }, {
          title: 'Sugars',
          route: '/sugars'
        }, {
          title: 'Other ingredients',
          route: '/otherIngredients'
        }
      ]
    }
  ]
};

@Injectable()
export class MenuService {

  constructor() {
  }

  getMainMenu(): MenuItem {
    return menu;
  }

  getMenuForRoute(route: ActivatedRoute): MenuItem {
    let path = '';
    route.url.forEach((segments: UrlSegment[]) => {
      path = segments.join('/');
    });

    path = '/' + path;
    if (path === '/') {
      return menu;
    }

    for (let child of menu.children || []) {
      if (child.route === path) {
        return child;
      }
    }

    return null;
  }

}
