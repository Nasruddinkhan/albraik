import {  Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ContactType } from '../../modal/contact-type';
import { ContactSearchService } from '../../service/contact.service';
import { checkNullEmpty } from '../../service/must-match.service';
import { ToasterMsgService } from '../../service/toaster-msg.service';

@Component({
    selector: 'app-contact-details',
    templateUrl: './contact-details.component.html',
    styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
    contactSubscription:Subscription;
    contactList : [];
    contactID=[];
    pageNo = 1;
    bigTotalItems: number;
    numPages: number = 0;
    size: number;
    contCatId : string='0';
    masterList: ContactType[];
    modalRef: BsModalRef;
    name = null;

    constructor(private router: Router,
       private contactSearch: ContactSearchService, private toastService: ToasterMsgService){ }
    ngOnInit(){
        console.log('after click');
        this.getContactList();
        this.getContactType();
    }

    ngOnDestroy(){
      this.contactList = null;
      this.contactID = null;
      this.bigTotalItems = null;
      this.size = null;
      this.numPages = null;
      this.contactSubscription.unsubscribe();
      console.log('destroy all field');
    }
    addContact(){
        console.log('open form');
        this.router.navigate(['/contact/addcontact']);
    }
    editContact(){
        console.log(this.contactID[0]);
        this.router.navigate([`/contact/editcontact/${this.contactID[0]}`]);
    }
    getContactList(){
        this.contactSubscription = this.contactSearch.getContactList(this.pageNo, this.contCatId, this.name).subscribe((res:any)=>{
            this.contactList= res.content;
           this.bigTotalItems = res.totalElements;
           this.size = res.totalElements;
          },err=>{
            this.toastService.errorMessage(err.error.message);
            this.contactList= [];
           // this.getContactList();
          });
    }
    pageChanged(event: any): void {
      this.pageNo = event.page;
      this.getContactList();
    }
    onCheckboxChange(e) {
        if (e.target.checked) {
          this.contactID.push(e.target.value);
        } else {
          this.contactID.filter(item =>{
            console.log(e.target.value === item);
            if(e.target.value === item){
                const index: number = this.contactID.indexOf(item);
                if (index !== -1) {
                  this.contactID.splice(index, 1);
                 }
            }
          });
        }
        this.contactID = Array.from(new Set(this.contactID));
      }

      deleteContact() {
        this.contactSubscription =this.contactSearch.deleteContact(this.contactID[0]).subscribe((res: any)=>{
            this.toastService.susessMessage('delete conatact success fully');
            this.getContactList();
          },err=>{
            this.toastService.errorMessage(err.error.message);
            this.getContactList();
          });
          this.contactID = [];
      }
      getContactType(){
        this.contactSubscription = this.contactSearch.getContactTypePages().subscribe((res: ContactType[])=>{
          this.masterList = res;
        });
      }
      contactFilter(categortyId : HTMLSelectElement, categortyName: HTMLInputElement){
        this.pageNo = 1;
        this.contCatId = checkNullEmpty( categortyId.value) ? '0' :  categortyId.value;
        this.name = checkNullEmpty( categortyName.value) ? null : categortyName.value;
        this.getContactList();
      }
    }