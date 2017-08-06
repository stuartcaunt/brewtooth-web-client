import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MaltListComponent }      from 'components';

const routes: Routes = [
  { path: '', redirectTo: '/malts', pathMatch: 'full' },
  { path: 'malts',     component: MaltListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class BrewtoothRoutingModule {

}
