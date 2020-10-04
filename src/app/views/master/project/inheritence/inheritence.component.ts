import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InheritanceModel } from '../../../modal/Inheretence-model';
import { ProjectService } from '../../../service/project.service';
import { ToasterMsgService } from '../../../service/toaster-msg.service';

@Component({
  selector: 'app-inheritence',
  templateUrl: './inheritence.component.html',
  styleUrls: ['./inheritence.component.css']
})
export class InheritenceComponent implements OnInit {
  action = 'Add';
  inherit:InheritanceModel;
  sucription:Subscription;
  constructor(private projectService: ProjectService, 
    private router: Router,
    private toster : ToasterMsgService,
    private activeRoute: ActivatedRoute) {
    this.inherit = new InheritanceModel;
 
   }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('project')) {
        return;
      }
      this.inherit.project = JSON.parse(paramMap.get('project'));
     
     });
  }
 
  onSubmit(form: NgForm){
   this.inherit.projectDetailsId=null;
   this.inherit.inheritanceOwnerId = form.value.inheritanceOwnerId;
   this.sucription = this.projectService.addInheritanceCase( this.inherit).subscribe((res:InheritanceModel)=>{
    this.router.navigate([`/master/project`])
      this.toster.susessMessage('Add deed successfully');
      form.reset();  
    },err=>{
      this.toster.errorMessage(err.error.message);
    });
  }
  changed(value : string){
    console.log(value);
  }
}
