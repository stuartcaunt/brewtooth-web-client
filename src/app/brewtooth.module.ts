import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { BrewtoothMaterialModule } from './brewtooth-material.module';

import { BrewtoothComponent } from './brewtooth.component';

import {
  MaltListComponent,
  MaltEditComponent,
  MaltEditModalComponent
} from 'components';

import { MaltService } from 'services';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrewtoothMaterialModule,
    BrowserAnimationsModule
  ],
  declarations: [
    BrewtoothComponent,
    MaltListComponent,
    MaltEditComponent,
    MaltEditModalComponent
  ],
  providers: [MaltService],
  bootstrap: [BrewtoothComponent],
  entryComponents: [MaltEditModalComponent]
})

export class BrewtoothModule { }
