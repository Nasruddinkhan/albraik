import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DialogSubmissionService } from '../../../service/dialog-submission.service';
import { JobService } from '../../../service/job.service';

@Component({
  selector: 'app-edit-jobtitle-dialog',
  templateUrl: './edit-jobtitle-dialog.component.html',
  styleUrls: ['./edit-jobtitle-dialog.component.css']
})
export class EditJobtitleDialogComponent implements OnInit, OnDestroy {
  oldJobtitle: string;
  updateForm;
  subscription: Subscription;
  constructor(private dialogSubmissionService: DialogSubmissionService,
    private fb: FormBuilder,
    private jobService: JobService) { }

  ngOnInit(): void {
    this.subscription = this.dialogSubmissionService.getData().subscribe(jobtitle => {
      if (jobtitle !== '') {
        this.oldJobtitle = jobtitle;
      }
    });
    this.updateForm = this.fb.group({
      updatedJobtitle: [this.oldJobtitle]
    });
  }

  get updatedJobtitle() {
    return this.updateForm.get("updatedJobtitle");
  }

  updateJobtitle() {
    console.log(this.updatedJobtitle);
    // this.jobService.updateJobTitle(this.updateJobtitle, )
  }

  ngOnDestroy() {
    this.dialogSubmissionService.setData('');
    this.subscription.unsubscribe();
  }

}
