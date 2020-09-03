import { NgModule } from '@angular/core';
import { CompanyRegisterComponent } from './component.register.component';
import { JobtitleMasterComponent } from './jobtitle-master/jobtitle-master.component';
import { DepartmentMasterComponent } from './department-master/department-master.component';
import { CompanyMasterComponent } from './company-master/company-master.component';
import { MasterRoutingModule } from './master-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ApplicationPipeModule } from '../../app.pipes.module';
import { ShareComponentModule } from '../../share.component';


@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      MasterRoutingModule,
      ReactiveFormsModule,
      FormsModule,
      ToastrModule.forRoot(),
      ApplicationPipeModule,
      ShareComponentModule
    ],
    declarations: [ CompanyRegisterComponent, JobtitleMasterComponent, DepartmentMasterComponent, CompanyMasterComponent ]
  })
  export class MasterModule { }