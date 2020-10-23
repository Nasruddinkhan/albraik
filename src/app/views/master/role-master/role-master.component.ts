import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { RoleMaster  } from '../../modal/role-master'
import { ToasterMsgService } from '../../service/toaster-msg.service';
import { RoleService } from '../../service/role.service';
import { RoleModel } from '../../modal/role';
import { checkNullEmpty } from '../../service/must-match.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddRoleDialogComponent } from './add-role-dialog/add-role-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogSubmissionService } from '../../service/dialog-submission.service';
@Component({
  selector: 'app-role-master',
  templateUrl: './role-master.component.html',
  styleUrls: ['./role-master.component.css']
})
export class RoleMasterComponent implements OnInit, OnDestroy {
  loading = false;
  roleForm: FormGroup;
  roleMst: RoleMaster;
  name: Array<String>;
  constructor(private fb: FormBuilder,
              private toastService: ToasterMsgService,
              private router : Router,
              private roleService: RoleService,
              private dialog: MatDialog,
              private dialogSubmitted: DialogSubmissionService) { }
  userID: string;
  companyId : string;
  roles:RoleModel[];
  pageNo = 1;
  bigTotalItems: number;
  numPages: number = 0;
  maxSize: number = 5;
  displayedColumns: string[] = ['position', 'name', 'privilages', 'delete'];
  srNo: number = 0;
  checkedRole = [];
  deleteDisabled = true;
  editDisabled = true;
  firstcheckedRole: Event;
  subscription: Subscription;

  ngOnInit() {
    this.userID  = sessionStorage.getItem("userId");
    this.companyId =  sessionStorage.getItem("companyId");
    if(checkNullEmpty( this.companyId )){
      this.router.navigate([`/master/company`]);
    }
    this.findAllRoles();
    this.roleForm = this.fb.group({
      role_names: this.fb.array([this.fb.group({role:''})])
    });
    this.subscription = this.dialogSubmitted.getDialogSubmitted().subscribe(dialogSubmitted => {
      if (dialogSubmitted) {
        this.findAllRoles();
        this.checkedRole = [];
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  findAllRoles(){
    this.loading = true
    this.roleService.findAllRoles( this.userID).subscribe((res:RoleModel[])=>{
      this.roles = res;
      this.srNo = 0;
      this.roles.forEach(role => {
        role['srNo'] = ++this.srNo;
      })
      this.loading = false;
      this.bigTotalItems = res.length;
    },err=>{
      this.roles = [];
      this.loading = false;
    });
  }

  get roleNames() {
    return this.roleForm.get('role_names') as FormArray;
  }

  addRole() {
    this.roleNames.push(this.fb.group({role: this.roleNames.controls[0].value.role}));
  }

  deleteRole(index) {
    this.roleNames.removeAt(index);
  }

  displayAddRoleField() {
    let icons = document.getElementById("icons");
    icons.style.display = "none";
    let addRoleField = document.getElementById("addRoleField");
    addRoleField.style.display = "block";
  }

  displayIcons() {
    let addRoleField = document.getElementById("addRoleField");
    addRoleField.style.display = "none";
    let icons = document.getElementById("icons");
    icons.style.display = "block";
  }

  onSubmit(){
    this.roleNames.push(this.fb.group({role: this.roleNames.controls[0].value.role}));
    console.log(this.roleNames.controls[1].value.role);
    // console.log('jobtitle onSubmit');
    // this.name = new Array<String>();
    // this.roleForm.value['role_names'].map(item => {
    //   this.name.push(item.role);
    // });
    // this.roleMst = new RoleMaster(this.userID,  this.companyId, this.name);
    // this.loading = true;
    // this.roleService.createRole( this.roleMst).subscribe((res:RoleModel[])=>{
    //   this.loading = false;
    //   this.roleForm.reset();
    //   this.toastService.susessMessage('role created successfully')
    //   this.findAllRoles();
    // },err=>{
    //   this.loading = false;
    //   this.toastService.errorMessage(err.error.message);
    //   this.findAllRoles();
    // });
  }

  onCheckboxChange(e, jobId: number) {
    if (e.checked) {
      this.checkedRole.push({ id: jobId, checkbox: e });
    } else {
      for (let i = 0; i < this.checkedRole.length; ++i) {
        if (this.checkedRole[i]['id'] === jobId) {
          this.checkedRole.splice(i, 1);
          break;
        }
      }
    }
    this.handleDeleteButton();
    this.handleEditButton();
    if (this.checkedRole.length === 1) {
      this.firstcheckedRole = this.checkedRole[0]['checkbox'];
    }
  }

  handleEditButton() {
    if (this.checkedRole.length === 1) {
      this.editDisabled = false;
    } else {
      this.editDisabled = true;
    }
  }

  handleDeleteButton() {
    if (this.checkedRole.length > 0) {
      this.deleteDisabled = false;
    } else {
      this.deleteDisabled = true;
    }
  }

  openAddDialog() {
    this.dialog.open(AddRoleDialogComponent);
  }

}
