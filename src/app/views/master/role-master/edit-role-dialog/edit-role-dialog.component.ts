import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrivilegeModel } from '../../../modal/Privilege-model';
import { RoleModel } from '../../../modal/role';
import { DialogSubmissionService } from '../../../service/dialog-submission.service';
import { checkNullEmpty } from '../../../service/must-match.service';
import { RoleService } from '../../../service/role.service';
import { SnackbarService } from '../../../service/snackbar.service';

@Component({
  selector: 'app-edit-role-dialog',
  templateUrl: './edit-role-dialog.component.html',
  styleUrls: ['./edit-role-dialog.component.css']
})
export class EditRoleDialogComponent implements OnInit {
  oldRole: RoleModel;
  editRoleForm: FormGroup;
  privileges: PrivilegeModel[] = [];
  checkedPrivilegesList = [];
  largePrivilege: PrivilegeModel;

  constructor(private dialogSubmissionService: DialogSubmissionService,
              private fb: FormBuilder,
              private roleService: RoleService,
              private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.findAllPrivileges();
    this.dialogSubmissionService.getData().subscribe((oldRole: RoleModel) => {
      this.oldRole = oldRole;
      oldRole.privilegeList.forEach(privilege => {
        this.checkedPrivilegesList.push(privilege.id);
      });
    });
    this.editRoleForm = this.fb.group({
      name: [this.oldRole.name, Validators.required],
    });
  }

  findAllPrivileges() {
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
      console.log(this.largePrivilege);
      this.privileges.splice(pos, 1);
    });
  }

  checked(privilegeId) {
    for (let i = 0; i < this.checkedPrivilegesList.length; ++i) {
      if (privilegeId === this.checkedPrivilegesList[i]) {
        return true;
      }
    }
    return false;
  }

  get name() {
    return this.editRoleForm.get('name');
  }  

  onCheckboxChange(e, privilegeId) {
    if (e.checked) {
      this.checkedPrivilegesList.push(privilegeId);
    } else {
      this.checkedPrivilegesList.splice(this.checkedPrivilegesList.indexOf(privilegeId), 1);
    }
  }

  onSubmit() {
    this.roleService.updateRole(this.oldRole.id, this.name.value, this.checkedPrivilegesList).subscribe((res: RoleModel[]) => {
      this.dialogSubmissionService.setDialogSubmitted(true);
      this.snackbar.success(".Role updated successfully");
    }, err => {
      this.snackbar.failure("!!!Something went wrong");
    });
  }

}
