import { Component, ViewChild, OnDestroy } from '@angular/core';
import { CompanyMasterComponent } from './company-master/company-master.component';
import { DepartmentMasterComponent } from './department-master/department-master.component';
import { JobtitleMasterComponent } from './jobtitle-master/jobtitle-master.component';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-master-company-register',
    templateUrl: './company.register.component.html'
  })
  export class CompanyRegisterComponent implements OnDestroy {
    @ViewChild(CompanyMasterComponent) master;
    @ViewChild(DepartmentMasterComponent) departmentMaster; 
    @ViewChild(JobtitleMasterComponent) jobTitle; 
    constructor(private toastr:ToastrService) { }
  
  
      getDtata() {
      /*   this.toastr.error('check toaster', 'Internal Errors', {
          positionClass: 'toast-bottom-right'
        }); */
        
        if(!this.master.companyForm.value['isError'])
            this.validateErrors('تعبئة جميع الحقول الإلزامية للشركة');
        // else if(!this.departmentMaster.departmentForm.value['isError'])
        // this.validateErrors('تعبئة جميع الحقول الإلزامية للشركة');
        // else if(!this.jobTitle.jobTitileForm.value['isError'])
        // this.validateErrors('تعبئة جميع الحقول الإلزامية للشركة');
        else{
   
        this.master.companyMst.departments = this.departmentMaster.departmentForm.value.department_names.map(item=> item.departments);
        this.master.companyMst.jobTittle = this.jobTitle.jobTitileForm.value.jobtittle_names.map(item=> item.jobtittle);
        console.log(JSON.stringify( this.master.companyMst));

        }
      }
      validateErrors(isErrorMsg:string){
        this.toastr.error(isErrorMsg, 'أخطاء التحقق من الصحة', {
          positionClass: 'toast-bottom-left'
        });
      }
      ngOnDestroy(){
        
      }
  }
  