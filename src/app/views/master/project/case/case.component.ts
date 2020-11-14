import { JsonPipe } from '@angular/common';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Subscription } from 'rxjs';
import { CaseModel } from '../../../modal/case-model';
import { Contact } from '../../../modal/contact';
import { CourtModel } from '../../../modal/court';
import { ProjectModel } from '../../../modal/project-model';
import { UserMaster } from '../../../modal/user-master';
import { ContactSearchService } from '../../../service/contact.service';
import { CourtService } from '../../../service/court.service';
import { ProjectService } from '../../../service/project.service';
import { ToasterMsgService } from '../../../service/toaster-msg.service';
import { UserService } from '../../../service/user.service';
enum ClientPositionType { P, R, NONE };
enum OpositionPositionType { P, R, NONE };
@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})
export class CaseComponent implements OnInit , OnDestroy, OnChanges{
  sucription: Subscription;
  check_box_type = ClientPositionType;
  currentlyChecked: ClientPositionType;
  oppcheckboxtype = OpositionPositionType;
  oppcurrentlyChecked: OpositionPositionType;
  action = 'Add';
  locale = 'ar';
  project: ProjectModel;
  courts: CourtModel[];
  casemodel: CaseModel;
  oppProsecutor: string;
  oppRespondent: string;
  clientRespondent: string;
  clientProsecutor: string;
  contactList: Contact[];
  clientList:Contact[];
  oppsingList:Contact[];
  users : UserMaster[];
  oppsingRepList:Contact[];
  companyId: string;
  
  constructor(private localeService: BsLocaleService,
    private courtService: CourtService,
    private contactService: ContactSearchService,
    private router: Router,
    private userService: UserService,
    private toster: ToasterMsgService,
    private activeRoute: ActivatedRoute,
    private projectService: ProjectService) {
    this.localeService.use(this.locale);
    this.casemodel = new CaseModel;
    
  }
  ngOnChanges(changes: SimpleChanges): void {
  // console.log(changes);
  }
  ngOnDestroy(): void {

    this.casemodel       =null;
    this.oppProsecutor=null;
    this.oppRespondent=null;
    this.clientRespondent=null;
    this.clientProsecutor=null;
    this.contactList=null;
    this.clientList=null;
    this.oppsingList
    this.oppsingRepList =null;
    this.sucription.unsubscribe();
    this.check_box_type =null;
    this.currentlyChecked=null;
    this.oppcheckboxtype = null;
    this.oppcurrentlyChecked= null;
    this. action = null;
    this.locale  = null;
    this.project=null;
    this.courts=null;
    // console.log('clear all activity');
    this.contactService = null;
    this.courtService=null;
    this.projectService=null;
    this.localeService=null;
    this.activeRoute = null;
    this.router=null;
    this.toster = null;
  }

  ngOnInit(): void {
    this.companyId =  sessionStorage.getItem("companyId");

    this.findAllCourt();
    this.findJudgeName();
    this.findClientName();
    this.findoppsingName();
    this.findoppRepName();
    this.findConsultants();
    this.activeRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('project')) {
        return;
      }
      this.casemodel.project = JSON.parse(paramMap.get('project'));

    });
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
  findoppRepName(){
    this.contactService.getContactType(6).subscribe((res: Contact[]) => {
      this.oppsingRepList = res;
    }, err => {
      this.oppsingRepList = [];
    });
  }
  findoppsingName() {
    this.contactService.getContactType(3).subscribe((res: Contact[]) => {
      this.oppsingList = res;
    }, err => {
      this.oppsingList = [];
    });
  }
  findAllCourt() {
    this.courtService.findAllCourt().subscribe((res: CourtModel[]) => {
      this.courts = res;
    }, err => {
      this.courts = [];
    });
  }
  findConsultants(){
    
    this.userService.findJobtitle(this.companyId,'Consultant' ).subscribe((res: UserMaster[]) => {
      this.users = res;
    }, err => {
      this.users = [];
    });
  }
  onSubmit(form: NgForm) {
    // console.log(JSON.stringify(form.value));
    this.casemodel.projectDetailsId = null;
    this.casemodel.caseNumber = form.value.caseNumber;
    this.casemodel.caseCourtId = form.value.caseCourtId;
    this.casemodel.caseJudgeId = form.value.caseJudgeId;
    this.casemodel.caseOffice = form.value.caseOffice;
    this.casemodel.caseConsultantId =form.value.caseConsultantId;
    this.casemodel.caseConsultantEngagementDate = form.value.caseConsultantEngagementDate;
    this.casemodel.caseClientId = form.value.caseClientId;
    this.casemodel.caseClientPosition = this.currentlyChecked ? 'R' : 'P';
    this.casemodel.caseOpposingId = form.value.caseOpposingId;
    this.casemodel.caseOpposingPosition = this.oppcurrentlyChecked ? 'R' : 'P';
    this.casemodel.caseOpposingRepresenterId = form.value.caseOpposingRepresenterId;
    this.casemodel.caseConsultantEngagementText = form.value.caseConsultantEngagementText;
    this.sucription = this.projectService.addProjectCase(this.casemodel).subscribe((res: CaseModel) => {
      this.router.navigate([`/master/project`])
      this.toster.susessMessage('Add case successfully');
      form.reset();
    }, err => {
      this.toster.errorMessage(err.error.message);
    });
  }
  changed(value: string) {
    // console.log(value);
  }
  selectCheckBox(targetType: ClientPositionType) {
    if (this.currentlyChecked === targetType) {
      this.currentlyChecked = ClientPositionType.NONE;
      return;
    }

    this.currentlyChecked = targetType;
  }

  selectOpositionCheckBox(targetType: OpositionPositionType) {
    if (this.oppcurrentlyChecked === targetType) {
      this.oppcurrentlyChecked = OpositionPositionType.NONE;
      return;
    }
    this.oppcurrentlyChecked = targetType;
  }
}
