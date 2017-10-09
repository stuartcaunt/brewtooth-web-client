import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  MaltListComponent,
  HopListComponent,
  YeastListComponent,
  SugarListComponent,
  OtherIngredientListComponent,
  MenuPageComponent,
  MashControllerComponent
} from 'components';

const routes: Routes = [
  { path: '', component: MenuPageComponent },
  { path: 'malts', component: MaltListComponent },
  { path: 'hops', component: HopListComponent },
  { path: 'yeasts', component: YeastListComponent },
  { path: 'sugars', component: SugarListComponent },
  { path: 'otherIngredients', component: OtherIngredientListComponent },
  { path: 'recipes', component: MenuPageComponent },
  { path: 'mashes', component: MenuPageComponent },
  { path: 'ingredients', component: MenuPageComponent },
  { path: 'controller', component: MashControllerComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class BrewtoothRoutingModule {

}
