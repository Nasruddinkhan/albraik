import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { UserMaster } from '../../modal/user-master';
import { UserService } from '../../service/user.service';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.css']
})
export class AddTaskDialogComponent implements OnInit {
  addTaskForm: FormGroup;
  users: UserMaster[];
  priorityList: any[];
  locale = 'ar';
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private localeService: BsLocaleService,
              private _adapter: DateAdapter<any>) { 
                this.localeService.use(this.locale);
                this._adapter.setLocale('ar');
              }

  ngOnInit(): void {
    this.addTaskForm = this.fb.group({
      task: ['', Validators.required],
      assignee: ['', Validators.required],
      duration: [{ value: '', disabled: true }],
      dueDate: ['', Validators.required],
      hiddenTask: [''],
      priority: ['', Validators.required],
      attachement: ['']
    });
    this.userService.findAllUsers().subscribe((res: UserMaster[]) => {
      this.users = res;
    });
    this.priorityList = [{'key':'low','value' : 'Low منخفض '},{'key':'medium', 'value' : 'Medium متوسط '},{'key':'high','value':'High ​​مرتفع'}];
  }

  get task() {
    return this.addTaskForm.get('task');
  }

  get assignee() {
    return this.addTaskForm.get('assignee');
  }

  get duration() {
    return this.addTaskForm.get('duration');
  }

  get dueDate() {
    return this.addTaskForm.get('dueDate');
  }

  get priority() {
    return this.addTaskForm.get('priority');
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }

  setDuration(dp) {
    let taskDate: Date = dp._bsValue;
    let taskDay = taskDate.getDate();
    let taskMonth = taskDate.getMonth() + 1;
    let taskYear = taskDate.getFullYear();
    let taskMilli = Date.parse(taskMonth.toString()+" "+taskDay.toString()+" "+taskYear.toString());
    let temp = new Date();
    let currentDay = temp.getDate();
    let currentMonth = temp.getMonth() + 1;
    let currentYear = temp.getFullYear();
    let currentMilli = Date.parse(currentMonth.toString()+" "+currentDay.toString()+" "+currentYear.toString());
    let diff = (taskMilli - currentMilli) / 86400000;
    this.addTaskForm.get('duration').setValue(diff);
  }

}
