import { Component, OnInit ,  LOCALE_ID, Inject} from '@angular/core';
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
import { checkNullEmpty } from '../../service/must-match.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { DialogSubmissionService } from '../../service/dialog-submission.service';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';

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
  displayedColumns: string[] = ['position', 'name', 'joining_date', 'email', 'delete'];
  srNo: number = 0;
  checkedUser = [];
  deleteDisabled = true;
  editDisabled = true;
  addDisabled = false;
  firstCheckedUser: Event;
  subscription: Subscription;
  
  constructor(private fb: FormBuilder,
              private roleService: RoleService,
              private deptService: DeptService,
              private jobService : JobService,
              private localeService: BsLocaleService,
              private userService: UserService,
              private toastService: ToasterMsgService,
              private router: Router,
              private dialog: MatDialog,
              private dialogSubmitted: DialogSubmissionService
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

    this.subscription = this.dialogSubmitted.getDialogSubmitted().subscribe(dialogSubmitted => {
      if (dialogSubmitted) {
        this.findAllUsers();
        this.checkedUser = [];
        this.handleEditButton();
        this.handleDeleteButton();
        this.handleAddButton();
      }
    });
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
  findAllUsers(){
    this.loading = false
    this.userService.findAllUsers( ).subscribe((res:UserMaster[])=>{
      this.users = res;
      this.srNo = 0;
      this.users.forEach(dept => {
        dept['srNo'] = ++this.srNo;
      });
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

  onCheckboxChange(e, user: UserMaster) {
    if (e.checked) {
      this.checkedUser.push(user);
    } else {
      this.checkedUser = this.checkedUser.filter(ur => {
        return ur !== user;
      });
    }
    this.handleDeleteButton();
    this.handleEditButton();
    this.handleAddButton();
    if (this.checkedUser.length === 1) {
      this.firstCheckedUser = this.checkedUser[0]['checkbox'];
    }
  }

  handleEditButton() {
    if (this.checkedUser.length === 1) {
      this.editDisabled = false;
    } else {
      this.editDisabled = true;
    }
  }

  handleDeleteButton() {
    if (this.checkedUser.length > 0) {
      this.deleteDisabled = false;
    } else {
      this.deleteDisabled = true;
    }
  }

  handleAddButton() {
    if (this.checkedUser.length === 0) {
      this.addDisabled = false;
    } else {
      this.addDisabled = true;
    }
  }

  deleteUser() {
    
  }

  // deleteUser() {
  //   let checkedUserString = this.checkedDepartment.map(checkedDept => {
  //     return checkedDept['id'].toString();
  //   });
  //   console.log(typeof(checkedDeptsString[0]) +"\n"+ typeof(this.checkedDepartment[0]));
  //   this.deptService.deleteDept(checkedDeptsString).subscribe(res => {
  //     this.findAlldepartments();
  //     this.handleDeleteButton();
  //     this.snackService.success("."+this.checkedDepartment.length+" department(s) deleted successfully.");
  //   }, err=> {
  //     this.snackService.failure("!!!Something went wrong.");
  //   });
  // }

  openAddDialog() {
    this.dialog.open(AddUserDialogComponent);
  }

  openEditDialog() {
    let oldUser: UserMaster = this.checkedUser[0];
    this.dialogSubmitted.setData(oldUser);
    this.handleDeleteButton();
    this.handleEditButton();
    this.handleAddButton();
    this.dialog.open(EditUserDialogComponent);
  }

}
