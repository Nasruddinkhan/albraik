import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Subscription } from 'rxjs';
import { CourtModel } from '../../../../modal/court';
import { DeedModel } from '../../../../modal/deed-model';
import { ProjectModel } from '../../../../modal/project-model';
import { CourtService } from '../../../../service/court.service';
import { DialogSubmissionService } from '../../../../service/dialog-submission.service';
import { ProjectService } from '../../../../service/project.service';
import { SnackbarService } from '../../../../service/snackbar.service';

@Component({
  selector: 'app-deed-of-ownership',
  templateUrl: './deed-of-ownership.component.html',
  styleUrls: ['./deed-of-ownership.component.css']
})
export class DeedOfOwnershipComponent implements OnInit, OnDestroy {
  locale = 'ar';
  deedOfOwnershipForm: FormGroup;
  deedModel: DeedModel;
  courts: CourtModel[];
  subscription: Subscription;

  constructor(private fb: FormBuilder,
              private dialogSubmissionService: DialogSubmissionService,
              private courtService: CourtService,
              private projectService: ProjectService,
              private snackbar: SnackbarService,
              private localeService: BsLocaleService) { 
                this.localeService.use(this.locale);
              }

  ngOnInit(): void {
    this.dialogSubmissionService.setDialogSubmitted(false);
    this.deedModel = new DeedModel;
    this.findAllCourt();
    this.subscription = this.dialogSubmissionService.getData().subscribe((previousPageDate: ProjectModel) => {
      this.deedModel.project = previousPageDate;
    });
    this.deedOfOwnershipForm = this.fb.group({
      officeRef: ['', Validators.required],
      courtName: ['', Validators.required],
      caseObserver: ['', Validators.required],
      caseNumber: ['', Validators.required],
      refDate: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  findAllCourt() {
    this.courtService.findAllCourt().subscribe((res: CourtModel[]) => {
      this.courts = res;
    }, err => {
      this.courts = [];
    });
  }

  get officeRef() {
    return this.deedOfOwnershipForm.get('officeRef');
  }

  get courtName() {
    return this.deedOfOwnershipForm.get('courtName');
  }

  get caseObserver() {
    return this.deedOfOwnershipForm.get('caseObserver');
  }

  get caseNumber() {
    return this.deedOfOwnershipForm.get('caseNumber');
  }

  get refDate() {
    return this.deedOfOwnershipForm.get('refDate');
  }

  onSubmit() {
    this.deedModel.projectDetailsId = null;
    this.deedModel.dooCaseNumber = this.caseNumber.value;
    this.deedModel.dooCaseObserverName = this.caseObserver.value;
    this.deedModel.dooCourtId = this.courtName.value;
    this.deedModel.dooOfficeReference = this.officeRef.value;
    this.deedModel.dooReferentDate = this.refDate.value;
    this.projectService.addDeedCase( this.deedModel).subscribe((res:DeedModel)=>{
      this.dialogSubmissionService.setDialogSubmitted(true);
      this.snackbar.success('.Deed added successfully');
    },err=>{
      this.snackbar.failure(err.error.message);
    });
  }

}
