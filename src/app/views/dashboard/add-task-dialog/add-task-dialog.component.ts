import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { DocumentAttachmentService } from '../../service/attachment/document-attachment.service';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.css']
})
export class AddTaskDialogComponent implements OnInit {
  @Output() onSubmitClicked = new EventEmitter<any>();
  addTaskForm: FormGroup;
  // projectSelectionEnabled = true;
  // assigneeSelectionEnabled = true;
  showFileIcon = false;
  showProgressBar = false;
  selectedFiles: File[];
  fileIconList: any[];
  greenTaskCount: number = 0;
  yellowTaskCount: number = 0;
  redTaskCount: number = 0;
  assigneeProfilePicture: string;
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
  attachmentList: any[] = [];
  uploadedFileCount = 0;
  progressBarValue = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
                type: AddTaskDialogType,
                projectId: number, 
                projectName: string, 
                assigneeId: number, 
                assigneeName: string
              },
              private dialog: MatDialogRef<AddTaskDialogComponent>,
              private fb: FormBuilder,
              private userService: UserService,
              private localeService: BsLocaleService,
              private projectService: ProjectService,
              private taskService: TaskService,
              private snackService: SnackbarService,
              private attachemntService: DocumentAttachmentService,
              private _adapter: DateAdapter<any>) { 
                this.localeService.use(this.locale);
                this._adapter.setLocale('ar');
              }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    this.assigneeProfilePicture = '..\\..\\..\\..\\assets\\img\\brand\\Logo.png';
    this.addTaskForm = this.fb.group({
      project_id: ['', Validators.required],
      description: ['', Validators.required],
      assignee_id: ['', Validators.required],
      duration: [{ value: '', disabled: true }],
      due_date: ['', Validators.required],
      is_hidden: [false],
      priority: ['', Validators.required]
    });
    //If this dialog is opened from quick task add button OR project page OR dashboard page
    if (this.data.type === AddTaskDialogType.QUICK) {
      // this.projectSelectionEnabled = false;
      // this.assigneeSelectionEnabled = false;
      this.project_id.setValue(this.data.projectId);
      this.assignee_id.setValue(this.data.assigneeId);
      this.project_id.disable();
      this.assignee_id.disable();
    } else if (this.data.type === AddTaskDialogType.PROJECT) {
      // this.projectSelectionEnabled = false;
      this.project_id.setValue(this.data.projectId);
      this.project_id.disable();
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

  fileChanged(event: any) {
    let files: File[] = event.srcElement.files;
    let filesLength = files.length;
    if (filesLength === 0)
      return;
    this.fileIconList = [];
    for (let i = 0; i < filesLength; ++i) {
      let fileType = files[i].name.substr(files[i].name.lastIndexOf('.')+1);
      let fileSizeString = (files[i].size/1024).toString();
      let temp = fileSizeString.split(".");
      let fileSize = temp[0]+"."+temp[0].substr(0, 1)+" KB";
      let fileName = files[i].name;
      if (fileName.length > 18) {
        fileName = fileName.substr(0, 9)+"..."+fileName.substr(fileName.length-7, fileName.length);
      }
      // console.log(fileType);
      let fileIconObj = {
        name: fileName,
        size: fileSize
      };
      if (fileType === 'txt')
        fileIconObj['icon'] = 'fa fa-file-text-o';
      else if (fileType === 'pdf')
        fileIconObj['icon'] = 'fa fa-file-pdf-o';
      else if (fileType === 'zip')
        fileIconObj['icon'] = 'fa fa-file-zip-o';
      else if (fileType === 'doc' || fileType === 'docx')
        fileIconObj['icon'] = 'fa fa-file-word-o';
      else if (fileType === 'xls' || fileType === 'xlsx')
        fileIconObj['icon'] = 'fa fa-file-excel-o';
      else if (fileType === 'pps' || fileType === 'ppt')
        fileIconObj['icon'] = 'fa fa-file-powerpoint-o';
      else if (fileType === 'mp3' || fileType === 'wma' || fileType === 'mpa')
        fileIconObj['icon'] = 'fa fa-file-audio-o';
      else if (fileType === 'mp4' || fileType === 'wmv' || fileType === 'm4v')
        fileIconObj['icon'] = 'fa fa-file-video-o';
      else if (fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg' || fileType === 'webp' || fileType === 'heic')
        fileIconObj['icon'] = 'fa fa-file-image-o';
      else
        fileIconObj['icon'] = 'fa fa-file';
      this.fileIconList.push(fileIconObj); 
    }
    // this.attachment.setValue(files);
    this.selectedFiles = files;
    this.showFileIcon = true;
  }

  removeFile(fileIndex: number) {
    this.fileIconList.splice(fileIndex, 1);
    let tempFiles: File[] = [];
    for (let i = 0; i < this.selectedFiles.length; ++i) {
      if (fileIndex === i)
        continue;
      tempFiles.push(this.selectedFiles[i]);
    }
    this.selectedFiles = tempFiles;
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
    this.taskService.getTaskAssignedToMe().subscribe((tasksAssignedToMe: TaskModel[]) => {
      this.greenTaskCount = 0;
      this.yellowTaskCount = 0;
      this.redTaskCount = 0;
      if (tasksAssignedToMe) {
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
      }
      this.yellowTaskCount = 0;
      this.greenTaskCount = 0;
      this.redTaskCount = 0;
    });
    this.userService.getUsers([this.assignee_id.value]).subscribe((res: UserMaster[]) => {
      if (res[0].profilePicture)
        this.assigneeProfilePicture = res[0].profilePicture;
      else
        this.assigneeProfilePicture = '..\\..\\..\\..\\assets\\img\\brand\\Logo.png';
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
    this.showProgressBar = true;
    if (this.data.type === AddTaskDialogType.ALL) {
      this.allTypeSubmissionHelper();
    } else if (this.data.type === AddTaskDialogType.QUICK) {
      this.project_id.enable();
      this.assignee_id.enable();
      this.quickTypeSubmissionHelper();
    } else {
      this.project_id.enable();
      this.projectTypeSubmissionHelper();
    }
    let n = this.selectedFiles.length;
    for (let i = 0; i < n; ++i) {
      this.attachemntService.getPresignedUrlForDocUpload(this.project_id.value).subscribe(res => {
        let dotPosition = this.selectedFiles[i].name.lastIndexOf(".");
        let fileName = this.selectedFiles[i].name.substr(0, dotPosition);
        let fileType = this.selectedFiles[i].name.substr(dotPosition+1);
        this.attachmentList.push({
          name: fileName,
          type: fileType,
          size: this.selectedFiles[i].size,
          s3_key: res['s3key']
        });
        this.uploadDocToS3(res['attachment_url'], this.selectedFiles[i]);
      }, err => {
        this.snackService.failure('!!!Something went wrong');
        this.dialog.close();
      });
    }
  }
 
  uploadDocToS3(url, doc: File) {
    this.attachemntService.uploadDocToS3(url, doc).subscribe(res => {
      if (res.status === 200) {
        ++this.uploadedFileCount;
        this.progressBarValue += 100/this.selectedFiles.length;
        if (this.uploadedFileCount === this.selectedFiles.length)
          this.submitTaskForm();
      }
    }, err => {
      this.snackService.failure('.Document upload on s3 failed');
      this.dialog.close();
    });
  }

  submitTaskForm() {
    this.addTaskForm.value['add_attachments'] = this.attachmentList;
    // this.addTaskForm.addControl('add_attachment', new FormControl({Validators.required}));
    // this.addTaskForm.get('add_attachment').setValue(this.attachmentList);
    console.log(this.addTaskForm.value);
    this.taskService.createTask(this.addTaskForm.value).subscribe((res: TaskModel) => {
      console.log(res);
      this.snackService.success(".Task created successfully");
      this.onSubmitClicked.emit(true);
      this.dialog.close();
    }, err => {
      console.log(err);
      this.snackService.failure("!!!Something went wrong");
      this.dialog.close();
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
