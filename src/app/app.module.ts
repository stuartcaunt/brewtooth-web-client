import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { MaltListComponent} from 'components';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent,
    MaltListComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
