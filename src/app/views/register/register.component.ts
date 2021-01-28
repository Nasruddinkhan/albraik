import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../service/must-match.service';
import { AdminRegistrationService } from '../service/admin-registration.service';
import { ToasterMsgService } from '../service/toaster-msg.service';
import { SnackbarService } from '../service/snackbar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',
  styleUrls:['register.component.css']

})
export class RegisterComponent  implements OnInit{
  loading = false;
  registerForm:FormGroup;
  isSubmitted = false;
  constructor(private router:Router,
              private fb:FormBuilder,
              private registerService : AdminRegistrationService,
              private toastService: ToasterMsgService,
              private snackbarService: SnackbarService){} 
             
 registerAdmin(){
   this.isSubmitted = true;
  if (this.registerForm.invalid) {
     return;
   }
   this.loading =   true;
   this.registerService.registerAdmin (JSON.stringify(this.registerForm.value)).subscribe((resp:any)=>{
    this.loading =   false;
    this.snackbarService.success("إضافة المستخدم بنجاح");
    // this.toastService.susessMessage('إضافة المستخدم بنجاح');
    this.router.navigate(["/register"]);
   },err=>{
    this.loading =   false;
    this.snackbarService.failure("Error: "+err.error.message);
    // this.toastService.errorMessage(err.error.message);
   });
   this.registerForm.reset();
   //this.registerForm.markAsPristine();
  // this.registerForm.markAsUntouched();
  }
  get f() { return this.registerForm.controls; }
  ngOnInit(){
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required,  Validators.minLength(12),Validators.pattern("^[\u0621-\u064A\u0660-\u0669 ]+$") ]],
      password: ['',[Validators.required, Validators.minLength(8),  Validators.maxLength(16)]],
      confpassword: ['', [Validators.required]],
      role:['ADMIN'],
      isActive:[true],
      isFtl:[true]
    },
     {
      validator: MustMatch('password', 'confpassword')
  });
  }
}
