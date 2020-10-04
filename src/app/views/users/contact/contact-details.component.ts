import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-contact-details',
    templateUrl: './contact-details.component.html'
})
export class ContactDetailsComponent implements OnInit{

    ngOnInit(){
        console.log('after click');
    }
}