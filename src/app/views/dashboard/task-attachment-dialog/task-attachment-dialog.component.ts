import { Component, ContentChild, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as FileSaver from 'file-saver';
import { AttachmentModel } from '../../modal/attachment/attachment';
import { TaskModel } from '../../modal/task/task-model';
import { DocumentAttachmentService } from '../../service/attachment/document-attachment.service';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-task-attachment-dialog',
  templateUrl: './task-attachment-dialog.component.html',
  styleUrls: ['./task-attachment-dialog.component.css']
})
export class TaskAttachmentDialogComponent implements OnInit {
  type: string;
  task: TaskModel;
  projectId: number;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
                type: string,
                task: TaskModel
              },
              private attachmentService: DocumentAttachmentService,
              private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.type = this.data.type;
    this.projectId = this.data.task.project_id;
    this.task = this.data.task;
    this.task.attachment_list.forEach(attachment => {
      if (attachment.name.length > 18) {
        attachment['nameToDisplay'] = attachment.name.substr(0, 9)+"..."+attachment.name.substr(attachment.name.length-2, attachment.name.length);
      } else {
        attachment['nameToDisplay'] = attachment.name;
      }
      if (attachment.type === 'txt')
        attachment['icon'] = 'fa fa-file-text-o';
      else if (attachment.type === 'pdf')
        attachment['icon'] = 'fa fa-file-pdf-o';
      else if (attachment.type === 'zip')
        attachment['icon'] = 'fa fa-file-zip-o';
      else if (attachment.type === 'doc' || attachment.type === 'docx')
        attachment['icon'] = 'fa fa-file-word-o';
      else if (attachment.type === 'xls' || attachment.type === 'xlsx')
        attachment['icon'] = 'fa fa-file-excel-o';
      else if (attachment.type === 'pps' || attachment.type === 'ppt')
        attachment['icon'] = 'fa fa-file-powerpoint-o';
      else if (attachment.type === 'mp3' || attachment.type === 'wma' || attachment.type === 'mpa')
        attachment['icon'] = 'fa fa-file-audio-o';
      else if (attachment.type === 'mp4' || attachment.type === 'wmv' || attachment.type === 'm4v')
        attachment['icon'] = 'fa fa-file-video-o';
      else if (attachment.type === 'png' || attachment.type === 'jpg' || attachment.type === 'jpeg' || attachment.type === 'webp' || attachment.type === 'heic')
        attachment['icon'] = 'fa fa-file-image-o';
      else
        attachment['icon'] = 'fa fa-file';
    });
  }

  downloadAttachment(attachment: AttachmentModel) {
    this.attachmentService.getPresignedUrlForDocDownload(this.projectId, attachment.s3_key).subscribe(res => {
      this.attachmentService.downloadDocFromS3(res['attachment_url']).subscribe(res => {
        this.saveDocument(res, attachment);
      }, err => {
        this.snackbarService.failure(".Download failed");
      });
    }, err => {
      this.snackbarService.failure("!!!Someting went wrong");
    });
  }

  saveDocument(res, attachment: AttachmentModel) {
    let blob = new Blob([res], {type: res['type']});
    FileSaver.saveAs(blob, attachment.name);
  }

}
