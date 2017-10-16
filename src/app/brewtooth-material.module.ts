import {NgModule} from '@angular/core';
import {CdkTableModule} from '@angular/cdk';
import {
  MdButtonModule, MdInputModule, MdTableModule, MdDialogModule, MdSelectModule,
  MdToolbarModule, MdIconModule, MdSidenavModule, MdCardModule, MdGridListModule,
  MdSlideToggleModule
} from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
    MdTableModule,
    MdInputModule,
    CdkTableModule,
    MdDialogModule,
    MdSelectModule,
    MdToolbarModule,
    MdIconModule,
    MdSidenavModule,
    MdCardModule, 
    MdGridListModule, 
    MdSlideToggleModule
  ],
  exports: [
    MdButtonModule,
    MdTableModule,
    MdInputModule,
    CdkTableModule,
    MdDialogModule,
    MdSelectModule,
    MdToolbarModule,
    MdIconModule,
    MdSidenavModule,
    MdCardModule, 
    MdGridListModule,
    MdSlideToggleModule
  ],
})

export class BrewtoothMaterialModule { }
