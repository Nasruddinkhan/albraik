import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../service/auth-guard.service';
import { DepartmentMasterComponent } from './department-master/department-master.component';
import { JobtitleMasterComponent } from './jobtitle-master/jobtitle-master.component';
import { RoleMasterComponent } from './role-master/role-master.component';
import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';
import { P404Component } from '../error/404.component';
// import { ProjectFormComponent } from './project/project-form.component';
import { CaseComponent } from './project/case/case.component';
import { ExecutedCaseComponent } from './project/executed-case/executed-case.component';
import { DeedOwnershipComponent } from './project/deed-ownership/deed-ownership.component';
import { CompanyEstablishmentComponent } from './project/company-establishment/company-establishment.component';
import { InheritenceComponent } from './project/inheritence/inheritence.component';
import { CourtComponent } from './court/court.component';
import { CompanyMasterComponent } from './company-master/company-master.component';

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
      component: CompanyMasterComponent,
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
    ,
    {
      path: 'project',
      data: {
        title: 'Project'
      },
      component: ProjectComponent,
      canActivate: [AuthGuardService]
    },{
      path:'unathurise',
      data: {
        title: 'Project'
      },
      component: P404Component,
      canActivate: [AuthGuardService]
    },
    // {
    //   path:'createcase',
    //   data: {
    //     title: 'Project'
    //   },
    //   component: ProjectFormComponent,
    //   canActivate: [AuthGuardService]
    // },
    {
      path:'case',
      data: {
        title: 'Case'
      },
      component: CaseComponent,
      canActivate: [AuthGuardService]
    },
    {
      path:'executed-case',
      data: {
        title: 'Executed-Case'
      },
      component: ExecutedCaseComponent,
      canActivate: [AuthGuardService]
    },
    {
      path:'deed-ownership',
      data: {
        title: 'Deed-Ownership'
      },
      component: DeedOwnershipComponent,
      canActivate: [AuthGuardService]
    }   
    ,
    {
      path:'company-establishment',
      data: {
        title: 'company establishment'
      },
      component: CompanyEstablishmentComponent, 
      canActivate: [AuthGuardService]
    } ,
    {
      path:'inherit',
      data: {
        title: 'inherit'
      },
      component: InheritenceComponent,
      canActivate: [AuthGuardService]
    } ,
    {
      path:'court',
      data: {
        title: 'court'
      },
      component: CourtComponent,
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