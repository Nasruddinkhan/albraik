import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentModel } from '../../../modal/department';
import { JobTitleModel } from '../../../modal/jobtitle';
import { RoleModel } from '../../../modal/role';
import { DeptService } from '../../../service/dept.service';
import { JobService } from '../../../service/job.service';
import { RoleService } from '../../../service/role.service';
import { SnackbarService } from '../../../service/snackbar.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { UserService } from '../../../service/user.service';
import { UserMaster } from '../../../modal/user-master';
import { DialogSubmissionService } from '../../../service/dialog-submission.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {
  userForm: FormGroup;
  locale = 'ar';
  userId: string;
  companyId: string;
  roles = [];
  depts = [];
  jobs = [];
  constructor(private fb: FormBuilder,
              private localeService: BsLocaleService,
              private roleService: RoleService,
              private deptService: DeptService,
              private jobService: JobService,
              private userService: UserService,
              private dialogSubmissionService: DialogSubmissionService,
              private snackService: SnackbarService) {
                this.localeService.use(this.locale);
              }

  ngOnInit(): void {
    this.dialogSubmissionService.setDialogSubmitted(false);
    this.userId = sessionStorage.getItem("userId");
    this.companyId = sessionStorage.getItem("companyId");
    this.userForm = this.fb.group({
      email: ['', [ Validators.required, Validators.email ]],
      roleId: ['', Validators.required],
      departmentId: ['', Validators.required],
      jobTitleId: ['', Validators.required],
      phoneNumber: ['', [ Validators.required, Validators.minLength(12),Validators.pattern("^[\u0621-\u064A\u0660-\u0669 ]+$") ]],
      joiningDate: ['', Validators.required],
      isActive: [true],
      isFtl: [true],
      companyId: [this.companyId],
      createdBy: [this.userId]
    });
    this.findAllRoles();
    this.findAllDepts();
    this.findAllJobs();
  }

  findAllRoles(){
    this.roleService.findAllRoles(this.userId).subscribe((res: RoleModel[]) => {
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

  get email() {
    return this.userForm.get("email");
  }

  get roleId() {
    return this.userForm.get("roleId");
  }

  get departmentId() {
    return this.userForm.get("departmentId");
  }

  get jobTitleId() {
    return this.userForm.get("jobTitleId");
  }

  get phoneNumber() {
    return this.userForm.get("phoneNumber");
  }

  get joiningDate() {
    return this.userForm.get("joiningDate");
  }

  onSubmit() {
    console.log(this.userForm.value);
    if (this.userForm.invalid) {
      return;
    }
    this.userService.createUsers(JSON.stringify(this.userForm.value)).subscribe((res:UserMaster) => {
      this.snackService.success(".User added successfully");
      this.dialogSubmissionService.setDialogSubmitted(true);
    }, err => {
      this.snackService.failure("!!!Something went wrong");
    });
  }

}
