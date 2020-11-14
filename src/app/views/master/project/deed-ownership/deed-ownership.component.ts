import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Subscription } from 'rxjs';
import { CourtModel } from '../../../modal/court';
import { DeedModel } from '../../../modal/deed-model';
import { ProjectModel } from '../../../modal/project-model';
import { SubjectType } from '../../../modal/subject-type';
import { CourtService } from '../../../service/court.service';
import { ProjectService } from '../../../service/project.service';
import { ToasterMsgService } from '../../../service/toaster-msg.service';

@Component({
  selector: 'app-deed-ownership',
  templateUrl: './deed-ownership.component.html',
  styleUrls: ['./deed-ownership.component.css']
})
export class DeedOwnershipComponent implements OnInit {

  action = 'Add';
  deedModel:DeedModel; 
  sucription:Subscription;
  courts: CourtModel[];
  constructor(private projectService: ProjectService, 
    private router: Router,
    private toster : ToasterMsgService,
    private courtService: CourtService,
    private activeRoute: ActivatedRoute) {
    this.deedModel = new DeedModel;
 
   }

  ngOnInit() {
    this.findAllCourt();
    this.activeRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('project')) {
        return;
      }
      this.deedModel.project = JSON.parse(paramMap.get('project'));
     
     });
  }
 
  onSubmit(form: NgForm){
  //  console.log(JSON.stringify(form.value));
   this.deedModel.projectDetailsId = null;
   this.deedModel.dooOfficeReference = form.value.dooOfficeReference;
   this.deedModel.dooCaseNumber = form.value.dooCaseNumber;
   this.deedModel.dooCaseObserverName = form.value.dooCaseObserverName;
   this.deedModel.dooCourtId =  form.value.dooCourtId;
   this.deedModel.dooReferentDate = form.value.dooReferentDate;
  //  console.log(JSON.stringify(this.deedModel));
   this.sucription = this.projectService.addDeedCase( this.deedModel).subscribe((res:DeedModel)=>{
    this.router.navigate([`/master/project`])
      this.toster.susessMessage('Add deed successfully');
      form.reset();  
    },err=>{
      this.toster.errorMessage(err.error.message);
    });
  }
  changed(value : string){
    // console.log(value);
  }

  findAllCourt() {
    this.courtService.findAllCourt().subscribe((res: CourtModel[]) => {
      this.courts = res;
    }, err => {
      this.courts = [];
    });
  }
}
