import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Subscription } from 'rxjs';
import { ProjectModel } from '../../../../modal/project-model';
import { VerditModel } from '../../../../modal/verdict-model';
import { DialogSubmissionService } from '../../../../service/dialog-submission.service';
import { ProjectService } from '../../../../service/project.service';
import { SnackbarService } from '../../../../service/snackbar.service';

@Component({
  selector: 'app-add-executed-case',
  templateUrl: './add-executed-case.component.html',
  styleUrls: ['./add-executed-case.component.css']
})
export class AddExecutedCaseComponent implements OnInit, OnDestroy {
  caseType="a2bd22d5-2703-444d-9628-b2fb040df14d";
  companyId :string;
  action = 'Add';
  locale = 'ar';
  executedCaseForm: FormGroup;
  verdict: VerditModel;
  cases: ProjectModel[];
  subscription: Subscription;

  constructor(private fb: FormBuilder,
              private snackbar: SnackbarService,
              private projectService: ProjectService,
              private dialogSubmissionService: DialogSubmissionService,
              private localeService: BsLocaleService) { 
                this.localeService.use(this.locale);
              }

  ngOnInit(): void {
    this.dialogSubmissionService.setDialogSubmitted(true);
    this.verdict = new VerditModel;
    this.companyId =  sessionStorage.getItem("companyId");
    this.getAllCase();
    this.subscription = this.dialogSubmissionService.getData().subscribe((previousPageDate: ProjectModel) => {
      this.verdict.project = previousPageDate;
    });
    this.executedCaseForm = this.fb.group({
      executedCase: ['', Validators.required],
      verdictNumber: ['', Validators.required],
      date: ['', Validators.required],
      source: ['', Validators.required],
      verdictType: ['', Validators.required],
      verdictDecisionDate: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getAllCase(){
    this.projectService.findCase (this.companyId, this.caseType).subscribe((res:ProjectModel[])=>{
      this.cases = res;
    },err=>{
      this.snackbar.failure(err.error.message);
    })
  }

  get executedCase() {
    return this.executedCaseForm.get('executedCase');
  }

  get verdictNumber() {
    return this.executedCaseForm.get('verdictNumber');
  }
  
  get date() {
    return this.executedCaseForm.get('date');
  }

  get source() {
    return this.executedCaseForm.get('source');
  }

  get verdictType() {
    return this.executedCaseForm.get('verdictType');
  }

  get verdictDecisionDate() {
    return this.executedCaseForm.get('verdictDecisionDate');
  }

  onSubmit() {
    this.verdict.projectDetailsId = null;
    this.verdict.verdictDate = this.date.value;
    this.verdict.verdictDecisionDate = this.verdictDecisionDate.value;
    this.verdict.verdictExecutedCaseId = this.executedCase.value;
    this.verdict.verdictNumber = this.verdictNumber.value;
    this.verdict.verdictSource = this.source.value;
    this.verdict.verdictType = this.verdictType.value;
    console.log(this.verdict);
    this.projectService.addVerditCase(  this.verdict).subscribe((res: VerditModel) => {
      this.dialogSubmissionService.setDialogSubmitted(true);
      this.snackbar.success('.Case added successfully');
    },err => {
      this.snackbar.failure(err.error.message);
    });
  }

}
