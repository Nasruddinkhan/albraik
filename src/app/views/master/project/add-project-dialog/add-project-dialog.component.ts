import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Subscription } from 'rxjs';
import { ProjectModel } from '../../../modal/project-model';
import { SubjectType } from '../../../modal/subject-type';
import { UserMaster } from '../../../modal/user-master';
import { ProjectService } from '../../../service/project.service';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-add-project-dialog',
  templateUrl: './add-project-dialog.component.html',
  styleUrls: ['./add-project-dialog.component.css']
})
export class AddProjectDialogComponent implements OnInit {
  userId: string;
  companyId: string;
  locale = 'ar';
  project:ProjectModel;
  subType:SubjectType[];
  subscription: Subscription;
  users : UserMaster[];
  priorityList:any[];
  addProjectForm: FormGroup;

  constructor(private userService: UserService,
              private projectService: ProjectService,
              private fb: FormBuilder,
              private localeService: BsLocaleService) {
                this.localeService.use(this.locale); 
                this.project = new ProjectModel('','',null,'','','','','', false);
              }

  ngOnInit(): void {
    this.getProjectType();
    this.getUsers();
    this.userId = sessionStorage.getItem("userId");
    this.companyId =  sessionStorage.getItem("companyId");
    this.addProjectForm = this.fb.group({
      projectType: ['', Validators.required],
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      priority: ['', Validators.required],
      manager: ['', Validators.required],
      drawerNumber: ['', Validators.required],
      objective: ['', Validators.required],
      comment: ['', Validators.required]
    });
    this.priorityList = [{'key':'low','value' : 'Low منخفض '},{'key':'medium', 'value' : 'Medium متوسط '},{'key':'high','value':'High ​​مرتفع'}];
  }

  get projectType() {
    return this.addProjectForm.get('projectType');
  }

  get name() {
    return this.addProjectForm.get('name');
  }

  get startDate() {
    return this.addProjectForm.get('startDate');
  }

  get priority() {
    return this.addProjectForm.get('priority');
  }

  get manager() {
    return this.addProjectForm.get('manager');
  }

  get drawerNumber() {
    return this.addProjectForm.get('drawerNumber');
  }

  get objective() {
    return this.addProjectForm.get('objective');
  }

  get comment() {
    return this.addProjectForm.get('comment');
  }

  getUsers() {
    this.subscription = this.userService.findAllUsers().subscribe((userres: UserMaster[])=>{
      this.users = userres;
    });
  }

  getProjectType(){
    this.subscription = this.projectService.getProjectType().subscribe((res: SubjectType[])=>{
        this.subType = res;
    });
  }
  

}
