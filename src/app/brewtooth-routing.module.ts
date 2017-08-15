import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  MaltListComponent,
  HopListComponent,
  YeastListComponent,
  SugarListComponent,
  MenuPageComponent
} from 'components';

const routes: Routes = [
  { path: '', component: MenuPageComponent },
  { path: 'malts', component: MaltListComponent },
  { path: 'hops', component: HopListComponent },
  { path: 'yeasts', component: YeastListComponent },
  { path: 'sugars', component: SugarListComponent },
  { path: 'recipes', component: MenuPageComponent },
  { path: 'mashes', component: MenuPageComponent },
  { path: 'ingredients', component: MenuPageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class BrewtoothRoutingModule {

}
