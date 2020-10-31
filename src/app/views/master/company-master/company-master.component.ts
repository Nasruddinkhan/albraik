import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CompanyMaster } from '../../modal/company-master';
import { CompanyRegistrationService } from '../../service/company-registration.service';
import { DialogSubmissionService } from '../../service/dialog-submission.service';
import { AddCompanyDialogComponent } from './add-company-dialog/add-company-dialog.component';


@Component({
  selector: 'app-company-master',
  templateUrl: './company-master.component.html',
  styleUrls: ['./company-master.component.css']
})
export class CompanyMasterComponent {
  userId: string;
  companyId: string;
  loading = false;
  companyObj: CompanyMaster[];
  displayedColumns: string[] = ['logo', 'position', 'name', 'phoneNumber', 'faxNumber', 'address', 'delete'];
  checkedCompany = [];
  srNo:number = 0;
  editDisabled = true;
  addDisabled = false;
  firstCheckedCompany: Event;
  subscription: Subscription;

  constructor(private fb: FormBuilder,
              private compService: CompanyRegistrationService,
              private dialog: MatDialog,
              private dialogSubmissionService: DialogSubmissionService) {}

  ngOnInit() {
    this.userId  = sessionStorage.getItem("userId");
    this.companyId =  sessionStorage.getItem("companyId");
    this.onloadData();
    this.subscription = this.dialogSubmissionService.getDialogSubmitted().subscribe(dialogSubmitted => {
      if (dialogSubmitted) {
        this.onloadData();
        this.checkedCompany = [];
        this.handleEditButton();
        this.handleAddButton();
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onloadData() {
    this.loading = true;
    this.compService.getCompany(this.companyId).subscribe((res) => {
      this.loading = false;
      let temp: CompanyMaster[] = [];
      temp.push(res);
      console.log(res);
      this.companyObj = temp;
      this.srNo = 0;
      this.companyObj.forEach(company => {
        company['srNo'] = ++this.srNo;
      })
    }, err=>{
      this.loading = false;
      console.log(err.error.message);
    });
  }

  onCheckboxChange(e, jobId: number) {
    if (e.checked) {
      this.checkedCompany.push({ id: jobId, checkbox: e });
    } else {
      for (let i = 0; i < this.checkedCompany.length; ++i) {
        if (this.checkedCompany[i]['id'] === jobId) {
          this.checkedCompany.splice(i, 1);
          break;
        }
      }
    }
    this.handleEditButton();
    this.handleAddButton();
    if (this.checkedCompany.length === 1) {
      this.firstCheckedCompany = this.checkedCompany[0]['checkbox'];
    }
  }

  handleEditButton() {
    if (this.checkedCompany.length === 1) {
      this.editDisabled = false;
    } else {
      this.editDisabled = true;
    }
  }

  handleAddButton() {
    if (this.checkedCompany.length === 0) {
      this.addDisabled = false;
    } else {
      this.addDisabled = true;
    }
  }

  openAddDialog() {
    this.dialog.open(AddCompanyDialogComponent);
  }

}
