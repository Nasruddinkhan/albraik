import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-company-details',
    templateUrl: './company-details.component.html'
})
export class CompanyDetailsComponent implements OnInit{

    ngOnInit(){
        console.log('after click');
    }
}