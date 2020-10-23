import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Contact } from '../../modal/contact';
import { ContactType } from '../../modal/contact-type';
import { ContactSearchService } from '../../service/contact.service';
import { DialogSubmissionService } from '../../service/dialog-submission.service';
import { ToasterMsgService } from '../../service/toaster-msg.service';
import { AddContactDialogComponent } from './add-contact-dialog/add-contact-dialog.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
    loading = false;
    isSubmitted = false;
    createContactForm:FormGroup;
    role: string;
    pageName : string;
    masterList : ContactType[];
    contactList : Contact[];
    private subscription: Subscription;
    private contactSubscription: Subscription;
    displayedColumns: string[] = ['position', 'name', 'email', 'mobileNo', 'delete'];
    checkedUser = [];
    srNo: number = 0;
    deleteDisabled = true;
    editDisabled = true;
    firstcheckedUser: Event;
    dialogSubscription: Subscription;

    constructor(private contactSearch : ContactSearchService,
               private fb:FormBuilder,
               private dialogSubmitted: DialogSubmissionService,
               private toastService: ToasterMsgService,
               private dialog: MatDialog){}
    ngOnInit() {
      this.role = sessionStorage.getItem("role");
      this.dialogSubscription = this.dialogSubmitted.getDialogSubmitted().subscribe(dialogSubmitted => {
        if (dialogSubmitted) {
          this.onLoads();
        }
      });
      this.createContactForm = this.fb.group({
        name:['',Validators.required],
        contactTypeId:['',Validators.required],
        phoneNumber: ['', [Validators.required,  Validators.minLength(12)]],
        mobileNumber: ['', [Validators.required,  Validators.minLength(12) ]],
        email: ['', [Validators.required, Validators.email]],
        faxNumber: ['', [  Validators.minLength(12),Validators.pattern("^[\u0621-\u064A\u0660-\u0669 ]+$") ]],
        address:[''],
        comment:['']
      });

      this.onLoads();
    }
    get f() { return this.createContactForm.controls; }

    createContact(){
       this.isSubmitted = true;
     if (this.createContactForm.invalid) {
        return;
      }
      this.contactSearch.createContact (JSON.stringify(this.createContactForm.value)).subscribe((resp:any)=>{
        this.loading =   false;
       this.toastService.susessMessage('إضافة المستخدم بنجاح');
       this.onLoads();
      },err=>{
        this.onLoads();
       this.toastService.errorMessage(err.error.message);
      });
    //  this.createContactForm.reset();
     }
    
    onLoads(){
      this.subscription = this.contactSearch.getContactTypePages().subscribe((res:ContactType[])=>{
        this.masterList = res;

      });

      this.contactSubscription = this.contactSearch.getContactList().subscribe((res:Contact[])=>{
        this.contactList = res;
        this.srNo = 0;
        this.contactList.forEach(contact => {
          contact['srNo'] = ++this.srNo;
        });
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
      this.dialogSubscription.unsubscribe();
      console.log('destroy component');
    }

    onCheckboxChange(e, jobId: number) {
      if (e.checked) {
        this.checkedUser.push({ id: jobId, checkbox: e });
      } else {
        for (let i = 0; i < this.checkedUser.length; ++i) {
          if (this.checkedUser[i]['id'] === jobId) {
            this.checkedUser.splice(i, 1);
            break;
          }
        }
      }
      this.handleDeleteButton();
      this.handleEditButton();
      if (this.checkedUser.length === 1) {
        this.firstcheckedUser = this.checkedUser[0]['checkbox'];
      }
    }
  
    handleEditButton() {
      if (this.checkedUser.length === 1) {
        this.editDisabled = false;
      } else {
        this.editDisabled = true;
      }
    }
  
    handleDeleteButton() {
      if (this.checkedUser.length > 0) {
        this.deleteDisabled = false;
      } else {
        this.deleteDisabled = true;
      }
    }

    openAddDialog() {
      this.dialog.open(AddContactDialogComponent);
    }

}
