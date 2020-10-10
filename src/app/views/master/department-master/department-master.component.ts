import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DepartmentMaster } from '../../modal/department-master';
import { DeptService } from '../../service/dept.service';
import { DepartmentModel } from '../../modal/department';
import { ToasterMsgService } from '../../service/toaster-msg.service';
import { Router } from '@angular/router';
import { checkNullEmpty, checkUserRole } from '../../service/must-match.service';

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
  constructor(private fb: FormBuilder,
    private router: Router,
    private toastService: ToasterMsgService,
    private deptService: DeptService) { }
  submitted = false;
  ngOnInit() {
    let role = sessionStorage.getItem('role')

    if (!checkUserRole(role)) {
      this.router.navigate([`/master/unathurise`]);
    }
    this.userID = sessionStorage.getItem("userId");
    this.companyId = sessionStorage.getItem("companyId");
    console.log(this.companyId);
    if (checkNullEmpty(this.companyId)) {
      this.router.navigate([`/master/company`]);
    }
    this.findAlldepartments();
    this.departmentForm = this.fb.group({
      department_names: this.fb.array([this.fb.group({ departments: '' },[Validators.required])])
    })
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

  deleteDepartment(index) {
    this.departmentNames.removeAt(index);
  }
  deleteDept() {
    if (this.departmentNames.length > 1)
      this.departmentNames.removeAt(this.departmentNames.length - 1);
  }
  findAlldepartments() {
    this.loading = true;
    this.deptService.findAlldepartments(this.userID).subscribe((res: DepartmentModel[]) => {
      this.depts = res;
      this.loading = false;
    }, err => {
      this.depts = [];
      this.loading = false;
    });
  }

  onSubmit() {
    this.name = new Array<String>();
    this.departmentForm.value['department_names'].map(item => {
      this.name.push(item.departments);
    });
    this.departments = new DepartmentMaster(this.userID, this.companyId, this.name);
    this.loading = true;
    this.deptService.createDepartment(this.departments).subscribe((res: DepartmentModel[]) => {
      this.loading = false;
      this.departmentForm.reset();
      this.toastService.susessMessage('department created successfully')
      this.findAlldepartments();
    }, err => {
      this.loading = false;
      this.toastService.errorMessage(err.error.message);
      this.findAlldepartments();
    });
  }

 async isExsitDepartment(name : string){ 
   if(name.length >0){
    this.deptService.isExsitDepartment(this.userID, this.companyId, name).then((res:DepartmentModel)=>{
    },err=>{
      this.toastService.errorMessage(err.error.message);
    })
  }
  }

}
