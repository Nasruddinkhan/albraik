import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AddTaskDialogType } from '../../../enum/AddTaskDialogType';
import { TaskStatus } from '../../../enum/TaskStatus';
import { TaskModel } from '../../modal/task/task-model';
import { TaskService } from '../../service/task/task.service';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { TaskAttachmentDialogComponent } from './../task-attachment-dialog/task-attachment-dialog.component';

@Component({
  selector: 'task-assigned-by-me',
  templateUrl: './task-assigned-by-me.component.html',
  styleUrls: ['./task-assigned-by-me.component.css']
})
export class TaskAssignedByMeComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['projectNumber', 'projectName', 'taskDescription', 'taskResponse', 'respondDate', 'daysElapsed', 'assignee', 'priority', 'attachment', 'quickTaskAddition'];
  tasks: TaskModel[];
  loading = true;
  addTaskSubscription: Subscription;

  constructor(private taskService: TaskService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
  //   this.tasks = [
  //     {
  //       projectId: 1923,
  //       projectName: 'قضية عبدالله الزمان راعي الرمان',
  //       taskDescription: 'المرجو معرفة سعر الرمان عند شيخ الزومان اللي خاس عنده من زمان .. اوكي مان؟',
  //       taskResponse: "I won't do it",
  //       respondDate: '1442/02/18',
  //       daysElapsed: 92,
  //       assigneeName: 'Asif Shaikh',
  //       priority: 'مستقر',
  //     },
  //     {
  //       projectId: 1923,
  //       projectName: 'قضية عبدالله الزمان راعي الرمان',
  //       taskDescription: 'المرجو معرفة سعر الرمان عند شيخ الزومان اللي خاس عنده من زمان .. اوكي مان؟',
  //       taskResponse: "I won't do it",
  //       respondDate: '1442/01/10',
  //       daysElapsed: 55,
  //       assigneeName: 'Abdul Aziz Shaikh',
  //       priority: 'مستقر',
  //     }
  //   ];
    this.loadTasks();
  }

  ngOnDestroy() {
    if (this.addTaskSubscription)
      this.addTaskSubscription.unsubscribe();
  }

  loadTasks() {
    this.loading = true;
    this.taskService.getTaskAssignedByMe().subscribe((taskList: TaskModel[]) => {
      this.tasks = taskList;
      if (this.tasks) {
        this.assignDurationAndColor();
        this.sortByColor();
      }
      this.loading = false;
    });
  }

  assignDurationAndColor() {
    // let today = new Date();
    // let day = today.getDate();
    // let month = today.getMonth() + 1;
    // let year = today.getFullYear();
    // let todayMilli = Date.parse(month.toString()+" "+day.toString()+" "+year.toString());
    let todayMilli = this.getDateMilli((new Date().getTime()));
    this.tasks.forEach(task => {
      if (task.status === TaskStatus.IN_PROGRESS) {
        let taskDateMilli = this.getDateMilli(task.created_time);
        task['days_elapsed'] = (todayMilli - taskDateMilli) / 86400000;
        task['response_text'] = '-';
        task['respond_date'] = "-";
        task['display_respond_button'] = false;
        task['color'] = 'text-body';
        task['background_color'] = 'bg-white';
        task['link_color'] = '#007bff';
      } else {
        // let replyDateTemp = new Date(task.task_reply.updated_time);
        // let replyDate = replyDateTemp.getDate();
        // let replyMonth = replyDateTemp.getMonth() + 1;
        // let replyYear = replyDateTemp.getFullYear();
        // let replyDateMilli = Date.parse(replyMonth.toString()+" "+replyDate.toString()+" "+replyYear.toString());
        let taskDateMilli = this.getDateMilli(task.created_time);
        let replyDateMilli = this.getDateMilli(task.task_reply.updated_time);
        task['days_elapsed'] = (replyDateMilli - taskDateMilli) / 86400000;
        task['response_text'] = task.task_reply.description;
        task['respond_date'] = new Date(task.task_reply.updated_time).toLocaleDateString();
        task['display_respond_button'] = true;
        if (task.status === TaskStatus.COMPLETED || task.status === TaskStatus.LATE_COMPLETED) {
          task['color'] = 'text-body';
          task['background_color'] = 'bg-light';
          task['link_color'] = '#007bff';
        }
        else {
          task['color'] = 'text-white';
          task['background_color'] = 'bg-info';
          task['link_color'] = '#ab47bc';
        }
      }
    });
  }

  sortByColor() {
    let grayTasks: TaskModel[] = [];
    let tempTasks: TaskModel[] = [];
    this.tasks.forEach(task => {
      if (task.status === TaskStatus.COMPLETED || task.status === TaskStatus.LATE_COMPLETED) {
        grayTasks.push(task);
      } else {
        tempTasks.push(task);
      }
    });
    tempTasks.sort((a, b) => {
      return a.task_reply ? -1: 1;
    });
    grayTasks.sort((a, b) => {
      return a.updated_time < b.updated_time ? -1 : 1;
    });
    this.tasks = grayTasks.concat(tempTasks);
    // this.tasks.sort((a, b) => {
    //   return a['background_color'] === 'bg-light' ? -1 : 1; 
    // });
    // this.tasks.sort((a, b) => {
    //   return a.task_reply ? -1 : 1;
    // });
  }

  openAttachmentDialog(task: TaskModel, type: string) {
    this.dialog.open(TaskAttachmentDialogComponent, {
      data: {
        type: type,
        task: task
      }
    });
  }

  openQuickTaskAddDialog(task: TaskModel) {
    let dialogRef = this.dialog.open(AddTaskDialogComponent, {
      data: {
        type: AddTaskDialogType.QUICK,
        projectId: task.project_id,
        projectName: task.project_name,
        assigneeId: task.assignee_id,
        assigneeName: task.assignee_name
      }
    });
    this.addTaskSubscription = dialogRef.componentInstance.onSubmitClicked.subscribe((closed: boolean) => {
      if (closed) {
        this.loadTasks();
      }
    });
  }

  getDateMilli(dateMilli) {
    let date = new Date(dateMilli);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return Date.parse(month.toString()+" "+day.toString()+" "+year.toString());
  }

}
