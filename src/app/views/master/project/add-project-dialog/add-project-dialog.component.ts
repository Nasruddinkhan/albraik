import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Subscription } from 'rxjs';
import { ProjectModel } from '../../../modal/project-model';
import { SubjectType } from '../../../modal/subject-type';
import { UserMaster } from '../../../modal/user-master';
import { DialogSubmissionService } from '../../../service/dialog-submission.service';
import { ProjectService } from '../../../service/project.service';
import { SnackbarService } from '../../../service/snackbar.service';
import { UserService } from '../../../service/user.service';
import { AddExecutedCaseComponent } from './add-executed-case/add-executed-case.component';
import { DeedOfOwnershipComponent } from './deed-of-ownership/deed-of-ownership.component';
import { AddCaseComponent } from './add-case/add-case.component';
import { EstablishCompanyComponent } from './establish-company/establish-company.component';
import { InheritanceComponent } from './inheritance/inheritance.component';

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
  type = null;

  constructor(private userService: UserService,
              private projectService: ProjectService,
              private fb: FormBuilder,
              private localeService: BsLocaleService,
              private dialogSubmissionService: DialogSubmissionService,
              private snackbar: SnackbarService,
              private dialog: MatDialog) {
                this.localeService.use(this.locale); 
                this.project = new ProjectModel('','',null,'','','','','', false);
              }

  ngOnInit(): void {
    this.dialogSubmissionService.setDialogSubmitted(false);
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
      comment: ['', Validators.required],
      hiddenProject: ['']
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

  get hiddenProject() {
    return this.addProjectForm.get('hiddenProject');
  }

  getUsers() {
    this.subscription = this.userService.findAllUsers().subscribe((userres: UserMaster[])=>{
      this.users = userres;
    });
  }

  getProjectType(){
    this.subscription = this.projectService.getProjectType().subscribe((res: SubjectType[])=>{
        this.subType = res;
        console.log(this.subType);
    });
  }
  
  changeProjectType() {
    switch(this.projectType.value){
      case "a2bd22d5-2703-444d-9628-b2fb040df14d":
        this.type =  "case";
        break;
       case "ad76b91b-954c-4a1e-a843-f0cc0427d883":
        this.type =  "company-establishment";
        break;
        case "8ae2e821-be58-44c9-8d9f-bfe74da56ee2":
          this.type =  "deed-ownership";
          break;
        case "17c65cd8-c5eb-437e-a268-77e5ea75b661":
          this.type =  "executed-case";
          break;
        case "a2617168-6cfc-4227-b37b-3270264c6858":
          this.type =  "inherit";
          break;
      default:
        this.type =  null ;
    } 
  }

  onSubmit() {
    this.setProjectValues();
    console.log(this.project);
    this.projectService.addProjectTask(this.project).subscribe((res: ProjectModel)=>{
      this.dialogSubmissionService.setDialogSubmitted(true);
      this.snackbar.success('.Task added successfully');
    },err=>{
      this.snackbar.failure(err.error.message);
    });
  }

  next() {
    this.setProjectValues();
    this.dialogSubmissionService.setData(this.project);
    switch (this.type) {
      case "case": 
        this.dialog.open(AddCaseComponent);
        break;
      case "company-establishment": 
        this.dialog.open(EstablishCompanyComponent);
        break;
      case "deed-ownership":
        this.dialog.open(DeedOfOwnershipComponent);
        break;
      case "executed-case":
        this.dialog.open(AddExecutedCaseComponent);
      case "inherit":
        this.dialog.open(InheritanceComponent);
    }
  }

  setProjectValues() {
    this.project.projectId = null;
    this.project.projectTypeId = this.projectType.value;
    this.project.name =  this.name.value;
    this.project.startDate = this.startDate.value;
    this.project.comment =  this.comment.value;
    this.project.drawerNumber = this.drawerNumber.value;
    this.project.hiddinProject = this.hiddenProject.value ? this.hiddenProject.value : false;
    this.project.priority = this.priority.value;
    this.project.managerId = this.manager.value;
    this.project.objective = this.objective.value;
    this.project.createdBy = this.userId;
    this.project.companyId = this.companyId;
  }

}
