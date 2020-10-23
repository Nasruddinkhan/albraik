import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
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
  userId: string;
  companyId: string;
  roles = [];
  checkedPrivilages: string[] = [];
  roleMst: RoleMaster;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  privilages1: string[] = [  
    "Add & Edit & Close Projects",
    "Assign a Task to a User",
    "Respond to given Tasks",
    "Viewing all Projects",
    "Add & Edit & Disable Users",
    "Viewing their own Tasks",
    "Add new Contacts",
    "Edit or Disable Contacts"
  ];
  privilages2: string[] = [
    "Add & Edit & Remove Department",
    "Add & Edit & Remove Job Title",
    "Add & Edit & Remove Role",
    "Add & Edit & Remove Court",
    "Add & Edit Company Information",
    "Login & Request new password",
    "Assign a Lawyer to attend a court appointment",
    "Edit & Delete court appointment"
  ];

  constructor(private dialogSubmitted: DialogSubmissionService,
              private roleService: RoleService,
              private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem("userId");
    this.companyId = sessionStorage.getItem("companyId");
    this.dialogSubmitted.setDialogSubmitted(false);
  }

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;
    if ((value || '').trim()) {
      this.roles.push({name: value.trim()});
    }
    if (input) {
      input.value = '';
    }
  }

  remove(role) {
    let index = this.roles.indexOf(role);
    if (index >= 0) {
      this.roles.splice(index, 1);
    }
  }

  onCheckboxChange(e, privilage: string) {
    if (e.checked) {
      this.checkedPrivilages.push(privilage);
    } else {
      this.checkedPrivilages.splice(this.checkedPrivilages.indexOf(privilage), 1);
    }
  }

  onSubmit() {
    let roleNames = new Array<String>();
    this.roles.forEach(role => {
      roleNames.push(role.name);
    })
    this.roleMst = new RoleMaster(this.userId, this.companyId, roleNames);
    this.roleService.createRole(this.roleMst).subscribe((res: RoleModel[]) => {
      this.snackbarService.success(".Role created successfully");
      this.dialogSubmitted.setDialogSubmitted(true);
    }, err => {
      this.snackbarService.failure("!!!Something went wrong");
    });
  }

}
