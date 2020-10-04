import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CourtModel } from '../../modal/court';
import { CourtMaster } from '../../modal/court-master';
import { CourtService } from '../../service/court.service';
import { JobService } from '../../service/job.service';
import { checkNullEmpty } from '../../service/must-match.service';
import { ToasterMsgService } from '../../service/toaster-msg.service';

@Component({
  selector: 'app-court',
  templateUrl: './court.component.html',
  styleUrls: ['./court.component.css']
})
export class CourtComponent implements OnInit {
  loading = false;
  addCourtForm: FormGroup;
  courtList: Array<CourtMaster>;
  constructor(private fb: FormBuilder,
    private router: Router,
    private toastService: ToasterMsgService,
    private courtService: CourtService) { }
  userID: string;
  companyId : string;
  courts:CourtModel[];
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
    this.findAllCourt();
    this.addCourtForm = this.fb.group({
      court_names: this.fb.array([this.fb.group({addCourt:''})])
    })
  }

  findAllCourt(){
    this.loading = true;
    this.courtService.findAllCourt().subscribe((res:CourtModel[])=>{
      this.courts = res;
      this.loading = false;
      this.bigTotalItems = res.length;
    },err=>{
      this.courts = [];
      this.loading = false;
    });
  }

  get courtNames() {
    return this.addCourtForm.get('court_names') as FormArray;
  }

  addCourt() {
    this.courtNames.push(this.fb.group({addCourt:''}));
  }

  deleteaddCourt(index) {
    this.courtNames.removeAt(index);
  }
  onSubmit(){
    console.log('jobtitle onSubmit');
    this.courtList = new Array<CourtMaster>();
    this.addCourtForm.value['court_names'].map(item => {
      this.courtList.push(new CourtMaster(item.addCourt));
    });
    this.loading = true;
    this.courtService.createCourt( this.courtList).subscribe((res:CourtModel[])=>{
      this.loading = false;
      this.courtNames.reset();
      this.toastService.susessMessage('department created successfully')
      this.findAllCourt();
    },err=>{
      this.loading = false;
      this.toastService.errorMessage(err.error.message);
      this.findAllCourt();
    });
  }
}

