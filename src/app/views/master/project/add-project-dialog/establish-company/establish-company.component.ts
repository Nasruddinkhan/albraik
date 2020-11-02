import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Establisement } from '../../../../modal/establisment-model';
import { ProjectModel } from '../../../../modal/project-model';
import { DialogSubmissionService } from '../../../../service/dialog-submission.service';
import { ProjectService } from '../../../../service/project.service';
import { SnackbarService } from '../../../../service/snackbar.service';

@Component({
  selector: 'app-establish-company',
  templateUrl: './establish-company.component.html',
  styleUrls: ['./establish-company.component.css']
})
export class EstablishCompanyComponent implements OnInit, OnDestroy {
  companyForm: FormGroup;
  subscription: Subscription;
  establishment: Establisement;

  constructor(private fb: FormBuilder,
              private dialogSubmissionService: DialogSubmissionService,
              private snackbar: SnackbarService,
              private projectService: ProjectService) { }

  ngOnInit(): void {
    this.establishment = new Establisement;
    this.subscription = this.dialogSubmissionService.getData().subscribe((previousPageData: ProjectModel) => {
      this.establishment.project = previousPageData;
    });
    this.companyForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get name() {
    return this.companyForm.get('name');
  }

  onSubmit() {
    this.establishment.companyName = this.name.value;
    this.projectService.addEstiblishmentCompanyCase(this.establishment).subscribe((res:Establisement)=>{
      this.dialogSubmissionService.setDialogSubmitted(true);
      this.snackbar.success('.Project added successfully');
    }, err => {
      this.snackbar.failure(err.error.message);
    });
  }

}
