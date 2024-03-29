import {NgModule} from '@angular/core';
import {CdkTableModule} from '@angular/cdk/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@NgModule({
  imports: [
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    CdkTableModule,
  ],
  exports: [
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    CdkTableModule,
  ],
})

export class BrewtoothMaterialModule { }
