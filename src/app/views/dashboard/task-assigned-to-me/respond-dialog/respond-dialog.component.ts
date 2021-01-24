import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Contact } from '../../../modal/contact';
import { TaskModel } from '../../../modal/task/task-model';
import { UserModel } from '../../../modal/user-model';
import { ContactSearchService } from '../../../service/contact.service';
import { SnackbarService } from '../../../service/snackbar.service';
import { TaskService } from '../../../service/task/task.service';
import { UserService } from '../../../service/user.service';
import { TaskAssignedToMeComponent } from '../task-assigned-to-me.component';

@Component({
  selector: 'app-respond-dialog',
  templateUrl: './respond-dialog.component.html',
  styleUrls: ['./respond-dialog.component.css']
})
export class RespondDialogComponent implements OnInit {
  respondForm: FormGroup;
  taskId: number;
  responseId: number;
  isHidden: boolean;
  oldDescription: string;
  judgeList: Contact[];
  setCourtMeeting = false;
  locale = 'ar';

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
                taskId: number, 
                responseId: number, 
                isHidden: boolean
                description: string
              },
              public dialog: MatDialogRef<TaskAssignedToMeComponent>,
              private fb: FormBuilder,
              private snackbar: SnackbarService,
              private taskService: TaskService,
              private contactSearchService: ContactSearchService,
              private localeService: BsLocaleService) { 
                this.localeService.use(this.locale);
              }

  ngOnInit(): void {
    this.taskId = this.data.taskId;
    this.responseId = this.data.responseId;
    this.isHidden = this.data.isHidden;
    this.oldDescription = this.data.description;
    this.respondForm = this.fb.group({
      description: ['', Validators.required],
      courtMeetingDate: [new Date(), Validators.required],
      judge: [0, Validators.required]
    });
    if (this.oldDescription) 
      this.description.setValue(this.oldDescription); 
    this.getAllJudges();
  }

  getAllJudges() {
    this.contactSearchService.getContactType(1).subscribe((contactList: Contact[]) => {
      this.judgeList = contactList;
    });
  }

  get description() {
    return this.respondForm.get('description');
  }

  get courtMeetingDate() {
    return this.respondForm.get('courtMeetingDate');
  }

  get judge() {
    return this.respondForm.get('judge');
  }

  checkboxChanged(event) {
    if (event.checked) {
      this.setCourtMeeting = true;
      this.courtMeetingDate.setValue('');
      this.judge.setValue('');
    } else {
      this.setCourtMeeting = false;
      this.courtMeetingDate.setValue(new Date());
      this.judge.setValue(0);
    }
  }

  onSubmit() {
    this.respondForm.value['task_id'] = this.taskId;
    this.respondForm.value['is_hidden'] = this.isHidden;
    //Checking if the assignee is updating his reply OR replying to a given task
    if (this.responseId)
      this.updateReply();
    else 
      this.reply();
  }

  reply() {
    this.taskService.createTaskReply(this.taskId, this.respondForm.value).subscribe((res: TaskModel) => {
      this.snackbar.success(".Responded successfully");
      this.dialog.close(true);
    }, err => {
      this.snackbar.failure("!!!Something went wrong.");
      this.dialog.close();
    });
  }

  updateReply() {
    this.taskService.updateTaskReply(this.taskId, this.responseId, this.respondForm.value).subscribe((res: TaskModel) => {
      this.snackbar.success(".Response updated successfully");
      this.dialog.close(true);
    }, (err: Response) => {
      if (err.status === 410)
        this.snackbar.failure(".Response cannot be edited");
      else
        this.snackbar.failure("!!!Something went wrong");
      this.dialog.close(true);
    });
  }

}
