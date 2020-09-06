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

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ApplicationPipeModule } from './app.pipes.module';
import { ColorSketchModule } from 'ngx-color/sketch';
import { ShareComponentModule } from './share.component';
import { CompanyRegisterComponent } from './views/master/component.register.component';
import { JobtitleMasterComponent } from './views/master/jobtitle-master/jobtitle-master.component';
import { CompanyMasterComponent } from './views/master/company-master/company-master.component';
import { DepartmentMasterComponent } from './views/master/department-master/department-master.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './views/service/token-interceptor.service';
import { NgxLoadingModule } from 'ngx-loading';
import { ChangePasswordComponent } from './views/change-password/change-password.component';
@NgModule({
  imports: [
    ShareComponentModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      maxOpened: 1,
      autoDismiss: true
    }),
    NgxLoadingModule,
    ColorSketchModule,
    ApplicationPipeModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    LoginComponent,
    RegisterComponent ,
    CompanyRegisterComponent, JobtitleMasterComponent,DepartmentMasterComponent, CompanyMasterComponent, ChangePasswordComponent ],
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
