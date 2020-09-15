import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Contact } from '../../modal/contact';
import { ContactType } from '../../modal/contact-type';
import { ContactSearchService } from '../../service/contact.service';
import { ToasterMsgService } from '../../service/toaster-msg.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

    createContactForm:FormGroup;
    role: string;
    pageName : string;
    masterList : ContactType[];
    contactList : Contact[];
    private subscription: Subscription;
    private contactSubscription: Subscription;
    constructor(private contactSearch : ContactSearchService, private fb:FormBuilder, private toastService: ToasterMsgService){}
    ngOnInit() {
      this.role = sessionStorage.getItem("role");

      this.createContactForm = this.fb.group({
        name:['',Validators.required],
        ContactTypeID:['',Validators.required],
        phoneNumber: ['', [Validators.required,  Validators.minLength(12),Validators.pattern("^[\u0621-\u064A\u0660-\u0669 ]+$") ]],
        mobileNumber: ['', [Validators.required,  Validators.minLength(12),Validators.pattern("^[\u0621-\u064A\u0660-\u0669 ]+$") ]],
        email: ['', [Validators.required, Validators.email]],
        faxNumber: ['', [Validators.required,  Validators.minLength(12),Validators.pattern("^[\u0621-\u064A\u0660-\u0669 ]+$") ]],
        address:['',Validators.required],
        comment:['',Validators.required]
      },
       {
        // validator: MustMatch('password', 'confpassword')
    });

      this.onLoads();
    }

    createContact(){
      // this.isSubmitted = true;
     if (this.createContactForm.invalid) {
        return;
      }
      // this.loading =   true;
      this.contactSearch.createContact (JSON.stringify(this.createContactForm.value)).subscribe((resp:any)=>{
      //  this.loading =   false;
       this.toastService.susessMessage('إضافة المستخدم بنجاح');
      //  this.router.navigate(["/register"]);
      },err=>{
      //  this.loading =   false;
       this.toastService.errorMessage(err.error.message);
      });
      this.createContactForm.reset();
      //this.registerForm.markAsPristine();
     // this.registerForm.markAsUntouched();
     }
    
    onLoads(){
      this.subscription = this.contactSearch.getContactTypePages().subscribe((res:ContactType[])=>{
        this.masterList = res;
      });

      this.contactSubscription = this.contactSearch.getContactList().subscribe((res:Contact[])=>{
        this.contactList = res;
      });

    }

    changed(e: string){
      console.log(e);
      this.pageName = e;
    }

    ngOnDestroy(){
      this.masterList=[];
      this.contactList=[];
      this.subscription.unsubscribe();
      console.log('destroy component');
    }

}
