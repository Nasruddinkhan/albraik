import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminRegistrationService } from '../service/admin-registration.service';
import { ToasterMsgService } from '../service/toaster-msg.service';
import { MustMatch } from '../service/must-match.service';
import { SnackbarComponent, SnackbarService } from '../service/snackbar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  loading = false;
  changeForm:FormGroup;
  isSubmitted = false;
  constructor(private router:Router,
              private fb:FormBuilder,
              private activeRoute: ActivatedRoute,
              private registerService : AdminRegistrationService,
              private toastService: ToasterMsgService,
              private snackService: SnackbarService){} 

  ngOnInit() {

 
    this.changeForm = this.fb.group({
      id:[''],
      password: ['',[Validators.required, Validators.minLength(8),  Validators.maxLength(16)]],
      confpassword: ['', [Validators.required]],
      isFtl:[false]
    },
     {
      validator: MustMatch('password', 'confpassword')
  });

  this.activeRoute.paramMap.subscribe(paramMap => {
    
    if (!paramMap.has('userID')) {
        return;
    }
    const userID = paramMap.get('userID');
    // console.log('read ',userID);
    this.changeForm.get('id').setValue(userID);
  });
  }

  get password() {
    return this.changeForm.get("password");
  }

  get confpassword() {
    return this.changeForm.get("confpassword");
  }

  // get f() { return this.changeForm.controls; }
  changePassword(){
    this.isSubmitted = true;
    if (this.changeForm.invalid) {
      return;
    }
    // console.log(JSON.stringify(this.changeForm.value));
    this.loading = true;
    this.registerService.changePassword(JSON.stringify(this.changeForm.value)).subscribe((res:any)=>{
     this.snackService.success('password changed successfully');
     this.router.navigate([`login`]);
     this.loading = false;
    },err=>{
      this.snackService.failure('INTERNAL ERROR');
      this.loading = false;
    })
  }
}
