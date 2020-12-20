import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { DepartmentModel } from '../../../modal/department';
import { DepartmentMaster } from '../../../modal/department-master';
import { JobTitleModel } from '../../../modal/jobtitle';
import { JobMaster } from '../../../modal/jobtitle-master';
import { RoleModel } from '../../../modal/role';
import { RoleMaster } from '../../../modal/role-master';
import { UserMaster } from '../../../modal/user-master';
import { DeptService } from '../../../service/dept.service';
import { JobService } from '../../../service/job.service';
import { RoleService } from '../../../service/role.service';
import { SnackbarService } from '../../../service/snackbar.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {
  userEditForm: FormGroup;
  userId: string;
  companyId: string;
  locale = 'ar';
  jobs: JobTitleModel[];
  roles: RoleModel[];
  depts: DepartmentModel[];

  constructor(@Inject(MAT_DIALOG_DATA) public oldUser: UserMaster,
              private fb: FormBuilder,
              private roleService: RoleService,
              private deptService: DeptService,
              private jobService: JobService,
              private snackService: SnackbarService,
              private localeService: BsLocaleService) { 
                localeService.use(this.locale);
              }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    this.companyId = sessionStorage.getItem('companyId');
    this.findAllRoles();
    this.findAllDepts();
    this.findAllJobs();
    this.userEditForm = this.fb.group({
      email: [this.oldUser.email, Validators.required],
      joiningDate: [this.oldUser.joiningDate, Validators.required],
      phoneNumber: [this.oldUser.phoneNumber, [ Validators.required, Validators.minLength(12),Validators.pattern("^[\u0621-\u064A\u0660-\u0669 ]+$") ]],
      role: [this.oldUser.role ? this.oldUser.role.id : '', Validators.required],
      department: [this.oldUser.department ? this.oldUser.department.id : '', Validators.required],
      jobTitle: [this.oldUser.jobTitle ? this.oldUser.jobTitle.id : '', Validators.required]
    });
  }

  get email() {
    return this.userEditForm.get('email');
  }

  get joiningDate() {
    return this.userEditForm.get('joiningDate');
  }

  get phoneNumber() {
    return this.userEditForm.get('phoneNumber');
  }

  get role() {
    return this.userEditForm.get('role');
  }

  get department() {
    return this.userEditForm.get('department');
  }

  get jobTitle() {
    return this.userEditForm.get('jobTitle');
  }

  findAllRoles(){
    this.roleService.findAllRoles(this.companyId).subscribe((res: RoleModel[]) => {
      this.roles = res;
    }, err => {
      this.snackService.failure("Failed to load available roles." + err);
    });
  }

  findAllDepts(){
    this.deptService.findAlldepartments(this.userId).subscribe((res: DepartmentModel[]) => {
      this.depts = res;
    }, err => {
      this.snackService.failure("Failed to load available departments." + err);
    });
  }

  findAllJobs(){
    this.jobService.findAllJobTitles(this.userId).subscribe((res: JobTitleModel[]) => {
      this.jobs = res;
    }, err => {
      this.snackService.failure("Failed to load available jobs." + err);
    });
  }

  onSubmit() {
    console.log(this.userEditForm.value);
  }

}
