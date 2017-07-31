import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';

import { MaltListComponent} from 'components';

import { MaltService } from 'services';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    MaltListComponent
  ],
  providers: [MaltService],
  bootstrap: [AppComponent]
})

export class AppModule { }
