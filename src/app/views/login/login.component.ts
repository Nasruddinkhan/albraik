import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { ToasterMsgService } from '../service/toaster-msg.service';
import { checkNullEmpty } from '../service/must-match.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {
  isSubmit = false;
  username: string;
  password: string;
  loading = false;
  constructor(private router: Router,
             private loginService: LoginService,
             private toastService: ToasterMsgService) { }


  onRegisterCompany() {
    this.router.navigate(["/register"]);
  }

  async onSubmit(loginForm) {
    //console.log(JSON.stringify(loginForm.value))
    this.isSubmit = true;
    if (loginForm.invalid) {
      return
    }
    let userObj={username:loginForm.value.username,password:loginForm.value.password}
    console.table(userObj);
    this.loading = true;
    this.loginService.loginUser(userObj).then((loginUser:any)=>{
      sessionStorage.setItem('token',loginUser.token); 
      sessionStorage.setItem('role', loginUser.role);
      this.toastService.susessMessage('successfull login')
      this.loading =   false;
      if(!loginUser.isFtl && checkNullEmpty(loginUser.companyId))
          this.router.navigate([`/dashboard`]);
      if(loginUser.isFtl)
           this.router.navigate([`/changepassword/${loginUser.id}`]);
    },err=>{
      this.loading =   false;
      this.toastService.errorMessage(err.error.message);
    });
  }
}
