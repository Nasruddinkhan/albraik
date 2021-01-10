import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskStatus } from '../../../enum/TaskStatus';
import { TaskType } from '../../../enum/TaskType';
import { TaskModel } from '../../modal/task/task-model';
import { TaskService } from '../../service/task/task.service';
import { RespondDialogComponent } from './respond-dialog/respond-dialog.component';

@Component({
  selector: 'task-assigned-to-me',
  templateUrl: './task-assigned-to-me.component.html',
  styleUrls: ['./task-assigned-to-me.component.css']
})
export class TaskAssignedToMeComponent implements OnInit {
  displayedColumns: string[] = ['projectNumber', 'projectName', 'taskDescription', 'taskResponse', 'date', 'duration', 'assignee', 'priority', 'quickResponse'];
  tasks: TaskModel[];
  loading = true;
  constructor(private taskService: TaskService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    // this.tasks = [
    //   {
    //     projectId: 1923,
    //     projectName: 'قضية عبدالله الزمان راعي الرمان',
    //     taskDescription: 'المرجو معرفة سعر الرمان عند شيخ الزومان اللي خاس عنده من زمان .. اوكي مان؟',
    //     taskResponse: "I won't do it",
    //     dueDate: '1442/02/18',
    //     duration: 92,
    //     assigneeName: 'Asif Shaikh',
    //     priority: 'مستقر',
    //   },
    //   {
    //     projectId: 1923,
    //     projectName: 'قضية عبدالله الزمان راعي الرمان',
    //     taskDescription: 'المرجو معرفة سعر الرمان عند شيخ الزومان اللي خاس عنده من زمان .. اوكي مان؟',
    //     taskResponse: "I won't do it",
    //     dueDate: '1442/01/10',
    //     duration: 55,
    //     assigneeName: 'Abdul Aziz Shaikh',
    //     priority: 'مستقر',
    //   }
    // ];
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;
    this.taskService.getTaskAssignedToMe().subscribe((taskAssignedToMe: TaskModel[]) => {
      this.tasks = taskAssignedToMe;
      if (this.tasks) {
        this.assignDurationAndColor();
        this.sortByColor();
      }
      this.loading = false;
    });
  }

  assignDurationAndColor() {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let todayMilli = Date.parse(month.toString()+" "+day.toString()+" "+year.toString());
    this.tasks.forEach(task => {
      task['duration'] = (task.due_date - todayMilli) / 86400000;
      if (task.status === TaskStatus.COMPLETED || task.status === TaskStatus.LATE_COMPLETED) {
        task['response_text'] = task.task_reply.description;
        task['color'] = 'text-body';
        task['background_color'] = 'bg-light';
        task['link_color'] = '#007bff';
        task['display_respond_button'] = false;
      } else if (task.status === TaskStatus.IN_PROGRESS) {
        task['response_text'] = "-";
        task['display_respond_button'] = true;
        if (task['duration'] > 2) {
          task['color'] = 'text-white';
          task['background_color'] = 'bg-success';
          task['link_color'] = 'black';
        } else if (task['duration'] > 0) {
          task['color'] = 'text-body';
          task['background_color'] = 'bg-warning';
          task['link_color'] = '#007bff';
        } else {
          task['color'] = 'text-white';
          task['background_color'] = 'bg-danger';
          task['link_color'] = 'black';
        }
      }
      task.due_date = new Date(task.due_date).toLocaleDateString();
    });
  }

  sortByColor() {
    this.tasks.sort((a, b) => {
      return a['background_color'] === 'bg-light' ? -1 : 1; 
    });
  }

  openReplyDialog(taskId: number, isHidden: boolean) {
    let dialogRef = this.dialog.open(RespondDialogComponent, {
      data: {
        taskId: taskId,
        isHidden: isHidden
      }
    });
    dialogRef.afterClosed().subscribe(closed => {
      if (closed)
        this.loadTasks();
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
    dialogRef.afterClosed().subscribe(closed => {
      if (closed)
        this.loadTasks();
    });
  }

}
