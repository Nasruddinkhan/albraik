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
@NgModule({
    declarations: [ CompanyFormsComponent,
        CompanyMasterComponent, CompanyDetailsComponent,RoleDetailsComponent,
        DepartmentMasterComponent,JobtitleMasterComponent, UserComponent, RoleMasterComponent],
    imports: [
      MasterRoutingModule,
      SharedModule,
      ApplicationPipeModule
    ]
  })
export class MasterModule{}