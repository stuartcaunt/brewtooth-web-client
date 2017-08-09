import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  MaltListComponent,
  AppComponent,
  IngredientsComponent
} from 'components';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'malts', component: MaltListComponent },
  { path: 'ingredients', component: IngredientsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class BrewtoothRoutingModule {

}
