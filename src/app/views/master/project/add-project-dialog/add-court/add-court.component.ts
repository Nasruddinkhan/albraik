import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CaseModel } from '../../../../modal/case-model';
import { Contact } from '../../../../modal/contact';
import { CourtModel } from '../../../../modal/court';
import { ProjectModel } from '../../../../modal/project-model';
import { UserMaster } from '../../../../modal/user-master';
import { ContactSearchService } from '../../../../service/contact.service';
import { CourtService } from '../../../../service/court.service';
import { UserService } from '../../../../service/user.service';

@Component({
  selector: 'app-add-court',
  templateUrl: './add-court.component.html',
  styleUrls: ['./add-court.component.css']
})
export class AddCourtComponent implements OnInit {
  @Input('projectBasicData') projectBasicData;
  courtForm: FormGroup;project: ProjectModel;
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

  constructor(private fb: FormBuilder,
              private contactService: ContactSearchService,
              private userService: UserService,
              private courtService: CourtService) { 
                this.casemodel = new CaseModel;
              }

  ngOnInit(): void {
    this.courtForm = this.fb.group({
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

  get caseNumber() {
    return this.courtForm.get('caseNumber');
  }

  get courtName() {
    return this.courtForm.get('courtName');
  }

  get judgeName() {
    return this.courtForm.get('judgeName');
  }

  get office() {
    return this.courtForm.get('office');
  }

  get consultant() {
    return this.courtForm.get('consultant');
  }

  get consultantEngDate() {
    return this.courtForm.get('consultantEngDate');
  }

  get client() {
    return this.courtForm.get('client');
  }

  get clientPosition() {
    return this.courtForm.get('clientPosition');
  }

  get opposing() {
    return this.courtForm.get('opposing');
  }

  get opposingPosition() {
    return this.courtForm.get('opposingPosition');
  }

  get opposingRepresentator() {
    return this.courtForm.get('opposingRepresentator');
  }

  get consultantEngText() {
    return this.courtForm.get('consultantEngText');
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



}
