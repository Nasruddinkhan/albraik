import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { JobTitleModel } from '../../modal/jobtitle';
import { JobService } from '../../service/job.service';
import { ToasterMsgService } from '../../service/toaster-msg.service';
import { JobMaster } from '../../modal/jobtitle-master';
import { checkNullEmpty } from '../../service/must-match.service';
import { Router } from '@angular/router';
import { JobtitleDialogComponent } from './jobtitle-dialog/jobtitle-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-jobtitle-master',
  templateUrl: './jobtitle-master.component.html',
  styleUrls: ['./jobtitle-master.component.css']
})
export class JobtitleMasterComponent implements OnInit {
  loading = false;
  jobTitileForm: FormGroup;
  jobsMsr: JobMaster;
  name: Array<String>;
  constructor(private fb: FormBuilder,
    private router: Router,
    private toastService: ToasterMsgService,
    private jobService: JobService,
    public dialog: MatDialog) { }
  userID: string;
  companyId : string;
  jobs:JobTitleModel[];
  pageNo = 1;
  bigTotalItems: number;
  numPages: number = 0;
  maxSize: number = 5;
  checkValidity = false;
  checkedJobs: number[] = [];
  displayedColumns: string[] = ['position', 'name'];
  srNo:number = 0;

  ngOnInit() {
    this.userID  = sessionStorage.getItem("userId");
    this.companyId =  sessionStorage.getItem("companyId");
    if(checkNullEmpty( this.companyId )){
      this.router.navigate([`/master/company`]);
    }
    this.findAllJobs();
    this.jobTitileForm = this.fb.group({
      jobtittle_names: this.fb.array([this.fb.group({jobtittle:''})])
    });
  }
  findAllJobs(){
    this.loading = true;
    this.jobService.findAllJobTitles( this.userID).subscribe((res:JobTitleModel[])=>{
      this.jobs = res;
      // Appending srNo property to every jobs for displaying incremented sr no in the table
      this.jobs.forEach(job => {
        job['srNo'] = ++this.srNo;
      });
      this.loading = false;
      this.bigTotalItems = res.length;
    },err=>{
      this.jobs = [];
      this.loading = false;
    });
  }

  get jobTitleNames() {
    return this.jobTitileForm.get('jobtittle_names') as FormArray;
  }

  addJobTitle() {
    if (this.jobTitileForm.invalid) {
      this.checkValidity = true;
      return;
    }
    this.checkValidity = false;

    console.log(this.jobTitleNames.controls[0].value.jobtittle);
    this.jobTitleNames.push(this.fb.group({ jobtittle: this.jobTitleNames.controls[0].value.jobtittle }));
    this.jobTitleNames.insert(0, this.fb.group({ jobtittle: '' }));
    this.jobTitleNames.removeAt(1);
    this.onSubmit();
  }

  deleteaddJobTitle(index) {
    this.jobTitleNames.removeAt(index);
  }

  onCheckboxChange(e) {
    if (e.target.checked) {
      this.checkedJobs.push(e.target.value);
    } else {
      let indx = -1;
      for (let i = 0; i < this.checkedJobs.length; ++i) {
        if (this.checkedJobs[i] === e.target.value) {
          indx = i;
        }
      }
      this.checkedJobs.splice(indx, 1);
    }
    
  }

  onSubmit(){
    console.log('jobtitle onSubmit');
    if (this.jobTitleNames.length === 1) {
      this.toastService.errorMessage(".At least one job title is required");
      return;
    }
    this.name = new Array<String>();
    for (let i = 1; i < this.jobTitleNames.length; ++i) {
      this.name.push(this.jobTitleNames.controls[i].value.jobtittle);
    }
    this.jobsMsr = new JobMaster(this.userID,  this.companyId, this.name);
    this.loading = true;
    this.jobService.createJobTitle( this.jobsMsr).subscribe((res:JobTitleModel[])=>{
      this.loading = false;
      this.jobTitileForm = this.fb.group({
        jobtittle_names: this.fb.array([this.fb.group({jobtittle:''})])
      });
      this.checkValidity = false;
      this.toastService.susessMessage('Job title created successfully');
      this.srNo = 0;
      this.findAllJobs();
    },err=>{
      this.loading = false;
      this.toastService.errorMessage(err.error.message);
      this.findAllJobs();
    });
  }

  openDialog() {
    this.dialog.open(JobtitleDialogComponent);
  }

}
