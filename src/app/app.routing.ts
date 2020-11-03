import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthGuardService } from './views/service/auth-guard.service';
import { ChangePasswordComponent } from './views/change-password/change-password.component';
import { ProfileComponent } from './views/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: 'changepassword/:userID',
    data: {
      title: 'change Password'
    },
    component: ChangePasswordComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'logout',
    component: LoginComponent,
    data: {
      title: 'Logout Sucess'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'profile/:userID',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'User Profile'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'master',
        loadChildren: () => import('./views/master/master.module').then(u => u.MasterModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'contact',
        loadChildren: () => import('./views/users/contact.module').then(u => u.ContactModule),
        canActivate: [AuthGuardService]
      },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
