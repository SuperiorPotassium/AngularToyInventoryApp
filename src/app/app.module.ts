import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ToyInMemoryDataService }  from './in-memory-data.toy.service';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { ToyDetailComponent } from './toy-detail/toy-detail.component';

import { ToysComponent }        from './toys/toys.component';

import { ToyService }           from './toy.service';
import { MessageService }       from './message.service';
import { MessagesComponent }    from './messages/messages.component';
import { StrengthPipe } from './strength/strength.pipe';
import { ToyComponent } from './toy/toy.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot
    (
      ToyInMemoryDataService, { dataEncapsulation: false },
    )
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    ToysComponent,
    ToyDetailComponent,

    MessagesComponent,
    StrengthPipe,

    ToyComponent,
  ],
  providers: [ MessageService, ToyService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
