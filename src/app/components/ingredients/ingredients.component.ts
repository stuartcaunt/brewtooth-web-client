import {Component} from '@angular/core';
import {Router} from '@angular/router';

interface Card {
  title: string;
  description: string;
  route: string;
}

@Component({
  selector: 'bt-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: [ './ingredients.component.css' ]
})
export class IngredientsComponent {
  cards: Card[] = [{
    title: 'Malts',
    description: 'Explore and edit the available malts',
    route: '/malts'
  }, {
    title: 'Hops',
    description: 'Explore and edit the available hops',
    route: null
  }, {
    title: 'Yeasts',
    description: 'Explore and edit the available yeasts',
    route: null
  }, {
    title: 'Other ingredients',
    description: 'Explore and edit other ingredients such as sugars, spices, fruit and clearing agents',
    route: null
  }];

  constructor(private router: Router) {
  }

  navigateTo(card: Card): void {
    if (card.route != null) {
      this.router.navigate([card.route]);
    }
  }

}


