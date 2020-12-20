import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { PrivilegeList } from './../../enum/privilegeList';
import { MatTabGroup } from '@angular/material/tabs';
import { Subscription } from 'rxjs';
import { TaskAssignedByMeComponent } from './task-assigned-by-me/task-assigned-by-me.component';
import { TaskAssignedToMeComponent } from './task-assigned-to-me/task-assigned-to-me.component';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['projectNumber', 'projectName', 'task', 'date', 'duration', 'assignee', 'priority', 'quickResponse'];
  tasks: any[];
  addTaskDisabled = false;
  taskAssignedByMeTabDisabled = false;
  addTaskSubscription: Subscription;
  @ViewChild('tabGroup', { static: true }) tabGroup: MatTabGroup;
  @ViewChild(TaskAssignedByMeComponent, { static: false }) private taskAssignedByMeComponent: TaskAssignedByMeComponent;
  @ViewChild(TaskAssignedToMeComponent, { static: false }) private taskAssignedToMeComponent: TaskAssignedByMeComponent;
  
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // generate random values for mainChart
    this.tabGroup.selectedIndex = 2;
    if (sessionStorage.getItem("privilegeList") !== null) {
      let userPrivileges = sessionStorage.getItem('privilegeList');
      if (!userPrivileges.includes(PrivilegeList.ASSIGN_A_TASK_TO_A_USER)) {
        this.addTaskDisabled = true;
        this.taskAssignedByMeTabDisabled = true;
      }
    }
    // this.findAllTask();
    // this.tasks = [
    //   {
    //     projectNumber: 1923,
    //     projectName: 'قضية عبدالله الزمان راعي الرمان',
    //     task: 'المرجو معرفة سعر الرمان عند شيخ الزومان اللي خاس عنده من زمان .. اوكي مان؟',
    //     date: '1442/02/18',
    //     duration: 92,
    //     assignee: 'Asif Shaikh',
    //     priority: 'مستقر',
    //   },
    //   {
    //     projectNumber: 1923,
    //     projectName: 'قضية عبدالله الزمان راعي الرمان',
    //     task: 'المرجو معرفة سعر الرمان عند شيخ الزومان اللي خاس عنده من زمان .. اوكي مان؟',
    //     date: '1442/01/10',
    //     duration: 55,
    //     assignee: 'Abdul Aziz Shaikh',
    //     priority: 'مستقر',
    //   }
    // ];
    
  }

  ngOnDestroy() {
    if (this.addTaskSubscription)
      this.addTaskSubscription.unsubscribe();
  }

  calculateDuration() {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let todayMilli = Date.parse(month.toString()+" "+day.toString()+" "+year.toString());
    this.tasks.forEach(task => {
      task['duration'] = (task.due_date - todayMilli) / 86400000;
      if (task['duration'] > 2) {
        task['color'] = 'bg-success';
      } else if (task['duration'] > 0) {
        task['color'] = 'bg-warning';
      } else {
        task['color'] = 'bg-danger';
      }
      task.due_date = new Date(task.due_date).toLocaleDateString();
    });
  }

  openAddDialog() {
    let dialogRef = this.dialog.open(AddTaskDialogComponent);
    this.addTaskSubscription = dialogRef.componentInstance.onSubmitClicked.subscribe((closed: boolean) => {
      if (closed) {
        
      }
    });
  }

  refreshTable() {
    this.taskAssignedByMeComponent.loadTasks();
    this.taskAssignedToMeComponent.loadTasks();
  }
  
}
