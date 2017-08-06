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
  MaltEditModalComponent,
  YesNoDialogComponent
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
    MaltEditModalComponent,
    YesNoDialogComponent
  ],
  providers: [MaltService],
  bootstrap: [BrewtoothComponent],
  entryComponents: [MaltEditModalComponent, YesNoDialogComponent]
})

export class BrewtoothModule { }
