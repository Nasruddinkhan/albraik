import { NgModule } from '@angular/core';
import { MasterRoutingModule } from './master-routing.module';
import { SharedModule } from '../../share.module';
import { JobtitleMasterComponent } from './jobtitle-master/jobtitle-master.component';
import { DepartmentMasterComponent } from './department-master/department-master.component';
import { CompanyMasterComponent } from './company-master/company-master.component';
import { CompanyDetailsComponent } from './company-master/company-details.component';
import { CompanyFormsComponent } from './company-master/company-forms.component';
import { UserComponent } from './user/user.component';
import { RoleMasterComponent } from './role-master/role-master.component';
import { ApplicationPipeModule } from '../../app.pipes.module';
import { RoleDetailsComponent } from './role-master/role-details.component';
import { ProjectComponent } from './project/project.component';
import { ProjectFormComponent } from './project/project-form.component';
import { ShareComponentModule } from '../../share.component';
import { CaseComponent } from './project/case/case.component';
import { ExecutedCaseComponent } from './project/executed-case/executed-case.component';
import { DeedOwnershipComponent } from './project/deed-ownership/deed-ownership.component';
import { CompanyEstablishmentComponent } from './project/company-establishment/company-establishment.component';
import { InheritenceComponent } from './project/inheritence/inheritence.component';
import { ProjectDtlComponent } from './project/project-dtl/project-dtl.component';
import { CourtComponent } from './court/court.component';
import { DeptDetailsComponent } from './department-master/dept-details/dept-details.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { AddJobtitleDialogComponent } from './jobtitle-master/add-jobtitle-dialog/add-jobtitle-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { SnackbarService } from '../service/snackbar.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EditJobtitleDialogComponent } from './jobtitle-master/edit-jobtitle-dialog/edit-jobtitle-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddDepartmentDialogComponent } from './department-master/add-department-dialog/add-department-department-dialog.component';
import { EditDepartmentDialogComponent } from './department-master/edit-department-dialog/edit-department-dialog.component';
import { AddCourtDialogComponent } from './court/add-court-dialog/add-court-dialog.component';
import { EditCourtDialogComponent } from './court/edit-court-dialog/edit-court-dialog.component';
import { AddUserDialogComponent } from './user/add-user-dialog/add-user-dialog.component';
import { EditUserDialogComponent } from './user/edit-user-dialog/edit-user-dialog.component';
import { AddRoleDialogComponent } from './role-master/add-role-dialog/add-role-dialog.component';

@NgModule({
    declarations: [ CompanyFormsComponent,
                   CompanyMasterComponent, 
                   CompanyDetailsComponent,
                   RoleDetailsComponent,
                   DepartmentMasterComponent,
        JobtitleMasterComponent, UserComponent, RoleMasterComponent, ProjectComponent, ProjectFormComponent, CaseComponent, ExecutedCaseComponent, DeedOwnershipComponent, CompanyEstablishmentComponent, InheritenceComponent, ProjectDtlComponent, CourtComponent, DeptDetailsComponent, AddJobtitleDialogComponent, EditJobtitleDialogComponent, AddDepartmentDialogComponent, EditDepartmentDialogComponent, AddCourtDialogComponent, EditCourtDialogComponent, AddUserDialogComponent, EditUserDialogComponent, AddRoleDialogComponent],
    entryComponents: [
      AddJobtitleDialogComponent,
      EditJobtitleDialogComponent,
      AddDepartmentDialogComponent,
      EditDepartmentDialogComponent,
      AddCourtDialogComponent,
      EditCourtDialogComponent,
      AddUserDialogComponent,
      AddRoleDialogComponent
    ],
    imports: [
      MasterRoutingModule,
      SharedModule,
      ShareComponentModule,
      ApplicationPipeModule,
      ReactiveFormsModule,
      MatInputModule,
      MatIconModule,
      MatTableModule,
      MatDialogModule,
      MatButtonModule,
      MatChipsModule,
      MatSnackBarModule,
      MatCheckboxModule,
      MatPaginatorModule,
      MatSelectModule
    ],
    providers: [
      MatDialog,
      SnackbarService
    ]
  })
export class MasterModule{}