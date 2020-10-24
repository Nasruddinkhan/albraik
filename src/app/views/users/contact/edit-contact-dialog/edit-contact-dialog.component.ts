import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Contact } from '../../../modal/contact';
import { ContactType } from '../../../modal/contact-type';
import { ContactSearchService } from '../../../service/contact.service';
import { DialogSubmissionService } from '../../../service/dialog-submission.service';
import { SnackbarService } from '../../../service/snackbar.service';

@Component({
  selector: 'app-edit-contact-dialog',
  templateUrl: './edit-contact-dialog.component.html',
  styleUrls: ['./edit-contact-dialog.component.css']
})
export class EditContactDialogComponent implements OnInit {
  oldContact: Contact;
  updateContactForm: FormGroup;
  subscription: Subscription;
  dialogSubscription: Subscription;
  contactType: ContactType[];

  constructor(private fb: FormBuilder,
              private dialogSubmitted: DialogSubmissionService,
              private contactSearch: ContactSearchService,
              private snackService: SnackbarService) { }

  ngOnInit(): void {
    this.dialogSubmitted.setDialogSubmitted(false);
    this.dialogSubscription = this.dialogSubmitted.getData().subscribe((oldContact: Contact) => {
      this.oldContact = oldContact;
    });
    this.updateContactForm = this.fb.group({
      name: [this.oldContact.name, Validators.required],
      contactTypeId: [this.oldContact.contact_type_id, Validators.required],
      phoneNumber: [this.oldContact.phone_number, [Validators.required,  Validators.minLength(12)]],
      mobileNumber: [this.oldContact.mobile_number, [Validators.required,  Validators.minLength(12) ]],
      email: [this.oldContact.email, [Validators.required, Validators.email]],
      faxNumber: [this.oldContact.fax_number, [ Validators.required, Validators.minLength(12),Validators.pattern("^[\u0621-\u064A\u0660-\u0669 ]+$") ]],
      address: [this.oldContact.address ? this.oldContact.address : ''],
      comment: [this.oldContact.comment ? this.oldContact.comment : '']
    });
    this.subscription = this.contactSearch.getContactTypePages().subscribe((res:ContactType[])=>{
      this.contactType = res;
    });
    console.log(this.contactType);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.dialogSubscription.unsubscribe();
  }

  get name() {
    return this.updateContactForm.get('name');
  }

  get contactTypeId() {
    return this.updateContactForm.get('contactTypeId');
  }

  get phoneNumber() {
    return this.updateContactForm.get('phoneNumber');
  }

  get mobileNumber() {
    return this.updateContactForm.get('mobileNumber');
  }

  get email() {
    return this.updateContactForm.get('email');
  }

  get faxNumber() {
    return this.updateContactForm.get('faxNumber');
  }

  get address() {
    return this.updateContactForm.get('address');
  }

  get comment() {
    return this.updateContactForm.get('comment');
  }

  onSubmit() {
    let changedObj = {};
    let prop = Object.keys(this.oldContact);
    prop.forEach(p => {
      if (this.updateContactForm.get(p)) {
        if (this.oldContact[p] !== this.updateContactForm.get(p).value) {
          changedObj[p] = this.updateContactForm.get(p).value;
        }
      }
    });
    this.contactSearch.updateContact(this.oldContact.id, changedObj).subscribe((resp:any) => {
    this.snackService.success('.Contact updated successfully');
    this.dialogSubmitted.setDialogSubmitted(true);
    },err => {
      this.snackService.failure("!!!Something went wrong");
    });
  }

}
