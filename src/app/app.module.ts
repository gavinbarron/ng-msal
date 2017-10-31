import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthService } from 'app/services/auth.service';
import { GraphService } from 'app/services/graph.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,

    HttpClientModule
  ],
  providers: [
      AuthService,
      GraphService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
