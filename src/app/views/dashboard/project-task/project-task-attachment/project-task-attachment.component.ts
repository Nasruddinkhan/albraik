import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttachmentModel } from '../../../modal/attachment/attachment';
import { DocumentAttachmentService } from '../../../service/attachment/document-attachment.service';
import { SnackbarService } from '../../../service/snackbar.service';
import * as FileSaver from 'file-saver';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { UserService } from '../../../service/user.service';
import { UserMaster } from '../../../modal/user-master';
import { TaskService } from '../../../service/task/task.service';
import { TaskModel } from '../../../modal/task/task-model';
import { FileSizePipe } from '../../../pipes/filesize.pipe';
import { DateLocaleFilter } from '../../../pipes/localdate-pipe';

@Component({
  selector: 'app-project-task-attachment',
  templateUrl: './project-task-attachment.component.html',
  styleUrls: ['./project-task-attachment.component.css']
})
export class ProjectTaskAttachmentComponent implements OnInit {
  projectId: number;
  projectName: string;
  locale: string = 'ar';
  projectAttachmentList: AttachmentModel[];
  filteredAttachmentList: AttachmentModel[];
  attachmentTypeList: Set<string>;
  attachmentUploadedByList: UserMaster[];
  uploadedByIdList: Set<number>;
  attachmentUploadDateList: Set<number>;
  attachmentSearchForm: FormGroup;
  loading = false;
  attachmentFiltered = false;
  showNoAttachmentMessage = false;
  displayedColumns: string[] = ['srNo', 'name', 'type', 'size', 'uploadedBy', 'uploadDate', 'download'];

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private localeDatePipe: DateLocaleFilter,
              private localeService: BsLocaleService,
              private attachmentService: DocumentAttachmentService,
              private taskService: TaskService,
              private userService: UserService,
              private snackbarService: SnackbarService) { 
                this.localeService.use(this.locale);
              }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let projectIdAndName = params.get('projectIdAndName');
      this.projectId = +projectIdAndName.substr(0, projectIdAndName.indexOf('-'));
      this.projectName = projectIdAndName.substr(projectIdAndName.indexOf('-') + 1, projectIdAndName.length);
    });
    this.attachmentTypeList = new Set<string>();
    this.attachmentUploadDateList = new Set<number>();
    this.attachmentSearchForm = this.fb.group({
      attachmentName: [],
      attachmentType: [],
      uploadedBy: [],
      uploadDate: []
    });
    this.uploadedByIdList = new Set<number>();
    this.getProjectAttachmentList();
  }

  getProjectAttachmentList() {
    this.loading = true;
    this.taskService.getProjectAttachments(this.projectId).subscribe((res: AttachmentModel[]) => {
      this.projectAttachmentList = res;
      let srNo = 0;
      this.projectAttachmentList.forEach(attachment => {
        attachment['srNo'] = ++srNo;
        // attachment.created_time = new Date(attachment.created_time).toLocaleDateString();
        this.attachmentTypeList.add(attachment.type);
        this.uploadedByIdList.add(attachment.created_by);
        this.attachmentUploadDateList.add(attachment.created_time);
      });
      this.getAllInvolvedUsers();
      this.loading = false;
    });
    // this.projectAttachmentList = [
    //   {
    //     name: 'COA Experiment 4',
    //     type: 'docx',
    //     created_by: 47,
    //     created_time: 1611924753497,
    //     size: 2043
    //   },
    //   {
    //     name: 'profile-photo',
    //     type: 'png',
    //     created_by: 35,
    //     created_time: 1611771800475,
    //     size: 423
    //   },
    //   {
    //     name: 'TE(IT) Syllabus',
    //     type: 'pdf',
    //     created_by: 47,
    //     created_time: 1611936161824,
    //     size: 10153
    //   },
    // ];
  }

  getAllInvolvedUsers() {
    this.loading = true;
    let idArrayOfIploadedBy: number[] = [];
    this.uploadedByIdList.forEach(id => idArrayOfIploadedBy.push(id));
    this.userService.getUsers(idArrayOfIploadedBy).subscribe((res: UserMaster[]) => {
      this.attachmentUploadedByList = res;
      this.loading = false;
    });
  }

  get attachmentName() {
    return this.attachmentSearchForm.get('attachmentName');
  }

  get attachmentType() {
    return this.attachmentSearchForm.get('attachmentType');
  }

  get uploadedBy() {
    return this.attachmentSearchForm.get('uploadedBy');
  }

  get uploadDate() {
    return this.attachmentSearchForm.get('uploadDate');
  }

  getUserName(userId: number) {
    let temp = this.attachmentUploadedByList.filter(user => user.id === userId)[0];
    return temp.firstName+" "+temp.familyName;
  }

  checkPressedKey(event) {
    if (event.code === 'Enter')
      this.searchAttachment();
  }

  searchAttachment() {
    this.filteredAttachmentList = this.projectAttachmentList;
    this.searchByAttachmentName();
    this.searchByAttachmentType();
    this.searchByAttachmentUploadedBy();
    this.searchByAttachmentUploadDate();
    if (this.filteredAttachmentList.length === 0)
      this.showNoAttachmentMessage = true;
    else
      this.showNoAttachmentMessage = false;
    this.attachmentFiltered = true;
  }

  searchByAttachmentName() {
    if (!this.attachmentName.value)
      return;
    let attachmentNameLength = this.attachmentName.value.length;
    this.filteredAttachmentList = this.filteredAttachmentList.filter(attachment => attachment.name.substr(0, attachmentNameLength).toLowerCase() === this.attachmentName.value.toLowerCase());
  }

  searchByAttachmentType() {
    if (!this.attachmentType.value)
      return;
    this.filteredAttachmentList = this.filteredAttachmentList.filter(attachment => attachment.type === this.attachmentType.value);
  }

  searchByAttachmentUploadedBy() {
    if (!this.uploadedBy.value)
      return;
    this.uploadedBy.setValue(parseInt(this.uploadedBy.value));
    this.filteredAttachmentList = this.filteredAttachmentList.filter(attachment => attachment.created_by === this.uploadedBy.value);
  }

  searchByAttachmentUploadDate() {
    if (!this.uploadDate.value)
      return;
    let requiredDate = this.localeDatePipe.transform(this.uploadDate.value);
    this.filteredAttachmentList = this.filteredAttachmentList.filter(attachment => 
      this.localeDatePipe.transform(attachment.created_time) === requiredDate);
  }

  refreshAttachmentTable() {
    this.attachmentSearchForm.reset();
    this.getProjectAttachmentList();
    this.attachmentFiltered = false;
    this.showNoAttachmentMessage = false;
  }

  downloadAttachment(attachment: AttachmentModel) {
    this.attachmentService.getPresignedUrlForDocDownload(this.projectId, attachment.s3_key).subscribe(res => {
      this.attachmentService.downloadDocFromS3(res['attachment_url']).subscribe(res => {
        this.saveDocument(res, attachment);
      }, err => {
        this.snackbarService.failure(".Download from s3 failed");
      });
    }, err => {
      this.snackbarService.failure(err.message);
    });
  }

  saveDocument(res, attachment: AttachmentModel) {
    let blob = new Blob([res], { type: res['type'] });
    FileSaver.saveAs(blob, attachment.name);
  }

}
