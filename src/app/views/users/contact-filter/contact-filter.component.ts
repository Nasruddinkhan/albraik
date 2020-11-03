import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactType } from '../../modal/contact-type';
import { ContactSearchService } from '../../service/contact.service';

@Component({
  selector: 'app-contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrls: ['./contact-filter.component.css']
})
export class ContactFilterComponent  {
@Input()
contact: any;
}
