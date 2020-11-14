import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DepartmentMaster } from '../../modal/department-master';
import { DeptService } from '../../service/dept.service';
import { DepartmentModel } from '../../modal/department';
import { ToasterMsgService } from '../../service/toaster-msg.service';
import { Router } from '@angular/router';
import { checkNullEmpty, checkUserRole } from '../../service/must-match.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDepartmentDialogComponent } from './add-department-dialog/add-department-department-dialog.component';
import { DialogSubmissionService } from '../../service/dialog-submission.service';
import { EditDepartmentDialogComponent } from './edit-department-dialog/edit-department-dialog.component';
import { Subscription } from 'rxjs';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-department-master',
  templateUrl: './department-master.component.html',
  styleUrls: ['./department-master.component.css']
})
export class DepartmentMasterComponent implements OnInit {
  loading = false;
  departmentForm: FormGroup;
  name: Array<String>;
  departments: DepartmentMaster;
  userID: string;
  companyId: string;
  depts: DepartmentModel[];
  displayedColumns: string[] = ['position', 'name', 'delete'];
  checkedDepartment = [];
  srNo:number = 0;
  deleteDisabled = true;
  editDisabled = true;
  addDisabled = false;
  firstCheckedDepartment: Event;
  subscription: Subscription;
  constructor(private fb: FormBuilder,
    private router: Router,
    private toastService: ToasterMsgService,
    private deptService: DeptService,
    private dialog: MatDialog,
    private dialogSubmissionService: DialogSubmissionService,
    private snackService: SnackbarService) { }
  submitted = false;
  ngOnInit() {
    // let role = sessionStorage.getItem('role')

    // if (!checkUserRole(role)) {
    //   this.router.navigate([`/master/unathurise`]);
    // }
    this.userID = sessionStorage.getItem("userId");
    this.companyId = sessionStorage.getItem("companyId");
    if (checkNullEmpty(this.companyId)) {
      this.router.navigate([`/master/company`]);
    }
    this.findAlldepartments();
    this.departmentForm = this.fb.group({
      department_names: this.fb.array([this.fb.group({ departments: '' },[Validators.required])])
    })
    this.subscription = this.dialogSubmissionService.getDialogSubmitted().subscribe(dialogSubmitted => {
      if (dialogSubmitted) {
        this.findAlldepartments();
        this.checkedDepartment = [];
        this.handleEditButton();
        this.handleDeleteButton();
        this.handleAddButton();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get departmentNames() {
    return this.departmentForm.get('department_names') as FormArray;
  }
  getValidity(i) {
    return (<FormArray>this.departmentForm.get('department_names')).controls[i].invalid;
  }
  addDeparment() {
    this.submitted = true;
    this.departmentNames.push(this.fb.group({ departments: '' }));
  }

  // deleteDepartment(index) {
  //   this.departmentNames.removeAt(index);
  // }

  onCheckboxChange(e, jobId: number) {
    if (e.checked) {
      this.checkedDepartment.push({ id: jobId, checkbox: e });
    } else {
      for (let i = 0; i < this.checkedDepartment.length; ++i) {
        if (this.checkedDepartment[i]['id'] === jobId) {
          this.checkedDepartment.splice(i, 1);
          break;
        }
      }
    }
    this.handleDeleteButton();
    this.handleEditButton();
    this.handleAddButton();
    if (this.checkedDepartment.length === 1) {
      this.firstCheckedDepartment = this.checkedDepartment[0]['checkbox'];
    }
  }

  handleEditButton() {
    if (this.checkedDepartment.length === 1) {
      this.editDisabled = false;
    } else {
      this.editDisabled = true;
    }
  }

  handleDeleteButton() {
    if (this.checkedDepartment.length > 0) {
      this.deleteDisabled = false;
    } else {
      this.deleteDisabled = true;
    }
  }

  handleAddButton() {
    if (this.checkedDepartment.length === 0) {
      this.addDisabled = false;
    } else {
      this.addDisabled = true;
    }
  }

  deleteDept() {
    if (this.departmentNames.length > 1)
      this.departmentNames.removeAt(this.departmentNames.length - 1);
  }
  findAlldepartments() {
    this.loading = true;
    this.deptService.findAlldepartments(this.userID).subscribe((res: DepartmentModel[]) => {
      this.depts = res;
      this.srNo = 0;
      this.depts.forEach(dept => {
        dept['srNo'] = ++this.srNo;
      });
      this.loading = false;
    }, err => {
      this.depts = [];
      this.loading = false;
    });
  }

  // onSubmit() {
  //   this.name = new Array<String>();
  //   this.departmentForm.value['department_names'].map(item => {
  //     this.name.push(item.departments);
  //   });
  //   this.departments = new DepartmentMaster(this.userID, this.companyId, this.name);
  //   this.loading = true;
  //   this.deptService.createDepartment(this.departments).subscribe((res: DepartmentModel[]) => {
  //     this.loading = false;
  //     this.departmentForm.reset();
  //     this.toastService.susessMessage('department created successfully')
  //     this.findAlldepartments();
  //   }, err => {
  //     this.loading = false;
  //     this.toastService.errorMessage(err.error.message);
  //     this.findAlldepartments();
  //   });
  // }

 async isExsitDepartment(name : string){ 
   if(name.length >0){
    this.deptService.isExsitDepartment(this.userID, this.companyId, name).then((res:DepartmentModel)=>{
    },err=>{
      this.toastService.errorMessage(err.error.message);
    })
  }
  }

  deleteDepartment() {
    let checkedDeptsString = this.checkedDepartment.map(checkedDept => {
      return checkedDept['id'].toString();
    });
    this.deptService.deleteDept(checkedDeptsString).subscribe(res => {
      this.findAlldepartments();
      this.snackService.success("." + this.checkedDepartment.length + "Department(s) deleted successfully");
      this.checkedDepartment = [];
      this.handleDeleteButton();
      this.handleEditButton();
      this.handleAddButton();
    }, err=> {
      this.snackService.failure("!!!Something went wrong.");
    });
  }

  openAddDialog() {
    this.dialog.open(AddDepartmentDialogComponent);
  }

  openEditDialog() {
    let oldDeptName: string;
    for (let i = 0; i < this.depts.length; ++i) {
      if (this.depts[i]['id'] === this.checkedDepartment[0]['id']) {
        oldDeptName = this.depts[i]['name'];
      }
    }
    this.dialogSubmissionService.setData({ "oldDeptName": oldDeptName, "id": this.checkedDepartment[0]['id']});
    this.handleDeleteButton();
    this.handleEditButton();
    this.handleAddButton();
    this.dialog.open(EditDepartmentDialogComponent);
  }

}
