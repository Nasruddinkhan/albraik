import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ColorEvent } from 'ngx-color';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { PrivilegeList } from './../../privilegeList';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['projectNumber', 'projectName', 'task', 'date', 'duration', 'assignee', 'priority', 'quickResponse'];
  tasks = [];
  addTaskDisabled = false;
  
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // generate random values for mainChart
    if (sessionStorage.getItem("privilegeList") !== null) {
      let userPrivileges = sessionStorage.getItem('privilegeList');
      if (!userPrivileges.includes(PrivilegeList.ASSIGN_A_TASK_TO_A_USER)) {
        this.addTaskDisabled = true;
      }
    }
    this.tasks = [
      {
        projectNumber: 1923,
        projectName: 'قضية عبدالله الزمان راعي الرمان',
        task: 'المرجو معرفة سعر الرمان عند شيخ الزومان اللي خاس عنده من زمان .. اوكي مان؟',
        date: '1442/02/18',
        duration: 92,
        assignee: 'Asif Shaikh',
        priority: 'مستقر',
      },
      {
        projectNumber: 1923,
        projectName: 'قضية عبدالله الزمان راعي الرمان',
        task: 'المرجو معرفة سعر الرمان عند شيخ الزومان اللي خاس عنده من زمان .. اوكي مان؟',
        date: '1442/01/10',
        duration: 55,
        assignee: 'Abdul Aziz Shaikh',
        priority: 'مستقر',
      }
    ];
    
  }

  openAddDialog() {
    this.dialog.open(AddTaskDialogComponent);
  }
  
}
