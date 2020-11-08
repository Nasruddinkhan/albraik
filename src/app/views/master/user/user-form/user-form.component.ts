import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { listLocales } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { DepartmentModel } from '../../../modal/department';
import { JobTitleModel } from '../../../modal/jobtitle';
import { RoleModel } from '../../../modal/role';
import { UserMaster } from '../../../modal/user-master';
import { UserModel } from '../../../modal/user-model';
import { DeptService } from '../../../service/dept.service';
import { JobService } from '../../../service/job.service';
import { checkNullEmpty } from '../../../service/must-match.service';
import { RoleService } from '../../../service/role.service';
import { ToasterMsgService } from '../../../service/toaster-msg.service';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  todayNumber: number = Date.now();
  locale = 'ar';
  locales = listLocales();
  userID: string;
  companyId : string;
  roles: RoleModel[];
  dept:DepartmentModel[];
  jobs:JobTitleModel[];
  loading = false;
  isSubmitted = false;
  action = 'Add User';
  userForm:FormGroup;
  isUpdate:boolean = false;
  constructor(private fb: FormBuilder,
              private activeRoute: ActivatedRoute,
              private roleService: RoleService,
              private deptService: DeptService,
              private jobService : JobService,
              private localeService: BsLocaleService,
              private userService: UserService,
              private toastService: ToasterMsgService,
              private datepipe: DatePipe,
              private router: Router
              ) { 
             this.localeService.use(this.locale);
              }
  ngOnInit() {

    this.userID  = sessionStorage.getItem("userId");
    this.companyId =  sessionStorage.getItem("companyId");
    if(checkNullEmpty( this.companyId )){
      this.router.navigate([`/master/company`]);
    }
    this.findAllRoles();
    this.findAllDepartments();
    this.findAllJobs();
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      jobTitleId:['',  [Validators.required]],
      roleId: ['',  [Validators.required]],
      departmentId:['',  [Validators.required]],
      phoneNumber: ['', [Validators.required,  Validators.minLength(12)]], //Validators.pattern("^[\u0621-\u064A\u0660-\u0669 ]+$") 
      joiningDate: ['',  [Validators.required]],
      companyId: [''],
      role: ['USER'],
      isActive: [true],
      isFtl: [true] ,
      createdBy: [],
      userId:[null]
    });

    this.userForm.get('companyId').setValue(this.companyId);
    this.userForm.get('createdBy').setValue(this.userID);
    this.activeRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('userId')) {
        return;
      }
      this.isUpdate = true;
     this.action = 'Edit User';
     const userid = paramMap.get('userId') ;
     this.editUserDetails(userid);
    });
  }
  editUserDetails(userid: string){

    this.userService.getUserDetails(userid).subscribe((res:UserModel)=>{
      this.userForm.setValue({
        email: res.email,
        jobTitleId: res.jobId,
        roleId: res.roleId,
        departmentId: res.deptId,
        phoneNumber: res.phoneNumber,
        joiningDate: this.datepipe.transform(res.joiningDate, 'yyyy-MM-dd') ,
        companyId: res.companyId,
        role : 'USER',
        isActive: true,
        isFtl: true ,
        createdBy: this.userID,
        userId: res.id
      });
    });
    /*;*/
  }
  get f() { return this.userForm.controls; }

  findAllDepartments(){
    this.loading = true;
    this.deptService.findAlldepartments(this.userID).subscribe((res: DepartmentModel[])=>{
      this.dept = res;
      this.loading = false;
    }, err=>{
      //this.toastService.errorMessage(err.error.message);
      this.loading = false;
    });
  }

  findAllRoles(){
    this.loading = true;
    this.roleService.findAllRoles(this.userID).subscribe((res: RoleModel[])=>{
      this.roles = res;
      this.loading = false;
    }, err=>{
     // this.toastService.errorMessage(err.error.message);
      this.loading = false;
    })

  }

  findAllJobs(){
    this.loading = false
    this.jobService.findAllJobTitles( this.userID).subscribe((res:JobTitleModel[])=>{
      this.jobs = res;
      this.loading = false;
    },err=>{
     // this.toastService.errorMessage(err.error.message);
    });
  }
 
  registerUser(){
    this.isSubmitted = true;
    if (this.userForm.invalid) {
       return;
     }
     this.userService.createUsers(JSON.stringify( this.userForm.value)).subscribe((res:UserMaster)=>{
       this.router.navigateByUrl(`/master/deleteuser`);
      this.toastService.susessMessage('User add successfully');
      this.loading = false;
     }, err=>{
      this.toastService.errorMessage(err.error.message);
      this.loading = false;
     }
     )
  }
  updateUser() {
    this.isSubmitted = true;
    if (this.userForm.invalid) {
       return;
     }

     this.userService.updateUserProfile(JSON.stringify( this.userForm.value)).subscribe((res:UserMaster)=>{
     this.router.navigate([`/master/user`]);
     this.toastService.susessMessage('User update successfully');
     this.loading = false;
    }, err=>{
     this.toastService.errorMessage(err.error.message);
     this.loading = false;
    }
    );
    }
}
