import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CourtService } from '../../../service/court.service';
import { DialogSubmissionService } from '../../../service/dialog-submission.service';
import { SnackbarService } from '../../../service/snackbar.service';

@Component({
  selector: 'app-edit-court-dialog',
  templateUrl: './edit-court-dialog.component.html',
  styleUrls: ['./edit-court-dialog.component.css']
})
export class EditCourtDialogComponent implements OnInit {
  oldCourtName: string;
  id: number;
  updateForm;
  subscription: Subscription;

  constructor(private dialogSubmissionService: DialogSubmissionService,
              private fb: FormBuilder,
              private courtService: CourtService,
              private snackService: SnackbarService) { }

  ngOnInit(): void {
    this.dialogSubmissionService.setDialogSubmitted(false);
    this.subscription = this.dialogSubmissionService.getData().subscribe(court => {
      if (court) {
        this.oldCourtName = court['oldCourtName'];
        this.id = court['id'];
      }
    });
    this.updateForm = this.fb.group({
      updatedCourtName: [this.oldCourtName]
    });
  }

  get updatedCourtName() {
    return this.updateForm.get("updatedCourtName").value;
  }

  updateCourtName() {
    console.log(this.updatedCourtName);
    this.courtService.updateCourtName(this.updatedCourtName, this.id).subscribe(res => {
      this.snackService.success("." + this.oldCourtName + " successfully updated to " + this.updatedCourtName);
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
