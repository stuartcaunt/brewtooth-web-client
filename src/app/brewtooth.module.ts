import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';

import { BrewtoothMaterialModule } from './brewtooth-material.module';

import { BrewtoothRoutingModule } from './brewtooth-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgChartsModule } from 'ng2-charts';

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
  TemperatureProfileComponent,
  MashControlGraphComponent,
  YesNoDialogComponent
} from 'components';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  HopService,
  MaltService,
  MashControllerService,
  MenuService,
  OtherIngredientService,
  SugarService,
  YeastService
} from "services";

@NgModule({
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
    TemperatureProfileComponent,
    MashControlGraphComponent,
    YesNoDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
    BrewtoothRoutingModule,
    BrowserAnimationsModule,
    BrewtoothMaterialModule,
  ],
  providers: [
    MaltService,
    HopService,
    YeastService,
    SugarService,
    OtherIngredientService,
    MenuService,
    MashControllerService,
  ],
  bootstrap: [AppComponent]
})
export class BrewtoothModule { }
