import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MailListComponent } from './mail-list/mail-list.component';

const routes = [
  {
    path: 'list',
    component: MailListComponent,
    data: {
      title: 'mail-list'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemMailRoutingModule { }
