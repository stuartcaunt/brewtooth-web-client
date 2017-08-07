import {NgModule} from '@angular/core';
import {CdkTableModule} from '@angular/cdk';
import {
  MdButtonModule, MdInputModule, MdTableModule, MdDialogModule, MdSelectModule,
  MdToolbarModule, MdIconModule, MdSidenavModule
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
    MdSidenavModule
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
    MdSidenavModule
  ],
})

export class BrewtoothMaterialModule { }
