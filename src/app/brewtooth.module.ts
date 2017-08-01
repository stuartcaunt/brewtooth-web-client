import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { BrewtoothMaterialModule } from './brewtooth-material.module';

import { BrewtoothComponent } from './brewtooth.component';

import { MaltListComponent} from 'components';

import { MaltService } from 'services';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    BrewtoothMaterialModule,
    BrowserAnimationsModule
  ],
  declarations: [
    BrewtoothComponent,
    MaltListComponent
  ],
  providers: [MaltService],
  bootstrap: [BrewtoothComponent]
})

export class BrewtoothModule { }
