import { Component, OnInit,TemplateRef  } from '@angular/core';
import { Router } from '@angular/router';
import { ColorSketchModule } from 'ngx-color/sketch';
import { ProjectModel } from '../../modal/project-model';
import { ProjectService } from '../../service/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  caseList:ProjectModel[];
  constructor(private router: Router,
              private projectService: ProjectService) { }
  searchText: string;
  pageNo = 1;
  bigTotalItems: number;
  numPages: number = 0;
  maxSize: number = 5;
  userid:string;
   projectList=[]; 
  ngOnInit(): void {
    this.userid = sessionStorage.getItem("userId");
    this.findAllTask();
  }
  createCase() {
    this.router.navigate([`/master/createcase`]);
  
  }
  pageChanged(event: any): void {
    this.pageNo = event.page;
    this.findAllTask();
  }

  findAllTask(){
    this.projectService.findAllTask(this.userid,this.pageNo).subscribe((res:any)=>{
      this.projectList=res.content;
      console.log(this.projectList);
     this.bigTotalItems = res.totalElements;
    });
  }
}
