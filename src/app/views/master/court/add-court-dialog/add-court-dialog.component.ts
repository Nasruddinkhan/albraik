import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { CourtModel } from '../../../modal/court';
import { CourtMaster } from '../../../modal/court-master';
import { CourtService } from '../../../service/court.service';
import { DialogSubmissionService } from '../../../service/dialog-submission.service';
import { SnackbarService } from '../../../service/snackbar.service';

@Component({
  selector: 'app-add-court-dialog',
  templateUrl: './add-court-dialog.component.html',
  styleUrls: ['./add-court-dialog.component.css']
})
export class AddCourtDialogComponent implements OnInit {
  courts = [];
  userId: string;
  companyId: string;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private dialogSubmitted: DialogSubmissionService,
              private courtService: CourtService,
              private snackService: SnackbarService) { }

  ngOnInit(): void {
    this.userId  = sessionStorage.getItem("userId");
    this.companyId =  sessionStorage.getItem("companyId");
    this.dialogSubmitted.setDialogSubmitted(false);
  }

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;
    if ((value || '').trim()) {
      this.courts.push({name: value.trim()});
    }
    if (input) {
      input.value = '';
    }
  }

  remove(court) {
    let index = this.courts.indexOf(court);
    if (index >= 0) {
      this.courts.splice(index, 1);
    }
  }

  onSubmit() {
    let courtList = new Array<CourtMaster>();
    this.courts.map(court => {
      courtList.push(new CourtMaster(court.name));
    });
    console.log(courtList);
    this.courtService.createCourt(courtList).subscribe((res:CourtModel[]) => {
      this.snackService.success(".Court(s) added successfully");
      this.dialogSubmitted.setDialogSubmitted(true);
    },err => {
      this.snackService.failure("!!!Something went wrong.");
    });
  }

}