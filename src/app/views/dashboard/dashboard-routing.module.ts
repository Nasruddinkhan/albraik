import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../service/auth-guard.service';

import { DashboardComponent } from './dashboard.component';
import { ProjectTaskAttachmentComponent } from './project-task/project-task-attachment/project-task-attachment.component';
import { ProjectTaskListComponent } from './project-task/project-task-list/project-task-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'project/:projectIdAndName',
    children: [
      {
        path: 'task-list',
        data: {
          title: 'Project Task List'
        },
        component: ProjectTaskListComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'attachment-list',
        data: {
          title: 'Project Task Attachment'
        },
        component: ProjectTaskAttachmentComponent,
        canActivate: [AuthGuardService]
      }
    ]
  }
  // {
  //   path: 'project-task/:projectIdAndName/list',
  //   data: {
  //     title: 'Project Task List'
  //   },
  //   component: ProjectTaskListComponent,
  //   canActivate: [AuthGuardService]
  // },
  // {
  //   path: 'project-task/:projectIdAndName/attachment',
  //   data: {
  //     title: 'Project Task Attachment'
  //   },
  //   component: ProjectTaskAttachmentComponent,
  //   canActivate: [AuthGuardService]
  // },

    // children: [{
    //   path: '',
    //   redirectTo: 'dashboard',
    //   pathMatch: 'full'
    // }, {
    //   path: 'project-task-list/:projectId',
    //   data: {
    //     title: 'Project Task List'
    //   },
    //   component: ProjectTaskListComponent,
    //   canActivate: [AuthGuardService]
    // }
    // ]
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
