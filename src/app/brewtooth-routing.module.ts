import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  MaltListComponent,
  MenuPageComponent
} from 'components';

const routes: Routes = [
  { path: '', component: MenuPageComponent },
  { path: 'malts', component: MaltListComponent },
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
