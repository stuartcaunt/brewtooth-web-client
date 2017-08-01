import {NgModule} from '@angular/core';
import {CdkTableModule} from '@angular/cdk';
import {MdButtonModule, MdCheckboxModule, MdInputModule, MdTableModule} from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
    MdCheckboxModule,
    MdTableModule,
    MdInputModule,
    CdkTableModule
  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdTableModule,
    MdInputModule,
    CdkTableModule
  ],
})

export class BrewtoothMaterialModule { }
