import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Contact } from '../../../../modal/contact';
import { InheritanceModel } from '../../../../modal/Inheretence-model';
import { ProjectModel } from '../../../../modal/project-model';
import { ContactSearchService } from '../../../../service/contact.service';
import { DialogSubmissionService } from '../../../../service/dialog-submission.service';
import { ProjectService } from '../../../../service/project.service';
import { SnackbarService } from '../../../../service/snackbar.service';

@Component({
  selector: 'app-inheritance',
  templateUrl: './inheritance.component.html',
  styleUrls: ['./inheritance.component.css']
})
export class InheritanceComponent implements OnInit, OnDestroy {
  inheritanceForm: FormGroup;
  inherit:InheritanceModel;
  sucription:Subscription;
  inheritContact: Contact[];
  subscription: Subscription;

  constructor(private fb: FormBuilder,
              private snackbar: SnackbarService,
              private contactService: ContactSearchService,
              private projectService: ProjectService,
              private dialogSubmissionService: DialogSubmissionService) { }

  ngOnInit(): void {
    this.inherit = new InheritanceModel;
    this.dialogSubmissionService.setDialogSubmitted(true);
    this.subscription = this.dialogSubmissionService.getData().subscribe((previousPageDate: ProjectModel) => {
      this.inherit.project = previousPageDate;
    });
    this.findInheritContacts();
    this.inheritanceForm = this.fb.group({
      ownerName: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get ownerName() {
    return this.inheritanceForm.get('ownerName');
  }

  findInheritContacts() {
    this.contactService.getContactType(4).subscribe((res: Contact[]) => {
      this.inheritContact = res;
    }, err => {
      this.inheritContact = [];
    });
  }

  onSubmit() {
    this.inherit.projectDetailsId = null;
    this.inherit.inheritanceOwnerId = this.ownerName.value;
    this.projectService.addInheritanceCase( this.inherit).subscribe((res:InheritanceModel)=>{
      this.dialogSubmissionService.setDialogSubmitted(true);
      this.snackbar.success('.Case added successfully');
    },err=>{
      this.snackbar.failure(err.error.message);
    });
  }

}
