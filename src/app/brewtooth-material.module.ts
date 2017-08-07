import {NgModule} from '@angular/core';
import {CdkTableModule} from '@angular/cdk';
import {
  MdButtonModule, MdInputModule, MdTableModule, MdDialogModule, MdSelectModule,
  MdToolbarModule, MdIconModule
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
    MdIconModule
  ],
  exports: [
    MdButtonModule,
    MdTableModule,
    MdInputModule,
    CdkTableModule,
    MdDialogModule,
    MdSelectModule,
    MdToolbarModule,
    MdIconModule
  ],
})

export class BrewtoothMaterialModule { }
