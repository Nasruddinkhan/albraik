import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from '../../modal/contact';
import { ContactType } from '../../modal/contact-type';
import { ContactSearchService } from '../../service/contact.service';
import { ToasterMsgService } from '../../service/toaster-msg.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  loading = false;
  isSubmitted = false;
  createContactForm: FormGroup;
  action = 'Add Contact';
  private subscription: Subscription;
  masterList: ContactType[];
  role: string;
  isUpdate:boolean = false;
  constructor(private contactSearch: ContactSearchService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToasterMsgService) { }

  ngOnInit(): void {
    this.role = sessionStorage.getItem('role');
    this.createContactForm = this.fb.group({
      id: [],
      name: ['',Validators.required],
      contactTypeId:['',Validators.required],
      phoneNumber: ['', [Validators.required,  Validators.minLength(12)]],
      mobileNumber: ['', [Validators.required,  Validators.minLength(12) ]],
      email: ['', [Validators.required, Validators.email]],
      faxNumber: ['', [  ]],
      address:[''],
      comment:['']
    });
    this.getContactType();
    this.activeRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('contactID')) {
        return;
      }
      this.isUpdate = true;
     const contactID = parseInt(paramMap.get('contactID')) ;
     this.editContactDetails(contactID);
    });

  }
  editContactDetails(contactID: number){
    this.contactSearch.getContact(contactID).subscribe((res: Contact)=>{
      this.action = 'Edit contact';
      console.log(res);
      this.createContactForm.setValue({
        id: res.id,
        name: res.name,
        contactTypeId: res.contact_type_id,
        phoneNumber: res.phone_number,
        mobileNumber: res.mobile_number,
        email: res.email,
        faxNumber: res.fax_number,
        address: res.address,
        comment: res.comment
      });
    },err=>{
      this.toastService.errorMessage(err.error.message);
    })
  }
  get f() { return this.createContactForm.controls; }

  updateContact(){
    this.isSubmitted = true;
    if (this.createContactForm.invalid) {
       return;
     }
     let id = this.createContactForm.get('id').value;
     //alert(id);
      this.contactSearch.updateContact (JSON.stringify(this.createContactForm.value), id).subscribe((resp:any)=>{
        this.loading =   false;
       this.toastService.susessMessage('update contact successfully');
       this.router.navigate(['/contact/contactdet']);
       this.getContactType();
      },err=>{
        this.getContactType();
       this.toastService.errorMessage(err.error.message);
      });
  }
  createContact(){
    this.isSubmitted = true;
  if (this.createContactForm.invalid) {
     return;
   }

    this.contactSearch.createContact (JSON.stringify(this.createContactForm.value)).subscribe((resp:any)=>{
      this.loading =   false;
     this.toastService.susessMessage('إضافة المستخدم بنجاح');
     this.router.navigate(['/contact/contactdet']);
     this.getContactType();
    },err=>{
      this.getContactType();
     this.toastService.errorMessage(err.error.message);
    });
  }
  getContactType(){
    this.subscription = this.contactSearch.getContactTypePages().subscribe((res: ContactType[])=>{
      this.masterList = res;
    });
  }
}
