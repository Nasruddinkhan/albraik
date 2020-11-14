import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ContactType } from '../../../modal/contact-type';
import { ContactSearchService } from '../../../service/contact.service';
import { DialogSubmissionService } from '../../../service/dialog-submission.service';
import { SnackbarService } from '../../../service/snackbar.service';

@Component({
  selector: 'app-add-contact-dialog',
  templateUrl: './add-contact-dialog.component.html',
  styleUrls: ['./add-contact-dialog.component.css']
})
export class AddContactDialogComponent implements OnInit, OnDestroy {
  createContactForm: FormGroup;
  subscription: Subscription;
  contactType: ContactType[];

  constructor(private fb: FormBuilder,
              private dialogSubmitted: DialogSubmissionService,
              private contactSearch: ContactSearchService,
              private snackService: SnackbarService) { }

  ngOnInit(): void {
    this.dialogSubmitted.setDialogSubmitted(false);
    this.createContactForm = this.fb.group({
      name: ['', Validators.required],
      contactTypeId: ['',Validators.required],
      phoneNumber: ['', [Validators.required,  Validators.minLength(12)]],
      mobileNumber: ['', [Validators.required,  Validators.minLength(12) ]],
      email: ['', [Validators.required, Validators.email]],
      faxNumber: ['', [ Validators.required, Validators.minLength(12),Validators.pattern("^[\u0621-\u064A\u0660-\u0669 ]+$") ]],
      address: [''],
      comment: ['']
    });
    this.subscription = this.contactSearch.getContactTypePages().subscribe((res:ContactType[])=>{
      this.contactType = res;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get name() {
    return this.createContactForm.get('name');
  }

  get contactTypeId() {
    return this.createContactForm.get('contactTypeId');
  }

  get phoneNumber() {
    return this.createContactForm.get('phoneNumber');
  }

  get mobileNumber() {
    return this.createContactForm.get('mobileNumber');
  }

  get email() {
    return this.createContactForm.get('email');
  }

  get faxNumber() {
    return this.createContactForm.get('faxNumber');
  }

  get address() {
    return this.createContactForm.get('address');
  }

  get comment() {
    return this.createContactForm.get('comment');
  }

  onSubmit() {
    this.contactSearch.createContact(JSON.stringify(this.createContactForm.value)).subscribe((resp:any) => {
     this.snackService.success('إضافة المستخدم بنجاح');
     this.dialogSubmitted.setDialogSubmitted(true);
    },err => {
      this.snackService.failure("!!!Something went wrong");
    });
  }

}
