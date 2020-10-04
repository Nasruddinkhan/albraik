import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Establisement } from '../../../modal/establisment-model';
import { ProjectService } from '../../../service/project.service';
import { ToasterMsgService } from '../../../service/toaster-msg.service';

@Component({
  selector: 'app-company-establishment',
  templateUrl: './company-establishment.component.html',
  styleUrls: ['./company-establishment.component.css']
})
export class CompanyEstablishmentComponent implements OnInit {
  action = 'Add';
  establisment:Establisement ;
  sucription: Subscription;
  constructor(private projectService: ProjectService, 
             private router: Router,
            private toster : ToasterMsgService,
            private activeRoute: ActivatedRoute) {
   }

  ngOnInit() {
    this.establisment = new Establisement;
    this.activeRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('project')) {
        return;
      }
      this.establisment.project = JSON.parse(paramMap.get('project'));
     });
  }

  onSubmit(form: NgForm){
    this.establisment.companyName = form.value.companyName;
    console.log(JSON.stringify( this.establisment));
    this.sucription = this.projectService.addEstiblishmentCompanyCase( this.establisment).subscribe((res:Establisement)=>{
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
