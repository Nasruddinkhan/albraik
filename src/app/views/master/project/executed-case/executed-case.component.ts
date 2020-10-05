import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Subscription } from 'rxjs';
import { VerditModel } from '../../../modal/verdict-model';
import { ProjectService } from '../../../service/project.service';
import { ToasterMsgService } from '../../../service/toaster-msg.service';
enum VeditType  { V, I, NONE };
@Component({
  selector: 'app-executed-case',
  templateUrl: './executed-case.component.html',
  styleUrls: ['./executed-case.component.css']
})
export class ExecutedCaseComponent implements OnInit {

  action = 'Add';
  locale = 'ar';
  verdit:VerditModel;
  verditcheckboxtype = VeditType;
  verditcurrentlyChecked: VeditType;
  sucription: Subscription;
  includeWork:string;
  Verified:string;
  constructor( private localeService: BsLocaleService,
    private projectService: ProjectService, 
    private router: Router,
    private toster : ToasterMsgService,
    private activeRoute: ActivatedRoute) {
    this.localeService.use(this.locale);
   this.verdit =new VerditModel; 
 
   }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('project')) {
        return;
      }
      this.verdit.project = JSON.parse(paramMap.get('project'));
      
     });
  }
  selectVerditCheckBox(targetType: VeditType) {
    if(this.verditcurrentlyChecked === targetType) {
      this.verditcurrentlyChecked = VeditType.NONE;
      return;
    }
    this.verditcurrentlyChecked = targetType;
     console.log(this.verditcurrentlyChecked);
  }
  onSubmit(form: NgForm){
   console.log(JSON.stringify(form.value));
   this.verdit.projectDetailsId=null;
   this.verdit.verdictExecutedCaseId= form.value.verdictExecutedCaseId;
   this.verdit.verdictNumber = form.value.verdictNumber;
   this.verdit.verdictDate =form.value.verdictDate;
   this.verdit.verdictDecisionDate = form.value.verdictDecisionDate;
   this.verdit.verdictType = this.verditcurrentlyChecked?'V':'I';
   console.log(JSON.stringify(this.verdit));
   this.sucription = this.projectService.addVerditCase(  this.verdit).subscribe((res:VerditModel)=>{
    this.router.navigate([`/master/project`])
      this.toster.susessMessage('Add case successfully');
      form.reset();  
    },err=>{
      this.toster.errorMessage(err.error.message);
    });
  }
  changed(value : string){
    console.log(value);
  }

}
