import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact/contact.component';
import { SharedModule } from '../../share.module';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactDetailsComponent } from './contact-form/contact-details.component';
import { ContactFilterComponent } from './contact-filter/contact-filter.component';


@NgModule({
  declarations: [ ContactComponent, ContactFormComponent, ContactDetailsComponent, ContactFilterComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    SharedModule
  ]
})
export class ContactModule { }
