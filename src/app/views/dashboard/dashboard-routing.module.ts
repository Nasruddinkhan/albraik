import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../service/auth-guard.service';

import { DashboardComponent } from './dashboard.component';
import { ProjectTaskListComponent } from './project-task-list/project-task-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Dashboard'
    }
    },
  {
    path: 'project-task-list/:projectIdAndName',
    data: {
      title: 'Project Task List'
    },
    component: ProjectTaskListComponent,
    canActivate: [AuthGuardService]
  }
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
