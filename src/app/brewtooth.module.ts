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
  MaltListComponent,
  MaltEditComponent,
  MaltEditModalComponent,
  YesNoDialogComponent,
  IngredientsComponent
} from 'components';

import { MaltService } from 'services';

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
    MaltListComponent,
    MaltEditComponent,
    MaltEditModalComponent,
    YesNoDialogComponent,
    IngredientsComponent
  ],
  providers: [MaltService],
  bootstrap: [AppComponent],
  entryComponents: [MaltEditModalComponent, YesNoDialogComponent]
})

export class BrewtoothModule { }
