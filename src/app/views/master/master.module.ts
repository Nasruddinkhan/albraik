import { NgModule } from '@angular/core';
import { MasterRoutingModule } from './master-routing.module';
import { SharedModule } from '../../share.module';
import { JobtitleMasterComponent } from './jobtitle-master/jobtitle-master.component';
import { DepartmentMasterComponent } from './department-master/department-master.component';
import { CompanyMasterComponent } from './company-master/company-master.component';
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
import { MatRadioModule } from '@angular/material/radio';
import { EditJobtitleDialogComponent } from './jobtitle-master/edit-jobtitle-dialog/edit-jobtitle-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddDepartmentDialogComponent } from './department-master/add-department-dialog/add-department-department-dialog.component';
import { EditDepartmentDialogComponent } from './department-master/edit-department-dialog/edit-department-dialog.component';
import { AddCourtDialogComponent } from './court/add-court-dialog/add-court-dialog.component';
import { EditCourtDialogComponent } from './court/edit-court-dialog/edit-court-dialog.component';
import { AddUserDialogComponent } from './user/add-user-dialog/add-user-dialog.component';
import { EditUserDialogComponent } from './user/edit-user-dialog/edit-user-dialog.component';
import { AddRoleDialogComponent } from './role-master/add-role-dialog/add-role-dialog.component';
import { AddProjectDialogComponent } from './project/add-project-dialog/add-project-dialog.component';
import { AddCompanyDialogComponent } from './company-master/add-company-dialog/add-company-dialog.component';
import { AddCaseComponent } from './project/add-project-dialog/add-case/add-case.component';
import { EditRoleDialogComponent } from './role-master/edit-role-dialog/edit-role-dialog.component';
import { EstablishCompanyComponent } from './project/add-project-dialog/establish-company/establish-company.component';
import { DeedOfOwnershipComponent } from './project/add-project-dialog/deed-of-ownership/deed-of-ownership.component';
import { AddExecutedCaseComponent } from './project/add-project-dialog/add-executed-case/add-executed-case.component';
import { InheritanceComponent } from './project/add-project-dialog/inheritance/inheritance.component';

@NgModule({
    declarations: [ 
                   CompanyMasterComponent,
                   RoleDetailsComponent,
                   DepartmentMasterComponent,
        JobtitleMasterComponent, UserComponent, RoleMasterComponent, ProjectComponent, ProjectFormComponent, CaseComponent, ExecutedCaseComponent, DeedOwnershipComponent, CompanyEstablishmentComponent, InheritenceComponent, ProjectDtlComponent, CourtComponent, DeptDetailsComponent, AddJobtitleDialogComponent, EditJobtitleDialogComponent, AddDepartmentDialogComponent, EditDepartmentDialogComponent, AddCourtDialogComponent, EditCourtDialogComponent, AddUserDialogComponent, EditUserDialogComponent, AddRoleDialogComponent, AddProjectDialogComponent, AddCompanyDialogComponent, AddCaseComponent, EditRoleDialogComponent, EstablishCompanyComponent, DeedOfOwnershipComponent, AddExecutedCaseComponent, InheritanceComponent],
    entryComponents: [
      AddJobtitleDialogComponent,
      EditJobtitleDialogComponent,
      AddDepartmentDialogComponent,
      EditDepartmentDialogComponent,
      AddCourtDialogComponent,
      EditCourtDialogComponent,
      AddUserDialogComponent,
      AddRoleDialogComponent,
      AddProjectDialogComponent,
      AddCompanyDialogComponent,
      AddCaseComponent,
      EstablishCompanyComponent,
      DeedOfOwnershipComponent,
      AddExecutedCaseComponent,
      InheritanceComponent,
      EditRoleDialogComponent
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
      MatSelectModule,
      MatRadioModule
    ],
    providers: [
      MatDialog,
      SnackbarService
    ]
  })
export class MasterModule{}