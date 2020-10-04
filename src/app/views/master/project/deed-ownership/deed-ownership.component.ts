import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ProjectModel } from '../../../modal/project-model';
import { SubjectType } from '../../../modal/subject-type';
import { ProjectService } from '../../../service/project.service';

@Component({
  selector: 'app-deed-ownership',
  templateUrl: './deed-ownership.component.html',
  styleUrls: ['./deed-ownership.component.css']
})
export class DeedOwnershipComponent implements OnInit {


  action = 'Add';
  locale = 'ar';
  project:ProjectModel ;
  subType:SubjectType[];
  priorityList:any[];
  constructor( private localeService: BsLocaleService,
    private projectService: ProjectService) {
    this.localeService.use(this.locale);
    this.priorityList = [{'key':'low','value' : 'Low منخفض '},{'key':'medium', 'value' : 'Medium متوسط '},{'key':'high','value':'High ​​مرتفع'}];
    this.project = new ProjectModel('','',null
  ,'','','','', false);
 
   }

  ngOnInit(): void {
   this.getProjectType();
  }
  getProjectType(){
      this.projectService.getProjectType().subscribe((res:SubjectType[])=>{
        this.subType = res;
      })
  }
  onSubmit(form: NgForm){
   console.log(JSON.stringify(form.value));
  }
  changed(value : string){
    console.log(value);
  }

}
