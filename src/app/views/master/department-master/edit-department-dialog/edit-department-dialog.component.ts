import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DeptService } from '../../../service/dept.service';
import { DialogSubmissionService } from '../../../service/dialog-submission.service';
import { SnackbarService } from '../../../service/snackbar.service';

@Component({
  selector: 'app-edit-department-dialog',
  templateUrl: './edit-department-dialog.component.html',
  styleUrls: ['./edit-department-dialog.component.css']
})
export class EditDepartmentDialogComponent implements OnInit {
  oldDeptName: string;
  id: number;
  updateForm;
  subscription: Subscription;

  constructor(private dialogSubmissionService: DialogSubmissionService,
              private fb: FormBuilder,
              private deptService: DeptService,
              private snackService: SnackbarService) { }

  ngOnInit(): void {
    this.dialogSubmissionService.setDialogSubmitted(false);
    this.subscription = this.dialogSubmissionService.getData().subscribe(department => {
      if (department) {
        this.oldDeptName = department['oldDeptName'];
        this.id = department['id'];
      }
    });
    this.updateForm = this.fb.group({
      updatedDeptName: [this.oldDeptName]
    });
  }

  get updatedDeptName() {
    return this.updateForm.get('updatedDeptName').value;
  }

  updateDeptName() {
    this.deptService.updateDeptName(this.updatedDeptName, this.id).subscribe(res => {
      this.snackService.success("." + this.oldDeptName + "successfully updated to " + this.updatedDeptName);
      this.dialogSubmissionService.setDialogSubmitted(true);
    }, err => {
      this.snackService.failure("!!!Something went wrong");
    });
  }

  ngOnDestroy() {
    this.dialogSubmissionService.setData(undefined);
    this.subscription.unsubscribe();
  }

}
