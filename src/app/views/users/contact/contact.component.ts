import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PrivilegeList } from '../../../privilegeList';
import { Contact } from '../../modal/contact';
import { ContactType } from '../../modal/contact-type';
import { ContactSearchService } from '../../service/contact.service';
import { DialogSubmissionService } from '../../service/dialog-submission.service';
import { SnackbarService } from '../../service/snackbar.service';
import { ToasterMsgService } from '../../service/toaster-msg.service';
import { AddContactDialogComponent } from './add-contact-dialog/add-contact-dialog.component';
import { EditContactDialogComponent } from './edit-contact-dialog/edit-contact-dialog.component';
import { SearchContactDialogComponent } from './search-contact-dialog/search-contact-dialog.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {
    loading = false;
    isSubmitted = false;
    role: string;
    pageName : string;
    masterList : ContactType[];
    contactList : Contact[];
    filteredContactList: Contact[];
    contactTypeList: ContactType[] = [];
    private subscription: Subscription;
    private contactSubscription: Subscription;
    displayedColumns: string[] = ['position', 'name', 'contactTypeName', 'email', 'mobileNo', 'delete'];
    checkedContact = [];
    srNo: number = 0;
    deleteDisabled = true;
    editDisabled = true;
    addDisabled = false;
    contactFiltered = false;
    noRecordsFound = false;
    addUnauthorized = false;
    editUnauthorized = false;
    deleteUnauthorized = false;
    firstcheckedContact: Event;
    dialogSubscription: Subscription;
    searchSubscription: Subscription;

    constructor(private contactSearch : ContactSearchService,
               private dialogSubmitted: DialogSubmissionService,
               private snackService: SnackbarService,
               private dialog: MatDialog){}
    ngOnInit() {
      if (sessionStorage.getItem('privilegeList') !== null) {
        let userPrivileges = JSON.parse(sessionStorage.getItem('privilegeList'));
        if (!userPrivileges.includes(PrivilegeList.ADD_NEW_CONTACTS)) {
          this.addUnauthorized = true;
          this.addDisabled = true;
        }
        if (!userPrivileges.includes(PrivilegeList.EDIT_OR_DISABLE_CONTACTS)) {
          this.editUnauthorized = true;
          this.deleteUnauthorized = true;
          this.editDisabled = true;
          this.deleteDisabled = true;
        }
      }
      this.role = sessionStorage.getItem("role");
      this.dialogSubscription = this.dialogSubmitted.getDialogSubmitted().subscribe(dialogSubmitted => {
        if (dialogSubmitted) {
          this.onLoads();
          this.contactFiltered = false;
          this.checkedContact = [];
          this.handleEditButton();
          this.handleDeleteButton();
          this.handleAddButton();
        }
      });
      this.onLoads();
      this.searchSubscription = this.dialogSubmitted.getData().subscribe(formValue => {
        if (formValue) {
          this.search(formValue['searchName'], formValue['contactTypeId']);
        }
      });
    }
    
    onLoads(){
      this.loading = true;
      this.subscription = this.contactSearch.getContactTypePages().subscribe((res:ContactType[])=>{
        this.masterList = res;
      });
      this.contactSearch.getContactTypeList().subscribe((res: ContactType[]) => {
        this.contactTypeList = res;
      });
      this.contactSubscription = this.contactSearch.getContactList().subscribe((res:Contact[])=>{
        this.contactList = res;
        this.assignSrNumberAndType(this.contactList);
        this.loading = false;
      });
    }

    changed(e: string){
      // console.log(e);
      this.pageName = e;
    }

    ngOnDestroy(){
      this.masterList=[];
      this.contactList=[];
      this.subscription.unsubscribe();
      this.dialogSubscription.unsubscribe();
      this.searchSubscription.unsubscribe();
      // console.log('destroy component');
    }

    onCheckboxChange(e, contactId: number) {
      if (e.checked) {
        this.checkedContact.push({ id: contactId, checkbox: e });
      } else {
        for (let i = 0; i < this.checkedContact.length; ++i) {
          if (this.checkedContact[i]['id'] === contactId) {
            this.checkedContact.splice(i, 1);
            break;
          }
        }
      }
      this.handleDeleteButton();
      this.handleEditButton();
      this.handleAddButton();
      if (this.checkedContact.length === 1) {
        this.firstcheckedContact = this.checkedContact[0]['checkbox'];
      }
    }
  
    handleEditButton() {
      if (!this.editUnauthorized) {
        if (this.checkedContact.length === 1) {
          this.editDisabled = false;
        } else {
          this.editDisabled = true;
        }
      }
    }
  
    handleDeleteButton() {
      if (!this.deleteUnauthorized) {
        if (this.checkedContact.length > 0) {
          this.deleteDisabled = false;
        } else {
          this.deleteDisabled = true;
        }
      }
    }

    handleAddButton() {
      if (!this.addUnauthorized) {
        if (this.checkedContact.length === 0) {
          this.addDisabled = false;
        } else {
          this.addDisabled = true;
        }
      }
    }

    deleteContact() {
      let checkedContactsString = this.checkedContact.map(checkedCont => {
        return checkedCont['id'].toString();
      });
      this.contactSearch.deleteContact(checkedContactsString).subscribe(res => {
        this.onLoads();
        this.snackService.success("." + this.checkedContact.length + "contact(s) deleted successfully");
        this.checkedContact = [];
        this.handleDeleteButton();
        this.handleEditButton();
        this.handleAddButton();
      }, err=> {
        this.snackService.failure("!!!Something went wrong.");
      });
    }

    openAddDialog() {
      this.dialog.open(AddContactDialogComponent);
    }

    openEditDialog() {
      let oldContact: Contact;
      for (let i = 0; i < this.contactList.length; ++i) {
        if (this.contactList[i]['id'] === this.checkedContact[0]['id']) {
          oldContact = this.contactList[i];
        }
      }
      this.filteredContactList = this.contactList;
      this.contactFiltered = true;
      this.dialogSubmitted.setData(oldContact);
      this.handleDeleteButton();
      this.handleEditButton();
      this.handleAddButton();
      this.dialog.open(EditContactDialogComponent);
    }

    openSearchDialog() {
      this.dialog.open(SearchContactDialogComponent);
    }

    search(name?: string, contactTypeId?: number) {
      if (contactTypeId) {
        this.contactSearch.getContactType(contactTypeId).subscribe(contactTypeListById => {
          this.filteredContactList = contactTypeListById;
          if (name) {
            this.filteredContactList = this.filteredContactList.filter(contact => {
              return contact.name === name;
            });
          }
          this.handleNoRecords();
          this.assignSrNumberAndType(this.filteredContactList);
        });
      } else if (name) {
        this.contactSearch.getContactList().subscribe((contactList: Contact[]) => {
          this.filteredContactList = contactList.filter(contact => {
            return contact.name === name;
          });
          this.handleNoRecords();
          this.assignSrNumberAndType(this.filteredContactList);
        });
      }
      this.contactFiltered = true;
    }

    assignSrNumberAndType(contactList: Contact[]) {
      if (contactList) {
        this.srNo = 0;
        contactList.forEach(contact => {
          contact['srNo'] = ++this.srNo;
          for (let i = 0; i < this.contactTypeList.length; ++i) {
            if (this.contactTypeList[i].id === contact.contact_type_id) {
              contact.contactTypeName = this.contactTypeList[i].name;
              break;
            }
          }
        });
      }
    }

    handleNoRecords() {
      if (this.filteredContactList && this.filteredContactList.length !== 0) {
        this.noRecordsFound = false;
      } else {
        this.noRecordsFound = true;
      }
    }
    
    refreshTable() {
      this.loading = true;
      this.contactSubscription = this.contactSearch.getContactList().subscribe((res:Contact[])=>{
        this.contactList = res;
        this.assignSrNumberAndType(this.contactList);
        this.loading = false;
      });
      this.checkedContact = [];
      this.handleAddButton();
      this.handleEditButton();
      this.handleDeleteButton();
      this.contactFiltered = false;
      this.noRecordsFound = false;
    }

}
