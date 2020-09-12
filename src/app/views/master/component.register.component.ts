import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { CompanyRegistrationService } from '../service/company-registration.service';
import { MasterPages } from '../modal/master-page';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-master-company-register',
    templateUrl: './company.register.component.html'
  })
  export class CompanyRegisterComponent implements OnInit, OnDestroy{
    role: string;
    pageName : string;
    masterList : MasterPages[];
    private subscription: Subscription;
    constructor(private companyReg : CompanyRegistrationService){}
    ngOnInit() {
      this.role = sessionStorage.getItem("role");
      this.onLoads();
    }
    
    onLoads(){
      this.subscription = this.companyReg.getMasterPages(this.role).subscribe((res:MasterPages[])=>{
        this.masterList = res;
      });
    }

    changed(e: string){
      console.log(e);
      this.pageName = e;
    }

    ngOnDestroy(){
      this.masterList=[];
      this.subscription.unsubscribe();
      console.log('destroy component');
    }
  }
  