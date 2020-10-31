import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AppRoutingModule } from './app.routing';
import { ApplicationPipeModule } from './app.pipes.module';import { ShareComponentModule } from './share.component';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './views/service/token-interceptor.service';
import { ChangePasswordComponent } from './views/change-password/change-password.component';
import { SharedModule } from './share.module';
import { CoreModule } from './containers/core.module';
import { SnackbarComponent } from './views/service/snackbar.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProfileComponent } from './views/profile/profile.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    AppRoutingModule,
    ApplicationPipeModule,
    ShareComponentModule,
    SharedModule,
    CoreModule,
    BrowserModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  entryComponents: [
    SnackbarComponent
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    ChangePasswordComponent,
    RegisterComponent,
    SnackbarComponent,
    ProfileComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },
  MatSnackBar
],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
