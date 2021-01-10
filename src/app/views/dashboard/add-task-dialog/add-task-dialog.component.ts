import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
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
import { ProjectService } from '../../service/project.service';
import { TaskPriority } from '../../../enum/TaskPriority';
import { ProjectModel } from '../../modal/project-model';
import { TaskService } from '../../service/task/task.service';
import { SnackbarService } from '../../service/snackbar.service';
import { TaskModel } from '../../modal/task/task-model';
import { DashboardComponent } from '../dashboard.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskAssignedByMeComponent } from '../task-assigned-by-me/task-assigned-by-me.component';
import { AddTaskDialogType } from '../../../enum/AddTaskDialogType';
import { TaskStatus } from '../../../enum/TaskStatus';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.css']
})
export class AddTaskDialogComponent implements OnInit {
  @Output() onSubmitClicked = new EventEmitter<any>();
  addTaskForm: FormGroup;
  projectSelectionEnabled = true;
  assigneeSelectionEnabled = true;
  greenTaskCount: number = 0;
  yellowTaskCount: number = 0;
  redTaskCount: number = 0;
  users: UserMaster[];
  priorityList: any[];
  projectList: ProjectModel[] = [];
  userId: string;
  locale = 'ar';
  minDate: Date;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
                type: AddTaskDialogType,
                projectId: number, 
                projectName: string, 
                assigneeId: number, 
                assigneeName: string
              },
              private fb: FormBuilder,
              private userService: UserService,
              private localeService: BsLocaleService,
              private projectService: ProjectService,
              private taskService: TaskService,
              private snackService: SnackbarService,
              private _adapter: DateAdapter<any>) { 
                this.localeService.use(this.locale);
                this._adapter.setLocale('ar');
              }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    this.addTaskForm = this.fb.group({
      project_id: ['', Validators.required],
      description: ['', Validators.required],
      assignee_id: ['', Validators.required],
      duration: [{ value: '', disabled: true }],
      due_date: ['', Validators.required],
      is_hidden: [false],
      priority: ['', Validators.required],
      attachement: ['']
    });
    //If this dialog is opened from quick task add button OR project page OR dashboard page
    if (this.data.type === AddTaskDialogType.QUICK) {
      this.projectSelectionEnabled = false;
      this.assigneeSelectionEnabled = false;
      this.project_id.setValue(this.data.projectId);
      this.assignee_id.setValue(this.data.assigneeId);
    } else if (this.data.type === AddTaskDialogType.PROJECT) {
      this.projectSelectionEnabled = false;
      this.project_id.setValue(this.data.projectId);
    }
    this.userService.findAllUsers().subscribe((res: UserMaster[]) => {
      this.users = res;
    });
    this.findAllProject(1);
    this.priorityList = [{'key': TaskPriority.LOW,'value' : 'Low منخفض '},{'key': TaskPriority.MEDIUM, 'value' : 'Medium متوسط '},{'key': TaskPriority.HIGH,'value':'High ​​مرتفع'}];
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
  }

  findAllProject(pageNo) {
    this.projectService.findAllProject(this.userId, pageNo).subscribe((res: any) => {
      res.content.forEach(proj => {
        this.projectList.push(proj);
      });
      if (!res.last)
        this.findAllProject(++pageNo);
    });
  }

  get project_id() {
    return this.addTaskForm.get('project_id');
  }

  get description() {
    return this.addTaskForm.get('description');
  }

  get assignee_id() {
    return this.addTaskForm.get('assignee_id');
  }

  get duration() {
    return this.addTaskForm.get('duration');
  }

  get due_date() {
    return this.addTaskForm.get('due_date');
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
    if (taskDate) {
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

  showPendingTaskCount() {
    let selectedUserId = this.assignee_id.value;
    this.taskService.getTaskAssignedToMe().subscribe((tasksAssignedToMe: TaskModel[]) => {
      this.greenTaskCount = 0;
      this.yellowTaskCount = 0;
      this.redTaskCount = 0;
      tasksAssignedToMe.forEach(task => {
        if (task.status === TaskStatus.IN_PROGRESS) {
          let today = this.getDateInMilli(new Date());
          let dueDate = this.getDateInMilli(new Date(task.due_date));
          let dueDays = (dueDate - today) / 86400000;
          if (dueDays > 2) 
            ++this.greenTaskCount;
          else if (dueDays > 0)
            ++this.yellowTaskCount;
          else  
            ++this.redTaskCount;
        }
      });
    });
  }

  getDateInMilli(date: Date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return Date.parse(month.toString()+" "+day.toString()+" "+year.toString());
  }

  onSubmit() {
    let dueDateInMilli = Date.parse((this.due_date.value.getMonth()+1)+" "+this.due_date.value.getDate()+" "+this.due_date.value.getFullYear());
    this.due_date.setValue(dueDateInMilli);
    // if (this.quickAddTaskDialog) {
    //   this.addTaskForm.value['project_name'] = this.data.projectName;
    //   this.addTaskForm.value['assignee_name'] = this.data.assigneeName;
    // } else {
    //   this.assignProjectName();
    //   this.assignAssigneeName();
    // }
    if (this.data.type === AddTaskDialogType.ALL) {
      this.allTypeSubmissionHelper();
    } else if (this.data.type === AddTaskDialogType.QUICK) {
      this.quickTypeSubmissionHelper();
    } else {
      this.projectTypeSubmissionHelper();
    }
    delete this.addTaskForm.value['attachement'];
    console.log(this.addTaskForm.value);
    this.taskService.createTask(this.addTaskForm.value).subscribe((res: TaskModel) => {
      console.log(res);
      this.snackService.success(".Task created successfully");
      this.onSubmitClicked.emit(true);
    }, err => {
      console.log(err);
      this.snackService.failure("!!!Something went wrong")
    });
  }

  allTypeSubmissionHelper() {
    this.assignProjectName();
    this.assignAssigneeName();
  }

  quickTypeSubmissionHelper() {
    this.addTaskForm.value['project_name'] = this.data.projectName;
    this.addTaskForm.value['assignee_name'] = this.data.assigneeName;
  }

  projectTypeSubmissionHelper() {
    this.addTaskForm.value['project_name'] = this.data.projectName;
    this.assignAssigneeName();
  }

  assignProjectName() {
    for (let i = 0; i < this.projectList.length; ++i) {
      if (this.projectList[i].project_id === this.project_id.value) {
        this.addTaskForm.value['project_name'] = this.projectList[i].name;
        break;
      }
    }
  }

  assignAssigneeName() {
    for (let i = 0; i < this.users.length; ++i) {
      if (this.users[i].id === this.assignee_id.value) {
        this.addTaskForm.value['assignee_name'] = this.users[i].firstName;
        break;
      }
    }
  }

}
