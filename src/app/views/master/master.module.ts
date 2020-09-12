import { NgModule } from '@angular/core';
import { CompanyRegisterComponent } from './component.register.component';
import { MasterRoutingModule } from './master-routing.module';
import { SharedModule } from '../../share.module';
import { JobtitleMasterComponent } from './jobtitle-master/jobtitle-master.component';
import { DepartmentMasterComponent } from './department-master/department-master.component';
import {CompanyMasterComponent} from './company-master/company-master.component'
import { from } from 'rxjs';
import { CompanyDetailsComponent } from './company-master/company-details.component';
import { CompanyFormsComponent } from './company-master/company-forms.component';
@NgModule({
    declarations: [CompanyRegisterComponent, CompanyFormsComponent,
        CompanyMasterComponent, CompanyDetailsComponent,
        DepartmentMasterComponent,JobtitleMasterComponent],
    imports: [
      MasterRoutingModule,
      SharedModule,
    ]
  })
export class MasterModule{}