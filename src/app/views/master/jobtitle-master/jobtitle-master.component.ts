import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { JobTitleModel } from '../../modal/jobtitle';
import { JobService } from '../../service/job.service';
import { ToasterMsgService } from '../../service/toaster-msg.service';
import { JobMaster } from '../../modal/jobtitle-master';
import { checkNullEmpty } from '../../service/must-match.service';
import { Router } from '@angular/router';

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
    private jobService: JobService) { }
  userID: string;
  companyId : string;
  jobs:JobTitleModel[];
  pageNo = 1;
  bigTotalItems: number;
  numPages: number = 0;
  maxSize: number = 5;
  ngOnInit() {
    this.userID  = sessionStorage.getItem("userId");
    this.companyId =  sessionStorage.getItem("companyId");
    if(checkNullEmpty( this.companyId )){
      this.router.navigate([`/master/company`]);
    }
    this.findAllJobs();
    this.jobTitileForm = this.fb.group({
      jobtittle_names: this.fb.array([this.fb.group({jobtittle:''})])
    })
  }
  findAllJobs(){
    this.loading = true;
    this.jobService.findAllJobTitles( this.userID).subscribe((res:JobTitleModel[])=>{
      this.jobs = res;
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
    this.jobTitleNames.push(this.fb.group({jobtittle:''}));
  }

  deleteaddJobTitle(index) {
    this.jobTitleNames.removeAt(index);
  }
  onSubmit(){
    console.log('jobtitle onSubmit');
    this.name = new Array<String>();
    this.jobTitileForm.value['jobtittle_names'].map(item => {
      this.name.push(item.jobtittle);
    });
    this.jobsMsr = new JobMaster(this.userID,  this.companyId, this.name);
    this.loading = true;
    this.jobService.createJobTitle( this.jobsMsr).subscribe((res:JobTitleModel[])=>{
      this.loading = false;
      this.jobTitleNames.reset();
      this.toastService.susessMessage('department created successfully')
      this.findAllJobs();
    },err=>{
      this.loading = false;
      this.toastService.errorMessage(err.error.message);
      this.findAllJobs();
    });
  }
}
