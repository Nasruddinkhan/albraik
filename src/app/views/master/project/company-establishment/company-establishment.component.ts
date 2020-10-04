import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ProjectModel } from '../../../modal/project-model';
import { SubjectType } from '../../../modal/subject-type';
import { ProjectService } from '../../../service/project.service';

@Component({
  selector: 'app-company-establishment',
  templateUrl: './company-establishment.component.html',
  styleUrls: ['./company-establishment.component.css']
})
export class CompanyEstablishmentComponent implements OnInit {
  action = 'Add';
  project:ProjectModel ;
  subType:SubjectType[];
  priorityList:any[];
  constructor( private localeService: BsLocaleService,
    private projectService: ProjectService) {
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
