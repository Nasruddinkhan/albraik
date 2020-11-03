import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ContactDetailsComponent } from './contact-form/contact-details.component';
import { AuthGuardService } from '../service/auth-guard.service';
import { ContactFormComponent } from './contact-form/contact-form.component';

const routes: Routes = [
    {
      path: '',
      data: {
        title: 'Contact'
      },
      children: [{
        path: '',
        redirectTo: 'contactdet'
      }, {
        path: 'contactdet',
        data: {
          title: 'Contact'
        },
        component: ContactDetailsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'editcontact/:contactID',
        data: {
          title: 'Edit Contact'
        },
        component: ContactFormComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'addcontact',
        data: {
          title: 'Add Contact'
        },
        component: ContactFormComponent,
        canActivate: [AuthGuardService]
      }]
    }]

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ContactRoutingModule {}
