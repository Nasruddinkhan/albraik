import { NgModule } from '@angular/core';
import { SharedModule } from '../share.module';
import { AppRoutingModule } from '../app.routing';
import { DefaultLayoutComponent } from './default-layout';
import {
    AppAsideModule,
    AppBreadcrumbModule,
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule,
  } from '@coreui/angular';
import { ShareComponentModule } from '../share.component';
import { ApplicationPipeModule } from '../app.pipes.module';
import { ColorSketchModule } from 'ngx-color/sketch';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AdminRegistrationService } from '../views/service/admin-registration.service';
import { AuthGuardService } from '../views/service/auth-guard.service';
import { CompanyRegistrationService } from '../views/service/company-registration.service';
import { LoginService } from '../views/service/login.service';
import { ToasterMsgService } from '../views/service/toaster-msg.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

  const APP_CONTAINERS = [
    DefaultLayoutComponent
  ];
@NgModule({
  declarations: [
    ...APP_CONTAINERS
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    ApplicationPipeModule,
    ShareComponentModule,
    ColorSketchModule,
    AppAsideModule,
    AppBreadcrumbModule,
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule,
    TabsModule.forRoot(),
    BrowserModule, BrowserAnimationsModule,HttpClientModule
  ],
  exports: [
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule,
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule,
    ColorSketchModule,
    TabsModule
  ],
  providers: [
    AdminRegistrationService,  AuthGuardService, CompanyRegistrationService, LoginService, ToasterMsgService
  ]
})
export class CoreModule {}
