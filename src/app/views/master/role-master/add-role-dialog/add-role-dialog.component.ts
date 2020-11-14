import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { PrivilegeModel } from '../../../modal/Privilege-model';
import { RoleModel } from '../../../modal/role';
import { RoleMaster } from '../../../modal/role-master';
import { DeptService } from '../../../service/dept.service';
import { DialogSubmissionService } from '../../../service/dialog-submission.service';
import { RoleService } from '../../../service/role.service';
import { SnackbarService } from '../../../service/snackbar.service';

@Component({
  selector: 'app-add-role-dialog',
  templateUrl: './add-role-dialog.component.html',
  styleUrls: ['./add-role-dialog.component.css']
})
export class AddRoleDialogComponent implements OnInit {
  addRoleForm: FormGroup;
  userId: string;
  companyId: string;
  roles = [];
  checkedPrivilegesList: string[] = [];
  roleMst: RoleMaster;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  privileges: PrivilegeModel[];
  largePrivilege: PrivilegeModel;
  // privilages1: string[] = [  
  //   "Add & Edit & Close Projects",
  //   "Assign a Task to a User",
  //   "Respond to given Tasks",
  //   "Viewing all Projects",
  //   "Add & Edit & Disable Users",
  //   "Viewing their own Tasks",
  //   "Add new Contacts",
  //   "Edit or Disable Contacts"
  // ];
  // privilages2: string[] = [
  //   "Add & Edit & Remove Department",
  //   "Add & Edit & Remove Job Title",
  //   "Add & Edit & Remove Role",
  //   "Add & Edit & Remove Court",
  //   "Add & Edit Company Information",
  //   "Login & Request new password",
  //   "Assign a Lawyer to attend a court appointment",
  //   "Edit & Delete court appointment"
  // ];

  constructor(private dialogSubmitted: DialogSubmissionService,
              private roleService: RoleService,
              private snackbarService: SnackbarService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem("userId");
    this.companyId = sessionStorage.getItem("companyId");
    this.dialogSubmitted.setDialogSubmitted(false);
    this.roleService.getAllPrivilages().subscribe((res: PrivilegeModel[]) => {
      this.privileges = res;
      let max = 0;
      let pos = 0;
      for (let i = 0; i < this.privileges.length; ++i) {
        if (max < this.privileges[i].name.length) {
          this.largePrivilege = this.privileges[i];
          max = this.privileges[i].name.length;
          pos = i;
        }
      }
      this.privileges.splice(pos, 1);
    });
    this.addRoleForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  get name() {
    return this.addRoleForm.get('name').value;
  }

  // add(event: MatChipInputEvent): void {
  //   let input = event.input;
  //   let value = event.value;
  //   console.log(value);
  //   if ((value || '').trim()) {
  //     this.roles.push({name: value.trim()});
  //   }
  //   if (input) {
  //     input.value = '';
  //   }
  // }

  // remove(role) {
  //   let index = this.roles.indexOf(role);
  //   if (index >= 0) {
  //     this.roles.splice(index, 1);
  //   }
  // }

  onCheckboxChange(e, privilageId: string) {
    if (e.checked) {
      this.checkedPrivilegesList.push(privilageId);
    } else {
      this.checkedPrivilegesList.splice(this.checkedPrivilegesList.indexOf(privilageId), 1);
    }
  }

  onSubmit() {
    // this.roleMst = new RoleMaster(this.userId, this.companyId, roleNames);
    this.roleService.createRole(this.name, this.checkedPrivilegesList).subscribe((res: RoleModel[]) => {
      this.snackbarService.success(".Role created successfully");
      this.dialogSubmitted.setDialogSubmitted(true);
    }, err => {
      this.snackbarService.failure("!!!Something went wrong");
    });
  }

}
