import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { CaseModel } from '../../../modal/case-model';
import { ProjectModel } from '../../../modal/project-model';
import { SubjectType } from '../../../modal/subject-type';
import { ProjectService } from '../../../service/project.service';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})
export class CaseComponent implements OnInit {

  action = 'Add';
  locale = 'ar';
  project:ProjectModel ;
  casemodel:CaseModel;
  constructor( private localeService: BsLocaleService,
    private activeRoute: ActivatedRoute,
    private projectService: ProjectService) {
    this.localeService.use(this.locale);
   
  this.casemodel = new CaseModel;

   }

  ngOnInit(): void {
   this.activeRoute.paramMap.subscribe(paramMap => {
    if (!paramMap.has('project')) {
      return;
    }
    this.casemodel.project = JSON.parse(paramMap.get('project'));
    
   });
  }
 
  onSubmit(form: NgForm){
   console.log(JSON.stringify(form.value));
   this.casemodel.caseno = form.value.caseno;
   this.casemodel.courtName = form.value.courtName;
   this.casemodel.judgeName =  form.value.judgeName;
   this.casemodel.office = form.value.office
   this.casemodel.consultant = form.value.consultant;
   this.casemodel.consulantDate = form.value.consulantDate;
   this.casemodel.client = form.value.client;
   this.casemodel.clientPositionCourt = form.value.clientPositionCourt;
   this.casemodel.opposing = form.value.opposing;
   this.casemodel. oppPosiCourt = form.value. oppPosiCourt;
   this.casemodel. oppRepisenter = form.value. oppRepisenter
   console.log( JSON.stringify(this.casemodel));
  }
  changed(value : string){
    console.log(value);
  }

}
