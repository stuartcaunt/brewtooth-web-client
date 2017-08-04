import {NgModule} from '@angular/core';
import {CdkTableModule} from '@angular/cdk';
import {MdButtonModule, MdCheckboxModule, MdInputModule, MdTableModule, MdDialogModule} from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
    MdCheckboxModule,
    MdTableModule,
    MdInputModule,
    CdkTableModule,
    MdDialogModule
  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdTableModule,
    MdInputModule,
    CdkTableModule,
    MdDialogModule
  ],
})

export class BrewtoothMaterialModule { }
