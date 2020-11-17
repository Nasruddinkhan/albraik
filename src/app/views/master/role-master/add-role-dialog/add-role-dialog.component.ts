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
  roleList: RoleModel[];
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  privileges: PrivilegeModel[];
  largePrivilege: PrivilegeModel;

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
    this.roleService.findAllRoles(this.companyId).subscribe((roles: RoleModel[]) => {
      this.roleList = roles;
    });
    this.addRoleForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  get name() {
    return this.addRoleForm.get('name').value;
  }

  onCheckboxChange(e, privilegeId: string) {
    if (e.checked) {
      this.checkedPrivilegesList.push(privilegeId);
    } else {
      this.checkedPrivilegesList.splice(this.checkedPrivilegesList.indexOf(privilegeId), 1);
    }
  }

  onSubmit() {
    if (!this.doesExist(this.name)) {
      this.roleService.createRole(this.name, this.checkedPrivilegesList).subscribe((res: RoleModel[]) => {
        this.snackbarService.success(".Role created successfully");
        this.dialogSubmitted.setDialogSubmitted(true);
      }, err => {
        this.snackbarService.failure("!!!Something went wrong");
      });
    } else {
      this.snackbarService.failure(".Role Name already exists");
    }
  }

  doesExist(roleName: string) {
    for (let i = 0; i < this.roleList.length; ++i) {
      if (this.roleList[i].name === roleName) {
        return true;
      }
    }
    return false;
  }

}
