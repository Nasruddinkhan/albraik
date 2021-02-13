import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailListComponent } from './mail-list/mail-list.component';
import { SystemMailRoutingModule } from './system-mail-routing.module';
import { SharedModule } from '../../share.module';
import { AddSystemMailDialogComponent } from './mail-list/add-system-mail-dialog/add-system-mail-dialog.component';



@NgModule({
  declarations: [MailListComponent, AddSystemMailDialogComponent],
  imports: [
    CommonModule,
    SystemMailRoutingModule,
    SharedModule
  ],
  entryComponents: [AddSystemMailDialogComponent]
})
export class SystemMailModule { }
