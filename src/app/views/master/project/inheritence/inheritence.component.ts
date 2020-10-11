import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from '../../../modal/contact';
import { InheritanceModel } from '../../../modal/Inheretence-model';
import { ContactSearchService } from '../../../service/contact.service';
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
  inheritContact: Contact[];
  constructor(private projectService: ProjectService, 
    private router: Router,
    private toster : ToasterMsgService,
    private contactService: ContactSearchService,
    private activeRoute: ActivatedRoute) {
    this.inherit = new InheritanceModel;
 
   }

  ngOnInit(): void {
    this.findInheritContacts();
    this.activeRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('project')) {
        return;
      }
      this.inherit.project = JSON.parse(paramMap.get('project'));
     
     });
  }
 
  findInheritContacts() {
    this.contactService.getContactType(4).subscribe((res: Contact[]) => {
      this.inheritContact = res;
    }, err => {
      this.inheritContact = [];
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

}
