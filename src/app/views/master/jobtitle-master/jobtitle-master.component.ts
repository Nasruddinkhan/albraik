import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { JobTitleModel } from '../../modal/jobtitle';
import { JobService } from '../../service/job.service';
import { ToasterMsgService } from '../../service/toaster-msg.service';
import { JobMaster } from '../../modal/jobtitle-master';
import { checkNullEmpty } from '../../service/must-match.service';
import { Router } from '@angular/router';
import { AddJobtitleDialogComponent } from './add-jobtitle-dialog/add-jobtitle-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogSubmissionService } from '../../service/dialog-submission.service';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { SnackbarService } from '../../service/snackbar.service';
import { EditJobtitleDialogComponent } from './edit-jobtitle-dialog/edit-jobtitle-dialog.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-jobtitle-master',
  templateUrl: './jobtitle-master.component.html',
  styleUrls: ['./jobtitle-master.component.css']
})
export class JobtitleMasterComponent implements OnInit, OnDestroy {
  loading = false;
  jobTitileForm: FormGroup;
  jobsMsr: JobMaster;
  name: Array<String>;
  constructor(private fb: FormBuilder,
    private router: Router,
    private toastService: ToasterMsgService,
    private jobService: JobService,
    private dialog: MatDialog,
    private dialogSubmissionService: DialogSubmissionService,
    private snackbarService: SnackbarService) { }
  userID: string;
  companyId : string;
  jobs:JobTitleModel[];
  pageNo = 1;
  bigTotalItems: number;
  numPages: number = 0;
  maxSize: number = 5;
  checkValidity = false;
  checkedJobs = [];
  displayedColumns: string[] = ['position', 'name', 'delete'];
  srNo:number = 0;
  subscription: Subscription;
  deleteDisabled = true;
  editDisabled = true;
  addDisabled = false;
  firstCheckedJob: Event;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;

  changePageSize(e) {
    this.pageSize = e.pageSize;
    console.log(e);
  }

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
    this.subscription = this.dialogSubmissionService.getDialogSubmitted().subscribe(dialogSubmitted => {
      if (dialogSubmitted) {
        this.findAllJobs();
        this.checkedJobs = [];
        this.handleEditButton();
        this.handleDeleteButton();
        this.handleAddButton();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  findAllJobs(){
    this.loading = true;
    this.jobService.findAllJobTitles( this.userID).subscribe((res:JobTitleModel[])=>{
      this.jobs = res;
      // Appending srNo property to every jobs for displaying incremented sr no in the table
      this.srNo = 0;
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
    // this.onSubmit();
  }

  deleteaddJobTitle(index) {
    this.jobTitleNames.removeAt(index);
  }

  onCheckboxChange(e, jobId: number) {
    if (e.checked) {
      this.checkedJobs.push({ id: jobId, checkbox: e });
    } else {
      for (let i = 0; i < this.checkedJobs.length; ++i) {
        if (this.checkedJobs[i]['id'] === jobId) {
          this.checkedJobs.splice(i, 1);
          break;
        }
      }
    }
    this.handleDeleteButton();
    this.handleEditButton();
    this.handleAddButton();
    if (this.checkedJobs.length === 1) {
      this.firstCheckedJob = this.checkedJobs[0]['checkbox'];
    }
  }

  deleteJobtitle() {
    let checkedJobsString = this.checkedJobs.map(checkedJob => {
      return checkedJob['id'].toString();
    });
    console.log(typeof(checkedJobsString[0]) +"\n"+ typeof(this.checkedJobs[0]));
    this.jobService.deleteJobTitle(checkedJobsString).subscribe(res => {
      this.findAllJobs();
      this.snackbarService.success("."+this.checkedJobs.length+" job title(s) deleted successfully.");
      this.checkedJobs = [];
      this.handleDeleteButton();
      this.handleEditButton();
      this.handleAddButton();
    }, err=> {
      this.snackbarService.failure("!!!Something went wrong.");
    });
  }

  // onSubmit(){
  //   console.log('jobtitle onSubmit');
  //   if (this.jobTitleNames.length === 1) {
  //     this.toastService.errorMessage(".At least one job title is required");
  //     return;
  //   }
  //   this.name = new Array<String>();
  //   for (let i = 1; i < this.jobTitleNames.length; ++i) {
  //     this.name.push(this.jobTitleNames.controls[i].value.jobtittle);
  //   }
  //   this.jobsMsr = new JobMaster(this.userID,  this.companyId, this.name);
  //   this.loading = true;
  //   this.jobService.createJobTitle( this.jobsMsr).subscribe((res:JobTitleModel[])=>{
  //     this.loading = false;
  //     this.jobTitileForm = this.fb.group({
  //       jobtittle_names: this.fb.array([this.fb.group({jobtittle:''})])
  //     });
  //     this.checkValidity = false;
  //     this.toastService.susessMessage('Job title created successfully');
  //     this.findAllJobs();
  //   },err=>{
  //     this.loading = false;
  //     this.toastService.errorMessage(err.error.message);
  //     this.findAllJobs();
  //   });
  // }

  handleEditButton() {
    if (this.checkedJobs.length === 1) {
      this.editDisabled = false;
    } else {
      this.editDisabled = true;
    }
  }

  handleDeleteButton() {
    if (this.checkedJobs.length > 0) {
      this.deleteDisabled = false;
    } else {
      this.deleteDisabled = true;
    }
  }

  handleAddButton() {
    if (this.checkedJobs.length === 0) {
      this.addDisabled = false;
    } else {
      this.addDisabled = true;
    }
  }

  openAddDialog() {
    this.dialog.open(AddJobtitleDialogComponent);
  }

  openEditDialog() {
    let oldJobtitle: string;
    for (let i = 0; i < this.jobs.length; ++i) {
      if (this.jobs[i]['id'] === this.checkedJobs[0]['id']) {
        oldJobtitle = this.jobs[i]['name'];
      }
    }
    this.dialogSubmissionService.setData({ oldJobtitle: oldJobtitle, id: this.checkedJobs[0]['id']});
    this.handleDeleteButton();
    this.handleEditButton();
    this.handleAddButton();
    this.dialog.open(EditJobtitleDialogComponent);
  }

}
