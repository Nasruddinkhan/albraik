import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { from, Subscription } from 'rxjs';
import { ProjectModel } from '../../modal/project-model';
import { SubjectType } from '../../modal/subject-type';
import { ProjectService } from '../../service/project.service';
import { checkNullEmpty } from '../../service/must-match.service';
import { ToasterMsgService } from '../../service/toaster-msg.service';
import { UserMaster } from '../../modal/user-master';
import { UserService } from '../../service/user.service';
@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit, OnDestroy {
  action = 'Add';
  locale = 'ar';
  project:ProjectModel ;
  subType:SubjectType[];
  priorityList:any[];
  type: string = null;
  userId: string;
  subription: Subscription;
  users : UserMaster[];
  constructor(private router: Router,
    private toster : ToasterMsgService,
    private userService: UserService,
    private localeService: BsLocaleService,
    private projectService: ProjectService) {
    this.localeService.use(this.locale);
    this.priorityList = [{'key':'low','value' : 'Low منخفض '},{'key':'medium', 'value' : 'Medium متوسط '},{'key':'high','value':'High ​​مرتفع'}];
    this.project = new ProjectModel('','',null
  ,'','','','', false);
 
   }
  ngOnDestroy(){
     this.subription.unsubscribe();
     this.project = null;
     this.subType = null;
     this.priorityList = null;
     this.type = null;
     this.userId = null;
     this.users  = null;
     this.router = null;
     this.projectService = null;
     this.toster = null;
     this.userService = null;
     this.localeService = null;
     console.log('clear all refrence data');

  }
  ngOnInit(): void {
   this.getProjectType();
   this.getUsers();
   this.userId = sessionStorage.getItem("userId");
  }
  getUsers() {
    this.subription = this.userService.findAllUsers().subscribe((userres:UserMaster[])=>{
      this.users = userres;
    });
  }
  getProjectType(){
    this.subription = this.projectService.getProjectType().subscribe((res:SubjectType[])=>{
        this.subType = res;
      })
  }
  onSubmit(form: NgForm){
    this.project.projectId = null;
    this.project.projectTypeId = form.value.projectTypeId;
    this.project.name =  form.value.name;
    this.project.startDate = form.value.startDate;
    this.project.comment =  form.value.comment;
    this.project.drawerNumber = form.value.drawerNumber;
    this.project.hiddinProject = form.value.hiddinProject;
    this.project.priority = form.value.priority;
    this.project.managerId = form.value.managerId;
    this.project.objective = form.value.objective;
    this.project.createdBy = this.userId;
    if(!checkNullEmpty(this.type)){
      this.router.navigate([`/master/${this.type}`,{'project':JSON.stringify(this.project)}]);
      return;
    }
    this.projectService.addProjectTask(this.project).subscribe((res:ProjectModel)=>{
      
      this.router.navigate([`/master/project`])
      this.toster.susessMessage('Add task successfully');
      form.reset();  
    },err=>{
      this.toster.errorMessage(err.error.message);
    });
    console.log(this.userId);
  }
  changedProjectType(value:string){
    console.log(value);
    switch(value){
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
       // inherit    
  }  
  
}
  
}
