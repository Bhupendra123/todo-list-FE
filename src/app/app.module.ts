import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatButtonModule, MatCheckboxModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { EntityComponent } from './components/entity/entity.component';

import { ConfigService } from './services/config.service';
import { ApiService } from './services/api.service';



@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    EntityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [
    ApiService,
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
