import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { RoleMaster  } from '../../modal/role-master'
import { ToasterMsgService } from '../../service/toaster-msg.service';
import { RoleService } from '../../service/role.service';
import { RoleModel } from '../../modal/role';
import { checkNullEmpty } from '../../service/must-match.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-role-master',
  templateUrl: './role-master.component.html',
  styleUrls: ['./role-master.component.css']
})
export class RoleMasterComponent implements OnInit {
  loading = false;
  roleForm: FormGroup;
  roleMst: RoleMaster;
  name: Array<String>;
  constructor(private fb: FormBuilder,
    private toastService: ToasterMsgService,
    private router : Router,
    private roleService: RoleService) { }
  userID: string;
  companyId : string;
  roles:RoleModel[];
  pageNo = 1;
  bigTotalItems: number;
  numPages: number = 0;
  maxSize: number = 5;
  ngOnInit() {
    this.userID  = sessionStorage.getItem("userId");
    this.companyId =  sessionStorage.getItem("companyId");
    if(checkNullEmpty( this.companyId )){
      this.router.navigate([`/master/company`]);
    }
    this.findAllRoles();
    this.roleForm = this.fb.group({
      role_names: this.fb.array([this.fb.group({role:''})])
    })
  }
  findAllRoles(){
    this.loading = true
    this.roleService.findAllRoles( this.userID).subscribe((res:RoleModel[])=>{
      this.roles = res;
      this.loading = false;
      this.bigTotalItems = res.length;
    },err=>{
      this.roles = [];
      this.loading = false;
    });
  }

  get roleNames() {
    return this.roleForm.get('role_names') as FormArray;
  }

  addRole() {
    this.roleNames.push(this.fb.group({role: this.roleNames.controls[0].value.role}));
  }

  deleteRole(index) {
    this.roleNames.removeAt(index);
  }

  displayAddRoleField() {
    let icons = document.getElementById("icons");
    icons.style.display = "none";
    let addRoleField = document.getElementById("addRoleField");
    addRoleField.style.display = "block";
  }

  displayIcons() {
    let addRoleField = document.getElementById("addRoleField");
    addRoleField.style.display = "none";
    let icons = document.getElementById("icons");
    icons.style.display = "block";
  }

  onSubmit(){
    this.roleNames.push(this.fb.group({role: this.roleNames.controls[0].value.role}));
    console.log(this.roleNames.controls[1].value.role);
    // console.log('jobtitle onSubmit');
    // this.name = new Array<String>();
    // this.roleForm.value['role_names'].map(item => {
    //   this.name.push(item.role);
    // });
    // this.roleMst = new RoleMaster(this.userID,  this.companyId, this.name);
    // this.loading = true;
    // this.roleService.createRole( this.roleMst).subscribe((res:RoleModel[])=>{
    //   this.loading = false;
    //   this.roleForm.reset();
    //   this.toastService.susessMessage('role created successfully')
    //   this.findAllRoles();
    // },err=>{
    //   this.loading = false;
    //   this.toastService.errorMessage(err.error.message);
    //   this.findAllRoles();
    // });
  }
}
