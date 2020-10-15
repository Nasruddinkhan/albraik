import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { JobMaster } from '../../../modal/jobtitle-master';
import { JobTitleModel } from './../../../modal/jobtitle';
import { JobService } from './../../../service/job.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private jobService: JobService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void { 
    this.userId  = sessionStorage.getItem("userId");
    this.companyId =  sessionStorage.getItem("companyId");
  }

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    if ((value || '').trim()) {
      this.jobTitles.push({name: value.trim()});
    }
    // Reset the input value
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
      this._snackBar.open(".Job Title added successfully", '', {
        duration: 2000,
        panelClass: "success"
      });
      this.router.navigate(['/master/jobtitle']);
    },err=>{
      this._snackBar.open("!!!Something went wrong", '', {
        duration: 2000,
        panelClass: "failure"
      });
    });
    
  }

}
