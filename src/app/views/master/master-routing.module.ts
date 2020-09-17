import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyFormsComponent } from './company-master/company-forms.component';
import { AuthGuardService } from '../service/auth-guard.service';
import { DepartmentMasterComponent } from './department-master/department-master.component';
import { JobtitleMasterComponent } from './jobtitle-master/jobtitle-master.component';
import { RoleMasterComponent } from './role-master/role-master.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Comapany'
    },
    children: [{
      path: '',
      redirectTo: 'company'
    }, {
      path: 'company',
      data: {
        title: 'Comapany'
      },
      component: CompanyFormsComponent,
      canActivate: [AuthGuardService]
    },
    {
      path: 'department',
      data: {
        title: 'Department'
      },
      component: DepartmentMasterComponent,
      canActivate: [AuthGuardService]
    },
    {
      path: 'jobtitle',
      data: {
        title: 'JobTitle'
      },
      component: JobtitleMasterComponent,
      canActivate: [AuthGuardService]
    },
    {
      path: 'role',
      data: {
        title: 'Role'
      },
      component: RoleMasterComponent,
      canActivate: [AuthGuardService]
    }
    ,
    {
      path: 'user',
      data: {
        title: 'User'
      },
      component: UserComponent,
      canActivate: [AuthGuardService]
    }

    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }