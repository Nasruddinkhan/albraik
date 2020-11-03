import { Component, Input,Output, EventEmitter, TemplateRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ContactSearchService } from '../../service/contact.service';




@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  @Input('contact')
  contactList: any;
  contact:any;
  modalRef: BsModalRef;
  @Output() someEvent = new EventEmitter<any>();
  constructor(private contactService: ContactSearchService,
          private modalService: BsModalService){}
  onCheckboxChange(e){
    this.someEvent.emit(e);
  }
 async openModal(template: TemplateRef<any>, contactId:number) {
   await  this.contactService.getViewContact(contactId).then((res: any)=>{
      console.log(res);
      this.contact = res;
    });
    this.modalRef = this.modalService.show(template);
  }
}
