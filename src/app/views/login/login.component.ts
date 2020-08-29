import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  constructor(private router:Router){}

  onSubmit(){
    console.log('logiin component');
    this.router.navigate(["/dashboard"]);
  }

 }
