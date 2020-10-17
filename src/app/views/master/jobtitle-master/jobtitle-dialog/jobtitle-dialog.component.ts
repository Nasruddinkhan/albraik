import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { JobMaster } from '../../../modal/jobtitle-master';
import { JobTitleModel } from './../../../modal/jobtitle';
import { JobService } from './../../../service/job.service';
import { Subscription } from 'rxjs';
import { DialogSubmissionService } from '../../../service/dialog-submission.service';
import { SnackbarService } from '../../../service/snackbar.service';

@Component({
  selector: 'app-jobtitle-dialog',
  templateUrl: './jobtitle-dialog.component.html',
  styleUrls: ['./jobtitle-dialog.component.css']
})

export class JobtitleDialogComponent implements OnInit {
  jobMsr: JobMaster;
  userId: string;
  companyId: string;
  jobTitles = [];
  removable = true;
  addOnBlur = true;
  subscription: Subscription;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private jobService: JobService, 
    private snackbarService: SnackbarService, 
    private dialogSubmitted: DialogSubmissionService) { }

  ngOnInit(): void { 
    this.userId  = sessionStorage.getItem("userId");
    this.companyId =  sessionStorage.getItem("companyId");
    this.dialogSubmitted.setDialogSubmitted(false);
  }

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;
    if ((value || '').trim()) {
      this.jobTitles.push({name: value.trim()});
    }
    if (input) {
      input.value = '';
    }
  }

  remove(jobtitle) {
    let index = this.jobTitles.indexOf(jobtitle);
    if (index >= 0) {
      this.jobTitles.splice(index, 1);
    }
  }

  onSubmit() {
    let jobNames = new Array<String>();
    this.jobTitles.forEach(title => {
      jobNames.push(title.name);
    });
    this.jobMsr = new JobMaster(this.userId,  this.companyId, jobNames);
    this.jobService.createJobTitle( this.jobMsr).subscribe((res:JobTitleModel[])=>{
      this.snackbarService.success(".Jobtitle added successfully");
      this.dialogSubmitted.setDialogSubmitted(true);
    },err=>{
      this.snackbarService.failure("!!!Something went wrong");
    }); 
  }

}
