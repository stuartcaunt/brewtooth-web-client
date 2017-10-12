import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { BrewtoothMaterialModule } from './brewtooth-material.module';
import { BrewtoothRoutingModule } from './brewtooth-routing.module';

import {
  AppComponent,
  MenuPageComponent,
  MaltListComponent,
  MaltEditComponent,
  MaltEditModalComponent,
  HopListComponent,
  HopEditComponent,
  HopEditModalComponent,
  YeastListComponent,
  YeastEditComponent,
  YeastEditModalComponent,
  SugarListComponent,
  SugarEditComponent,
  SugarEditModalComponent,
  OtherIngredientListComponent,
  OtherIngredientEditComponent,
  OtherIngredientEditModalComponent,
  MashControllerComponent,
  MashControllerStateComponent,
  YesNoDialogComponent
} from 'components';

import {
  MaltService,
  HopService,
  YeastService,
  SugarService,
  OtherIngredientService,
  MenuService,
  MashControllerService
} from 'services';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrewtoothMaterialModule,
    BrewtoothRoutingModule
  ],
  declarations: [
    AppComponent,
    MenuPageComponent,
    MaltListComponent,
    MaltEditComponent,
    MaltEditModalComponent,
    HopListComponent,
    HopEditComponent,
    HopEditModalComponent,
    YeastListComponent,
    YeastEditComponent,
    YeastEditModalComponent,
    SugarListComponent,
    SugarEditComponent,
    SugarEditModalComponent,
    OtherIngredientListComponent,
    OtherIngredientEditComponent,
    OtherIngredientEditModalComponent,
    MashControllerComponent,
    MashControllerStateComponent,
    YesNoDialogComponent
  ],
  providers: [
    MaltService,
    HopService,
    YeastService,
    SugarService,
    OtherIngredientService,
    MenuService,
    MashControllerService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    MaltEditModalComponent,
    HopEditModalComponent,
    YeastEditModalComponent,
    SugarEditModalComponent,
    OtherIngredientEditModalComponent,
    YesNoDialogComponent
  ]
})

export class BrewtoothModule { }
