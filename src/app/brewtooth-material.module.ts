import {NgModule} from '@angular/core';
import {CdkTableModule} from '@angular/cdk';
import {
  MdButtonModule, MdCheckboxModule, MdInputModule, MdTableModule, MdDialogModule, MdSelectModule
} from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
    MdCheckboxModule,
    MdTableModule,
    MdInputModule,
    CdkTableModule,
    MdDialogModule,
    MdSelectModule
  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdTableModule,
    MdInputModule,
    CdkTableModule,
    MdDialogModule,
    MdSelectModule
  ],
})

export class BrewtoothMaterialModule { }
