import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './_interceptor/auth.interceptor';
import { LoginGuard, UserGuard } from './_guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [{
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi   : true,
  },
  UserGuard,
  LoginGuard
],
  bootstrap: [AppComponent]
})
export class AppModule { }
