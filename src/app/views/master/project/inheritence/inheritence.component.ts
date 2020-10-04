import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProjectModel } from '../../../modal/project-model';
import { ProjectService } from '../../../service/project.service';

@Component({
  selector: 'app-inheritence',
  templateUrl: './inheritence.component.html',
  styleUrls: ['./inheritence.component.css']
})
export class InheritenceComponent implements OnInit {
  action = 'Add';
  project:ProjectModel ;

  constructor( private projectService: ProjectService) {
    this.project = new ProjectModel('','',null
  ,'','','','', false);
 
   }

  ngOnInit(): void {
  }
 
  onSubmit(form: NgForm){
   console.log(JSON.stringify(form.value));
  }
  changed(value : string){
    console.log(value);
  }
}
