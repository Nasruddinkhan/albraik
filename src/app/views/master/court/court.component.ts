import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CourtModel } from '../../modal/court';
import { CourtMaster } from '../../modal/court-master';
import { CourtService } from '../../service/court.service';
import { DialogSubmissionService } from '../../service/dialog-submission.service';
import { JobService } from '../../service/job.service';
import { checkNullEmpty } from '../../service/must-match.service';
import { SnackbarService } from '../../service/snackbar.service';
import { ToasterMsgService } from '../../service/toaster-msg.service';
import { EditJobtitleDialogComponent } from '../jobtitle-master/edit-jobtitle-dialog/edit-jobtitle-dialog.component';
import { AddCourtDialogComponent } from './add-court-dialog/add-court-dialog.component';
import { EditCourtDialogComponent } from './edit-court-dialog/edit-court-dialog.component';

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
              private courtService: CourtService,
              private dialog: MatDialog,
              private dialogSubmissionService: DialogSubmissionService,
              private snackbarService: SnackbarService) { }
  userID: string;
  companyId : string;
  courts:CourtModel[];
  pageNo = 1;
  bigTotalItems: number;
  numPages: number = 0;
  maxSize: number = 5;
  displayedColumns: string[] = ['position', 'name', 'delete'];
  srNo: number = 0;
  checkedCourts = [];
  subscription: Subscription;
  deleteDisabled = true;
  editDisabled = true;
  addDisabled = false;
  firstCheckedCourt: Event;

  ngOnInit() {
    this.userID  = sessionStorage.getItem("userId");
    this.companyId =  sessionStorage.getItem("companyId");
    if(checkNullEmpty( this.companyId )){
      this.router.navigate([`/master/company`]);
    }
    this.findAllCourt();
    this.addCourtForm = this.fb.group({
      court_names: this.fb.array([this.fb.group({addCourt:''})])
    });
    this.subscription = this.dialogSubmissionService.getDialogSubmitted().subscribe(dialogSubmitted => {
      if (dialogSubmitted) {
        this.findAllCourt();
        this.checkedCourts = [];
        this.handleEditButton();
        this.handleDeleteButton();
        this.handleAddButton();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  findAllCourt(){
    this.loading = true;
    this.courtService.findAllCourt().subscribe((res:CourtModel[])=>{
      this.courts = res;
      // Appending srNo property to every court for displaying incremented sr no in the table
      this.srNo = 0;
      this.courts.forEach(court => {
        court['srNo'] = ++this.srNo;
      });
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

  onCheckboxChange(e, jobId: number) {
    if (e.checked) {
      this.checkedCourts.push({ id: jobId, checkbox: e });
    } else {
      for (let i = 0; i < this.checkedCourts.length; ++i) {
        if (this.checkedCourts[i]['id'] === jobId) {
          this.checkedCourts.splice(i, 1);
          break;
        }
      }
    }
    this.handleDeleteButton();
    this.handleEditButton();
    this.handleAddButton();
    if (this.checkedCourts.length === 1) {
      this.firstCheckedCourt = this.checkedCourts[0]['checkbox'];
    }
  }

  handleEditButton() {
    if (this.checkedCourts.length === 1) {
      this.editDisabled = false;
    } else {
      this.editDisabled = true;
    }
  }

  handleDeleteButton() {
    if (this.checkedCourts.length > 0) {
      this.deleteDisabled = false;
    } else {
      this.deleteDisabled = true;
    }
  }

  handleAddButton() {
    if (this.checkedCourts.length === 0) {
      this.addDisabled = false;
    } else {
      this.addDisabled = true;
    }
  }

  deleteCourt() {
    let checkedCourtsString = this.checkedCourts.map(checkedJob => {
      return checkedJob['id'].toString();
    });
    this.courtService.deleteCourt(checkedCourtsString).subscribe(res => {
      this.findAllCourt();
      this.snackbarService.success("."+this.checkedCourts.length+" court(s) deleted successfully.");
      this.checkedCourts = [];
      this.handleDeleteButton();
      this.handleEditButton();
      this.handleAddButton();
    }, err=> {
      this.snackbarService.failure("!!!Something went wrong.");
    });
  }

  openAddDialog() {
    this.dialog.open(AddCourtDialogComponent);
  }

  openEditDialog() {
    let oldCourtName: string;
    for (let i = 0; i < this.courts.length; ++i) {
      if (this.courts[i]['id'] === this.checkedCourts[0]['id']) {
        oldCourtName = this.courts[i]['name'];
      }
    }
    this.dialogSubmissionService.setData({ "oldCourtName": oldCourtName, "id": this.checkedCourts[0]['id']});
    this.handleDeleteButton();
    this.handleEditButton();
    this.handleAddButton();
    this.dialog.open(EditCourtDialogComponent);
  }

}

