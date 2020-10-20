import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DialogSubmissionService } from '../../../service/dialog-submission.service';
import { JobService } from '../../../service/job.service';
import { SnackbarService } from '../../../service/snackbar.service';

@Component({
  selector: 'app-edit-jobtitle-dialog',
  templateUrl: './edit-jobtitle-dialog.component.html',
  styleUrls: ['./edit-jobtitle-dialog.component.css']
})
export class EditJobtitleDialogComponent implements OnInit, OnDestroy {
  oldJobtitle: string;
  id: number;
  updateForm;
  subscription: Subscription;
  constructor(private dialogSubmissionService: DialogSubmissionService,
    private fb: FormBuilder,
    private jobService: JobService,
    private snackService: SnackbarService) { }

  ngOnInit(): void {
    this.dialogSubmissionService.setDialogSubmitted(false);
    this.subscription = this.dialogSubmissionService.getData().subscribe(jobtitle => {
      if (jobtitle) {
        this.oldJobtitle = jobtitle['oldJobtitle'];
        this.id = jobtitle['id'];
      }
    });
    this.updateForm = this.fb.group({
      updatedJobtitle: [this.oldJobtitle]
    });
  }

  get updatedJobtitle() {
    return this.updateForm.get("updatedJobtitle").value;
  }

  updateJobtitle() {
    console.log(this.updatedJobtitle);
    this.jobService.updateJobTitle(this.updatedJobtitle, this.id).subscribe(res => {
      this.snackService.success("." + this.oldJobtitle + " successfully updated to " + this.updatedJobtitle);
      this.dialogSubmissionService.setDialogSubmitted(true);
    }, err => {
      this.snackService.failure("!!!Something went wrong");
    });
  }

  ngOnDestroy() {
    this.dialogSubmissionService.setData(undefined);
    this.subscription.unsubscribe();
  }

}
