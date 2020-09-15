import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { RoleMaster  } from '../../modal/role-master'
import { ToasterMsgService } from '../../service/toaster-msg.service';
import { RoleService } from '../../service/role.service';
import { RoleModel } from '../../modal/role';
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
    this.findAllRoles();
    this.roleForm = this.fb.group({
      role_names: this.fb.array([this.fb.group({role:''})])
    })
  }
  findAllRoles(){
    this.loading = false
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
    this.roleNames.push(this.fb.group({role:''}));
  }

  deleteRole(index) {
    this.roleNames.removeAt(index);
  }
  onSubmit(){
    console.log('jobtitle onSubmit');
    this.name = new Array<String>();
    this.roleForm.value['role_names'].map(item => {
      this.name.push(item.role);
    });
    this.roleMst = new RoleMaster(this.userID,  this.companyId, this.name);
    this.loading = true;
    this.roleService.createRole( this.roleMst).subscribe((res:RoleModel[])=>{
      this.loading = false;
      this.roleForm.reset();
      this.toastService.susessMessage('role created successfully')
      this.findAllRoles();
    },err=>{
      this.loading = false;
      this.toastService.errorMessage(err.error.message);
      this.findAllRoles();
    });
  }
}
