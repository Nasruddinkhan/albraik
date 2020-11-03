import { Input, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CaseModel } from '../../../../modal/case-model';
import { Contact } from '../../../../modal/contact';
import { CourtModel } from '../../../../modal/court';
import { ProjectModel } from '../../../../modal/project-model';
import { UserMaster } from '../../../../modal/user-master';
import { ContactSearchService } from '../../../../service/contact.service';
import { CourtService } from '../../../../service/court.service';
import { DialogSubmissionService } from '../../../../service/dialog-submission.service';
import { ProjectService } from '../../../../service/project.service';
import { SnackbarService } from '../../../../service/snackbar.service';
import { UserService } from '../../../../service/user.service';

@Component({
  selector: 'app-add-case',
  templateUrl: './add-case.component.html',
  styleUrls: ['./add-case.component.css']
})
export class AddCaseComponent implements OnInit, OnDestroy {
  basicData;
  caseForm: FormGroup;project: ProjectModel;
  courts: CourtModel[];
  casemodel: CaseModel;
  oppProsecutor: string;
  oppRespondent: string;
  clientRespondent: string;
  clientProsecutor: string;
  contactList: Contact[];
  clientList: Contact[];
  opposingList: Contact[];
  users : UserMaster[];
  opposingRepList: Contact[];
  companyId: string;
  subscription: Subscription;

  constructor(private fb: FormBuilder,
              private contactService: ContactSearchService,
              private userService: UserService,
              private courtService: CourtService,
              private projectService: ProjectService,
              private dialogSubmissionService: DialogSubmissionService,
              private snackbar: SnackbarService
              ) { 
                this.casemodel = new CaseModel;
              }

  ngOnInit(): void {
    this.subscription = this.dialogSubmissionService.getData().subscribe((previousDialogData: ProjectModel) => {
      this.casemodel.project = previousDialogData;
    });
    this.caseForm = this.fb.group({
      caseNumber: ['', Validators.required],
      courtName: ['', Validators.required],
      judgeName: ['', Validators.required],
      office: ['', Validators.required],
      consultant: ['', Validators.required],
      consultantEngDate: ['', Validators.required],
      client: ['', Validators.required],
      clientPosition: ['', Validators.required],
      opposing: ['', Validators.required],
      opposingPosition: ['', Validators.required],
      opposingRepresentator: ['', Validators.required],
      consultantEngText: ['', Validators.required]
    });
    this.companyId = sessionStorage.getItem("companyId");
    this.findAllCourt();
    this.findJudgeName();
    this.findClientName();
    this.findoppsingName();
    this.findoppRepName();
    this.findConsultants();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get caseNumber() {
    return this.caseForm.get('caseNumber');
  }

  get courtName() {
    return this.caseForm.get('courtName');
  }

  get judgeName() {
    return this.caseForm.get('judgeName');
  }

  get office() {
    return this.caseForm.get('office');
  }

  get consultant() {
    return this.caseForm.get('consultant');
  }

  get consultantEngDate() {
    return this.caseForm.get('consultantEngDate');
  }

  get client() {
    return this.caseForm.get('client');
  }

  get clientPosition() {
    return this.caseForm.get('clientPosition');
  }

  get opposing() {
    return this.caseForm.get('opposing');
  }

  get opposingPosition() {
    return this.caseForm.get('opposingPosition');
  }

  get opposingRepresentator() {
    return this.caseForm.get('opposingRepresentator');
  }

  get consultantEngText() {
    return this.caseForm.get('consultantEngText');
  }

  findJudgeName() {
    this.contactService.getContactType(1).subscribe((res: Contact[]) => {
      this.contactList = res;
    }, err => {
      this.contactList = [];
    });
  }
  findClientName() {
    this.contactService.getContactType(2).subscribe((res: Contact[]) => {
      this.clientList = res;
    }, err => {
      this.clientList = [];
    });
  }
  findoppRepName() {
    this.contactService.getContactType(6).subscribe((res: Contact[]) => {
      this.opposingRepList = res;
    }, err => {
      this.opposingRepList = [];
    });
  }
  findoppsingName() {
    this.contactService.getContactType(3).subscribe((res: Contact[]) => {
      this.opposingList = res;
    }, err => {
      this.opposingList = [];
    });
  }
  findAllCourt() {
    this.courtService.findAllCourt().subscribe((res: CourtModel[]) => {
      this.courts = res;
    }, err => {
      this.courts = [];
    });
  }
  findConsultants() {
    this.userService.findJobtitle(this.companyId,'Consultant' ).subscribe((res: UserMaster[]) => {
      this.users = res;
    }, err => {
      this.users = [];
    });
  }

  onSubmit() {
    this.casemodel.projectDetailsId = null;
    this.casemodel.caseNumber = this.caseNumber.value;
    this.casemodel.caseCourtId = this.courtName.value;
    this.casemodel.caseJudgeId = this.judgeName.value;
    this.casemodel.caseOffice = this.office.value;
    this.casemodel.caseConsultantId = this.consultant.value;
    this.casemodel.caseConsultantEngagementDate = this.consultantEngDate.value;
    this.casemodel.caseClientId = this.client.value;
    this.casemodel.caseClientPosition = this.clientPosition.value;
    this.casemodel.caseOpposingId = this.opposing.value;
    this.casemodel.caseOpposingPosition = this.opposingPosition.value;
    this.casemodel.caseOpposingRepresenterId = this.opposingRepresentator.value;
    this.casemodel.caseConsultantEngagementText = this.consultantEngText.value;
    console.log(JSON.stringify(this.casemodel));
    this.projectService.addProjectCase(this.casemodel).subscribe((res: CaseModel) => {
      this.dialogSubmissionService.setDialogSubmitted(true);
      this.snackbar.success('.Case added successfully');
    }, err => {
      this.snackbar.failure(err.error.message);
    });
  }

}
