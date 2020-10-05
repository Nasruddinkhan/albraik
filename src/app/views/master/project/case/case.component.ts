import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Subscription } from 'rxjs';
import { CaseModel } from '../../../modal/case-model';
import { Contact } from '../../../modal/contact';
import { CourtModel } from '../../../modal/court';
import { ProjectModel } from '../../../modal/project-model';
import { ContactSearchService } from '../../../service/contact.service';
import { CourtService } from '../../../service/court.service';
import { ProjectService } from '../../../service/project.service';
import { ToasterMsgService } from '../../../service/toaster-msg.service';
enum ClientPositionType { P, R, NONE };
enum OpositionPositionType { P, R, NONE };
@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})
export class CaseComponent implements OnInit {
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
  oppsingRepList:Contact[];
  constructor(private localeService: BsLocaleService,
    private courtService: CourtService,
    private contactService: ContactSearchService,
    private router: Router,
    private toster: ToasterMsgService,
    private activeRoute: ActivatedRoute,
    private projectService: ProjectService) {
    this.localeService.use(this.locale);

    this.casemodel = new CaseModel;

  }

  ngOnInit(): void {
    this.findAllCourt();
    this.findJudgeName();
    this.findClientName();
    this.findoppsingName();
    this.findoppRepName();
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

  onSubmit(form: NgForm) {
    console.log(JSON.stringify(form.value));
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
    console.log(JSON.stringify(this.casemodel));
    this.sucription = this.projectService.addProjectCase(this.casemodel).subscribe((res: CaseModel) => {
      this.router.navigate([`/master/project`])
      this.toster.susessMessage('Add case successfully');
      form.reset();
    }, err => {
      this.toster.errorMessage(err.error.message);
    });
  }
  changed(value: string) {
    console.log(value);
  }
  selectCheckBox(targetType: ClientPositionType) {
    if (this.currentlyChecked === targetType) {
      this.currentlyChecked = ClientPositionType.NONE;
      return;
    }

    this.currentlyChecked = targetType;
    console.log(this.currentlyChecked);
  }

  selectOpositionCheckBox(targetType: OpositionPositionType) {
    if (this.oppcurrentlyChecked === targetType) {
      this.oppcurrentlyChecked = OpositionPositionType.NONE;
      return;
    }
    this.oppcurrentlyChecked = targetType;
    console.log(this.oppcurrentlyChecked);
  }
}
