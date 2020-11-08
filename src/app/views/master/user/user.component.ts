import { Component, OnInit ,  LOCALE_ID, Inject} from '@angular/core';
import { RoleService } from '../../service/role.service';
import { RoleModel } from '../../modal/role';
import { ToasterMsgService } from '../../service/toaster-msg.service';
import { DepartmentModel } from '../../modal/department';
import { DeptService } from '../../service/dept.service';
import { JobService } from '../../service/job.service';
import { JobTitleModel } from '../../modal/jobtitle';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { UserMaster } from '../../modal/user-master';
import { UserService } from '../../service/user.service';
import { checkNullEmpty } from '../../service/must-match.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  locale = 'ar';
  usr=[];
  locales = listLocales();
  userID: string;
  companyId : string;
  users : UserMaster[];
  loading = false;
  isSubmitted = false;
  constructor(private userService: UserService,
              private toastService: ToasterMsgService,
              private router: Router
              ) { 
              }
  ngOnInit() {
    this.userID  = sessionStorage.getItem("userId");
    this.companyId =  sessionStorage.getItem("companyId");
    if(checkNullEmpty( this.companyId )){
      this.router.navigate([`/master/company`]);
    }
    this.findAllUsers();
  }
  findAllUsers(){
    this.usr=[];
    this.loading = false
    this.userService.findAllUsers( ).subscribe((res:UserMaster[])=>{
      this.users = res;
      this.loading = false;
    },err=>{
     this.loading = false;
     this.users = [];
    });
  }
  onCheckboxChange(e) {
    if (e.target.checked) {
      this.usr.push(e.target.value);
    } else {
      this.usr.filter(item =>{
        console.log(e.target.value === item);
        if(e.target.value === item){
            const index: number = this.usr.indexOf(item);
            if (index !== -1) {
              this.usr.splice(index, 1);
             }
        } 
      });
    }
    this.usr = Array.from(new Set(this.usr));
  }
}
