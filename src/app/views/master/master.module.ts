import { NgModule } from '@angular/core';
import { MasterRoutingModule } from './master-routing.module';
import { SharedModule } from '../../share.module';
import { JobtitleMasterComponent } from './jobtitle-master/jobtitle-master.component';
import { DepartmentMasterComponent } from './department-master/department-master.component';
import {CompanyMasterComponent} from './company-master/company-master.component'
import { from } from 'rxjs';
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
@NgModule({
    declarations: [ CompanyFormsComponent,
        CompanyMasterComponent, CompanyDetailsComponent,RoleDetailsComponent,
        DepartmentMasterComponent,JobtitleMasterComponent, UserComponent, RoleMasterComponent, ProjectComponent, ProjectFormComponent, CaseComponent, ExecutedCaseComponent, DeedOwnershipComponent, CompanyEstablishmentComponent, InheritenceComponent, ProjectDtlComponent, CourtComponent],
    imports: [
      MasterRoutingModule,
      SharedModule,
      ShareComponentModule,
      ApplicationPipeModule
    ]
  })
export class MasterModule{}