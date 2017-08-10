import {Component} from '@angular/core';
import {Router} from '@angular/router';

interface Card {
  title: string;
  description: string;
  route: string;
}

@Component({
  selector: 'bt-overview',
  templateUrl: './overview.component.html',
  styleUrls: [ './overview.component.css' ]
})
export class OverviewComponent {
  cards: Card[] = [{
    title: 'Recipes',
    description: 'Explore, edit and create new recipes',
    route: null
  }, {
    title: 'Mashes',
    description: 'All previous and current brews',
    route: null
  }, {
    title: 'Ingredients',
    description: 'Explore, edit and create ingredients to add to your recipes',
    route: '/ingredients'
  }];

  constructor(private router: Router) {
  }

  navigateTo(card: Card): void {
    if (card.route != null) {
      this.router.navigate([card.route]);
    }
  }

}


