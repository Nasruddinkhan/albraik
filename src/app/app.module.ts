import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];



// Import routing module
import { AppRoutingModule } from './app.routing';
import { ApplicationPipeModule } from './app.pipes.module';
import { ColorSketchModule } from 'ngx-color/sketch';
import { ShareComponentModule } from './share.component';

import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './views/service/token-interceptor.service';
import { ChangePasswordComponent } from './views/change-password/change-password.component';
import { SharedModule } from './share.module';
import { CoreModule } from './containers/core.module';
@NgModule({
  imports: [
    AppRoutingModule,
    ApplicationPipeModule,
    ShareComponentModule,
    SharedModule,
    CoreModule,
    BrowserModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    ChangePasswordComponent,
    RegisterComponent  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }
],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
