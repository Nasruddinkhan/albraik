import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ProjectType } from '../../../../enum/projectType';
import { RespondTaskDialogType } from '../../../../enum/RespondTaskDialogType';
import { AttachmentModel } from '../../../modal/attachment/attachment';
import { Contact } from '../../../modal/contact';
import { CourtMaster } from '../../../modal/court-master';
import { ProjectModel } from '../../../modal/project-model';
import { TaskModel } from '../../../modal/task/task-model';
import { UserModel } from '../../../modal/user-model';
import { DocumentAttachmentService } from '../../../service/attachment/document-attachment.service';
import { ContactSearchService } from '../../../service/contact.service';
import { CourtService } from '../../../service/court.service';
import { ProjectService } from '../../../service/project.service';
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
  type: RespondTaskDialogType;
  projectId: number;
  respondForm: FormGroup;
  taskId: number;
  responseId: number;
  isHidden: boolean;
  oldDescription: string;
  oldAttachmentList: AttachmentModel[];
  courtList: CourtMaster[];
  judgeList: Contact[];
  showSetAppointment = false;
  setAppointment = false;
  showFileIcon = false;
  showProgressBar = false;
  oldFilesRemoved = false;
  showJudgeDropDown = true;
  showGroup = false;
  fileIconList = [];
  selectedFiles: File[] = [];
  attachmentList: any[] = [];
  locale = 'ar';
  uploadedFileCount = 0;
  progressBarValue = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
                type: RespondTaskDialogType,
                taskId: number, 
                projectId: number,
                responseId: number, 
                isHidden: boolean
                description: string,
                oldAttachmentList: AttachmentModel[]
              },
              public dialog: MatDialogRef<TaskAssignedToMeComponent>,
              private fb: FormBuilder,
              private snackbar: SnackbarService,
              private taskService: TaskService,
              private projectService: ProjectService,
              private attachmentService: DocumentAttachmentService,
              private contactSearchService: ContactSearchService,
              private courtService: CourtService,
              private localeService: BsLocaleService) { 
                this.localeService.use(this.locale);
              }

  ngOnInit(): void {
    this.type = this.data.type;
    this.taskId = this.data.taskId;
    this.projectId = this.data.projectId;
    this.responseId = this.data.responseId;
    this.isHidden = this.data.isHidden;
    this.oldDescription = this.data.description;
    this.oldAttachmentList = this.data.oldAttachmentList;
    this.getProjectDetails();
    if (this.type === RespondTaskDialogType.RESPONSE || this.type === RespondTaskDialogType.EDIT_RESPONSE) {
      this.prepareRespondForm();
    } else {
      this.prepareRespondFormWithCourtAppointment();
    }
    if (this.oldDescription) {
      this.description.setValue(this.oldDescription); 
      if (this.oldAttachmentList.length > 0) {
        this.prepareFileIconList(this.oldAttachmentList, true);
      }
    }
    this.getAllJudges();
  }

  getProjectDetails() {
    this.projectService.getProjectDetails([this.projectId]).subscribe((res: ProjectModel[]) => {
      if (res[0].project_type_id === ProjectType.CASE) 
        this.showSetAppointment = true;
    });
  }

  prepareRespondForm() {
    this.respondForm = this.fb.group({
      description: ['', Validators.required]
    });
  }

  prepareRespondFormWithCourtAppointment() {
    this.respondForm = this.fb.group({
      description: ['', Validators.required],
      title: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      court: ['', Validators.required],
      judge: ['', Validators.required],
      group: ['', Validators.required],
      appointmentType: ['', Validators.required],
      notes: ['', Validators.required]
    });
  }

  getAllCourtes() {
    this.courtService.findAllCourt().subscribe((res: CourtMaster[]) => {
      this.courtList = res;
    });
  }

  getAllJudges() {
    this.contactSearchService.getContactType(1).subscribe((contactList: Contact[]) => {
      this.judgeList = contactList;
    });
  }

  get description() {
    return this.respondForm.get('description');
  }

  get title() {
    return this.respondForm.get('title');
  }

  get appointmentDate() {
    return this.respondForm.get('appointmentDate');
  }

  get appointmentTime() {
    return this.respondForm.get('appointmentTime');
  }

  get court() {
    return this.respondForm.get('court');
  }

  get judge() {
    return this.respondForm.get('judge');
  }

  get group() {
    return this.respondForm.get('group');
  }

  get notes() {
    return this.respondForm.get('notes');
  }

  checkboxChanged(event) {
    if (event.checked) {
      this.setAppointment = true;
      this.appointmentDate.setValue('');
    } else {
      this.setAppointment = false;
      this.appointmentDate.setValue(new Date());
    }
  }

  changeJudgeType(event) {
    if (event.value === 'judge') {
      if (this.respondForm.contains('group'))
        this.respondForm.removeControl('group');
      if (!this.respondForm.contains('judge'))
        this.respondForm.addControl('judge', new FormControl('', Validators.required));
      this.showJudgeDropDown = true;
      this.showGroup = false;
    } else {
      if (this.respondForm.contains('judge'))
        this.respondForm.removeControl('judge');
      if (!this.respondForm.contains('group'))
        this.respondForm.addControl('group', new FormControl('', Validators.required));
      this.showJudgeDropDown = false;
      this.showGroup = true;
    }
  }

  fileChanged(event: any) {
    this.oldFilesRemoved = true;
    let files: File[] = event.srcElement.files;
    let filesLength = files.length;
    if (filesLength === 0)
      return;
    this.prepareFileIconList(files, false);
  }

  prepareFileIconList(files, updateResponse: boolean) {
    let filesLength = files.length;
    this.fileIconList = [];
    for (let i = 0; i < filesLength; ++i) {
      let fileType;
      let fileName;
      if (updateResponse) {
        fileName = files[i].name+"."+files[i].type;
        fileType = files[i].type;
      } else {
        fileType = files[i].name.substr(files[i].name.lastIndexOf('.')+1);
        fileName = files[i].name;
      }
      let fileSizeString = (files[i].size/1024).toString();
      let temp = fileSizeString.split(".");
      let fileSize = temp[0]+"."+temp[0].substr(0, 1)+" KB";
      if (fileName.length > 18) {
        fileName = fileName.substr(0, 9)+"..."+fileName.substr(fileName.length-7, fileName.length);
      }
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

  onSubmit() {
    this.respondForm.value['task_id'] = this.taskId;
    this.respondForm.value['is_hidden'] = this.isHidden;
    delete this.respondForm.value['courtMeetingDate'];
    delete this.respondForm.value['judge'];
    this.uploadAllDocuments();
  }

  uploadAllDocuments() {
    let n = this.selectedFiles.length;
    if (n > 0) {
      this.showProgressBar = true;
      for (let i = 0; i < n; ++i) {
        this.attachmentService.getPresignedUrlForDocUpload(this.projectId).subscribe(res => {
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
          this.snackbar.failure('!!!Something went wrong');
          this.dialog.close();
        });
      }
    } else {
      //Checking if the assignee is updating his reply OR replying to a given task
      if (this.type === RespondTaskDialogType.EDIT_RESPONSE)
        this.submitUpdateReplyForm();
      else
        this.submitReplyForm();
    }
  }

  uploadDocToS3(url, doc: File) {
    this.attachmentService.uploadDocToS3(url, doc).subscribe(res => {
      if (res.status === 200) {
        ++this.uploadedFileCount;
        this.progressBarValue += 100/this.selectedFiles.length;
        if (this.uploadedFileCount === this.selectedFiles.length) {
          //Checking if the assignee is updating his reply OR replying to a given task
          if (this.type === RespondTaskDialogType.EDIT_RESPONSE)
            this.submitUpdateReplyForm();
          else
            this.submitReplyForm();
        }
      }
    }, err => {
      this.snackbar.failure('.Document upload on s3 failed');
      this.dialog.close();
    });
  }

  submitReplyForm() {
    this.respondForm.value['add_attachments'] = this.attachmentList;
    this.taskService.createTaskReply(this.taskId, this.respondForm.value).subscribe((res: TaskModel) => {
      this.snackbar.success(".Responded successfully");
      this.dialog.close(true);
    }, err => {
      this.snackbar.failure("!!!Something went wrong.");
      this.dialog.close();
    });
  }

  submitUpdateReplyForm() {
    let add_attachments = [];
    let remove_attachments = [];
    if (this.oldFilesRemoved) {
      remove_attachments = this.oldAttachmentList.map(attachment => {
        return attachment.id;
      });
      add_attachments = this.attachmentList;
    } else {
      let found;
      this.oldAttachmentList.forEach(attachment => {
        found = false;
        for (let i = 0; i < this.selectedFiles.length; ++i) {
          if (this.selectedFiles[i]['id'] === attachment.id) {
            found = true;
            break;
          }
        }
        if (!found)
          remove_attachments.push(attachment.id);
      });
    }
    this.respondForm.value['add_attachments'] = add_attachments;
    this.respondForm.value['remove_attachments'] = remove_attachments;
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
