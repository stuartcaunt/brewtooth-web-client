import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  MaltListComponent,
  IngredientsComponent
} from 'components';

const routes: Routes = [
  { path: '', redirectTo: '/malts', pathMatch: 'full' },
  { path: 'malts',     component: MaltListComponent },
  { path: 'ingredients',     component: IngredientsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class BrewtoothRoutingModule {

}
