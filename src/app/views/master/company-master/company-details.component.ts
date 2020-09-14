import { Component, OnInit, Input } from '@angular/core';
import { CompanyMaster } from '../../modal/company-master';

@Component({
    selector: 'app-company-details',
    templateUrl: './company-details.component.html'
})
export class CompanyDetailsComponent implements OnInit{
    @Input('commpanyMst') companyMaster: CompanyMaster;
    ngOnInit(){
    }
}