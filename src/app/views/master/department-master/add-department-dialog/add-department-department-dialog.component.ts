import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { DepartmentMaster } from '../../../modal/department-master';
import { DeptService } from '../../../service/dept.service';
import { DialogSubmissionService } from '../../../service/dialog-submission.service';
import { SnackbarService } from '../../../service/snackbar.service';

@Component({
  selector: 'app-department-add-dialog',
  templateUrl: './add-department-dialog.component.html',
  styleUrls: ['./add-department-dialog.component.css']
})
export class AddDepartmentDialogComponent implements OnInit {
  deptMstr: DepartmentMaster;
  userId: string;
  companyId: string;
  removable = true;
  addOnBlur = true;
  submitDisabled = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  departments = [];

  constructor(private dialogSubmitted: DialogSubmissionService,
              private deptService: DeptService,
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
      this.departments.push({name: value.trim()});
    }
    if (input) {
      input.value = '';
    }
  }

  remove(dept) {
    let index = this.departments.indexOf(dept);
    if (index >= 0) {
      this.departments.splice(index, 1);
    }
  }

  handleSubmitButton() {
    if (document.getElementById("addDepartmentField")['value']) {
      this.submitDisabled = false;
    } else {
      this.submitDisabled = true;
    }
  }

  onSubmit() {
    let deptNames = new Array<String>();
    this.departments.forEach(dept => {
      deptNames.push(dept.name);
    });
    this.deptMstr = new DepartmentMaster(this.userId, this.companyId, deptNames);
    this.deptService.createDepartment(this.deptMstr).subscribe(res => {
      this.snackbarService.success(".Department added successfully");
      this.dialogSubmitted.setDialogSubmitted(true);
    }, err => {
      this.snackbarService.failure("!!!Something went wrong.");
    });
  }

}
