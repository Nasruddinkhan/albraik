import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../share.module';
import { MatTableModule } from '@angular/material/table';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatTabsModule } from '@angular/material/tabs';
import { TaskAssignedToMeComponent } from './task-assigned-to-me/task-assigned-to-me.component';
import { TaskAssignedByMeComponent } from './task-assigned-by-me/task-assigned-by-me.component';
import { ProjectTaskListComponent } from './project-task-list/project-task-list.component';
import { RespondDialogComponent } from './task-assigned-to-me/respond-dialog/respond-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatTabsModule
  ],
  entryComponents: [
    AddTaskDialogComponent,
    RespondDialogComponent
  ],
  declarations: [ DashboardComponent, AddTaskDialogComponent, TaskAssignedToMeComponent, TaskAssignedByMeComponent, ProjectTaskListComponent, RespondDialogComponent ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class DashboardModule { }
