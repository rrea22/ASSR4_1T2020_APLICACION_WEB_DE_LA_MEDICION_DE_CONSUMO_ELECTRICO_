import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import {HttpClientModule  } from '@angular/common/http';
import { PerfilComponent } from './perfil/perfil.component';
import { MedidoresComponent } from './medidores/medidores.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    PerfilComponent,
    MedidoresComponent,
    LoginComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
