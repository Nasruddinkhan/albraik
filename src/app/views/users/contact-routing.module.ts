import { ContactComponent } from './contact/contact.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
      path: '',
      component: ContactComponent,
      data: {
        title: 'Contact'
      }
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ContactRoutingModule {}
  
    