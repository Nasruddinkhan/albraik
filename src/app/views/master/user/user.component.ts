import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../service/role.service';
import { RoleModel } from '../../modal/role';
import { ToasterMsgService } from '../../service/toaster-msg.service';
import { DepartmentModel } from '../../modal/department';
import { DeptService } from '../../service/dept.service';
import { JobService } from '../../service/job.service';
import { JobTitleModel } from '../../modal/jobtitle';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { UserMaster } from '../../modal/user-master';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  todayNumber: number = Date.now();
  locale = 'ar';
  locales = listLocales();
  userID: string;
  companyId : string;
  roles: RoleModel[];
  dept:DepartmentModel[];
  jobs:JobTitleModel[];
  users : UserMaster[];
  loading = false;
  isSubmitted = false;
  userForm:FormGroup;
  constructor(private fb: FormBuilder,
              private roleService: RoleService,
              private deptService: DeptService,
              private jobService : JobService,
              private localeService: BsLocaleService,
              private userService: UserService,
              private toastService: ToasterMsgService) { 
             this.localeService.use(this.locale);
              }
    
  ngOnInit() {

    this.userID  = sessionStorage.getItem("userId");
    this.companyId =  sessionStorage.getItem("companyId");
    this.findAllRoles();
    this.findAllDepartments();
    this.findAllJobs();
    this.findAllUsers();
//this.applyLocale();
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      jobTitleId:['',  [Validators.required]],
      roleId:['',  [Validators.required]],
      departmentId:['',  [Validators.required]],
      phoneNumber: ['', [Validators.required,  Validators.minLength(12),Validators.pattern("^[\u0621-\u064A\u0660-\u0669 ]+$") ]],
      joiningDate:['',  [Validators.required]],
      companyId:[''],
      role:['USER'],
      isActive:[true],
      isFtl:[true] ,
      createdBy:[] 
    });

    this.userForm.get('companyId').setValue(this.companyId);
    this.userForm.get('createdBy').setValue(this.userID);


  }

  get f() { return this.userForm.controls; }

  findAllDepartments(){
    this.loading = true;
    this.deptService.findAlldepartments(this.userID).subscribe((res: DepartmentModel[])=>{
      this.dept = res;
      this.loading = false;
    }, err=>{
      this.toastService.errorMessage(err.error.message);
      this.loading = false;
    });
  }

  findAllRoles(){
    this.loading = true;
    this.roleService.findAllRoles(this.userID).subscribe((res: RoleModel[])=>{
      this.roles = res;
      this.loading = false;
    }, err=>{
      this.toastService.errorMessage(err.error.message);
      this.loading = false;
    })

  }

  findAllJobs(){
    this.loading = false
    this.jobService.findAllJobTitles( this.userID).subscribe((res:JobTitleModel[])=>{
      this.jobs = res;
      this.loading = false;
    },err=>{
      this.toastService.errorMessage(err.error.message);
    });
  }
  findAllUsers(){
    this.loading = false
    this.userService.findAllUsers( ).subscribe((res:UserMaster[])=>{
      this.users = res;
      this.loading = false;
    },err=>{
     this.loading = false;
     this.users = [];
    });
  }
  registerUser(){
    this.isSubmitted = true;
    if (this.userForm.invalid) {
       return;
     }
     this.userService.createUsers(JSON.stringify( this.userForm.value)).subscribe((res:UserMaster)=>{
      this.toastService.susessMessage('User add successfully');
      this.loading = false;
      this.findAllUsers();
     }, err=>{
      this.toastService.errorMessage(err.error.message);
      this.loading = false;
      this.findAllUsers();

     }
     ) 
  }
}
