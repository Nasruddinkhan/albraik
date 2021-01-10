import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddTaskDialogType } from '../../../enum/AddTaskDialogType';
import { PrivilegeList } from '../../../enum/privilegeList';
import { TaskStatus } from '../../../enum/TaskStatus';
import { TaskModel } from '../../modal/task/task-model';
import { TaskService } from '../../service/task/task.service';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { RespondDialogComponent } from '../task-assigned-to-me/respond-dialog/respond-dialog.component';
import { ProjectNotesDialogComponent } from './project-notes-dialog/project-notes-dialog.component';

@Component({
  selector: 'app-project-task-list',
  templateUrl: './project-task-list.component.html',
  styleUrls: ['./project-task-list.component.css']
})
export class ProjectTaskListComponent implements OnInit, OnDestroy {
  userId: number;
  loading = true;
  addTaskDisabled = false;
  projectId: number;
  projectName: string;
  greenTaskCount: number = 0;
  yellowTaskCount: number = 0;
  redTaskCount: number = 0;
  projectTasks: TaskModel[];
  subscription: Subscription;
  taskInProgress = TaskStatus.IN_PROGRESS;
  taskCompleted = TaskStatus.COMPLETED;
  taskLateCompleted = TaskStatus.LATE_COMPLETED;
  displayedColumns: string[] = ['assignerName', 'taskDescription', 'gap', 'assigneeName', 'taskResponse', 'isHidden'];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private taskService: TaskService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userId = +sessionStorage.getItem('userId');
    let userPrivileges = sessionStorage.getItem('privilegeList');
    if (userPrivileges) {
      if (!userPrivileges.includes(PrivilegeList.ASSIGN_A_TASK_TO_A_USER)) 
        this.addTaskDisabled = true;
    }
    this.route.paramMap.subscribe(params => {
      let projectIdAndName = params.get('projectIdAndName');
      this.projectId = +projectIdAndName.substr(0, projectIdAndName.indexOf('-'));
      this.projectName = projectIdAndName.substr(projectIdAndName.indexOf('-') + 1, projectIdAndName.length);
    });
    this.loadProjectTasks();
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  loadProjectTasks() {
    this.loading = true;
    this.taskService.getProjectTaskList(this.projectId).subscribe((taskList: TaskModel[]) => {
      this.projectTasks = taskList;
      if (this.projectTasks) {
        this.processTasks();
        if (!this.authorized()) {
          alert("You are not allowed to view this page.");
          history.back();
        }
      }
      this.loading = false;
    });
  }

  processTasks() {
    this.projectTasks.forEach(task => {
      let dueDate = this.getDateInMilli(new Date(task.due_date)); 
      let today = this.getDateInMilli(new Date());
      task.created_time = this.getDateTimeString(task.created_time);
      let createdDate = this.getDateInMilli(new Date(task.created_time));
      task['duration'] = (dueDate - createdDate) / 86400000;
      // if (task['duration'] > 2) {
      //   task['background_color'] = 'bg-success';
      // } else if (task['duration'] > 0) {
      //   task['background_color'] = 'bg-warning';
      // } else {
      //   task['background_color'] = 'bg-danger';
      // }
      if (task.status === TaskStatus.IN_PROGRESS) {
        task['response_text'] = "-";
        task['response_time'] = "-";
        task['dueDays'] = (dueDate - today) / 86400000;
      } else {
        task['response_text'] = task.task_reply.description;
        task['response_time'] = this.getDateTimeString(task.task_reply.updated_time);
        let completedDate = this.getDateInMilli(new Date(task.task_reply.updated_time));
        task['dueDays'] = (dueDate - completedDate) / 86400000;
      }
      if (task.status === TaskStatus.IN_PROGRESS && task.assignee_id === this.userId) {
        if (task['dueDays'] > 2) {
          task['background_color'] = 'bg-success';
          ++this.greenTaskCount;
        } else if (task['dueDays'] > 0) {
          task['background_color'] = 'bg-warning';
          ++this.yellowTaskCount;
        } else {
          task['background_color'] = 'bg-danger';
          ++this.redTaskCount;
        }
      } else {
        if (task['dueDays'] > 2) {
          task['background_color'] = 'bg-success';
        } else if (task['dueDays'] > 0) {
          task['background_color'] = 'bg-warning';
        } else {
          task['background_color'] = 'bg-danger';
        }
      }
      
    });
  }

  authorized(): boolean {
    let n = this.projectTasks.length;
    for (let i = 0; i < n; ++i) {
      if (this.projectTasks[i].assignee_id === this.userId || this.projectTasks[i].assigner_id)
        return true;
    }
    return false;
  }

  getDateTimeString(timeMilli: number) {
    let date = new Date(timeMilli);
    return date.toLocaleDateString()+" "+date.getHours()+":"+date.getMinutes();
  }

  getDateInMilli(date: Date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return Date.parse(month.toString()+" "+day.toString()+" "+year.toString());
  }

  openNotesDialog() {
    this.dialog.open(ProjectNotesDialogComponent, {
      data: {
        notes: "Perform every task accordingly."
      }
    });
  }

  openAddDialog() {
    let dialogRef = this.dialog.open(AddTaskDialogComponent, {
      data: {
        type: AddTaskDialogType.PROJECT,
        projectId: this.projectId,
        projectName: this.projectName
      }
    });
    this.subscription = dialogRef.componentInstance.onSubmitClicked.subscribe(closed => {
      if (closed) {
        this.loadProjectTasks();
      }
    });
  }

  openReplyDialog(taskId: number, isHidden: boolean) {
    let dialogRef = this.dialog.open(RespondDialogComponent, {
      data: {
        taskId: taskId,
        isHidden: isHidden
      }
    });
    dialogRef.afterClosed().subscribe((closed: boolean) => {
      if (closed)
        this.loadProjectTasks();
    });
  }

  openEditReplyDialog(taskId: number, responseId: number, isHidden: boolean, description: string) {
    let dialogRef = this.dialog.open(RespondDialogComponent, {
      data: {
        taskId: taskId,
        responseId: responseId,
        isHidden: isHidden,
        description: description
      }
    });
    dialogRef.afterClosed().subscribe((closed: boolean) => {
      if (closed)
        this.loadProjectTasks();
    });
  }

  refresh() {
    this.loadProjectTasks();
  }

}
