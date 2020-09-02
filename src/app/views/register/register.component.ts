import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../service/must-match.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',
  styleUrls:['register.component.css']

})
export class RegisterComponent  implements OnInit{
  registerForm:FormGroup;
  isSubmitted = false;
  constructor(private router:Router,
              private fb:FormBuilder){} 
             
 registerAdmin(){
   this.isSubmitted = true;
  if (this.registerForm.invalid) {
     return;
   }
   console.log( JSON.stringify(this.registerForm.value));
    //this.router.navigate(["/companyregister"]);
  }
  get f() { return this.registerForm.controls; }
  ngOnInit(){
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required,  Validators.minLength(12),Validators.pattern("^[\u0621-\u064A\u0660-\u0669 ]+$") ]],
      password: ['',[Validators.required, Validators.minLength(8),  Validators.maxLength(16)]],
      confpassword: ['', [Validators.required]],
    },
     {
      validator: MustMatch('password', 'confpassword')
  });
  }
}
