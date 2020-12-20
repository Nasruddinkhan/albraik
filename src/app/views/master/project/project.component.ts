import { Component, OnDestroy, OnInit,TemplateRef  } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ColorSketchModule } from 'ngx-color/sketch';
import { Subscription } from 'rxjs';
import { ProjectModel } from '../../modal/project-model';
import { DialogSubmissionService } from '../../service/dialog-submission.service';
import { ProjectService } from '../../service/project.service';
import { AddProjectDialogComponent } from './add-project-dialog/add-project-dialog.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, OnDestroy {
  loading = false;
  caseList:ProjectModel[];
  constructor(private router: Router,
              private projectService: ProjectService,
              private dialog: MatDialog,
              private dialogSubmissionService: DialogSubmissionService) {
             
               }
  searchText: string;
  projects = [];
  pageNo = 1;
  bigTotalItems: number;
  numPages: number = 0;
  maxSize: number = 5;
  userid:string;
  projectList = []; 
  displayedColumns: string[] = ['position', 'name', 'delete'];
  srNo: number = 0;
  addDisabled = false;
  editDisabled = true;
  deleteDisabled = true;
  checkedProject = [];
  pageLength: number;
  pageSize: number;
  pageSizeOptions: number[] = [10];
  firstCheckedProject: Event;
  subscription: Subscription;

  ngOnInit(): void {
    this.userid = sessionStorage.getItem("userId");
    this.findAllTask();
    this.subscription = this.dialogSubmissionService.getDialogSubmitted().subscribe(dialogSubmitted => {
      if (dialogSubmitted) {
        this.findAllTask();
        this.checkedProject = [];
        this.handleDeleteButton();
        this.handleEditButton();
        this.handleAddButton();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createCase() {
    this.router.navigate([`/master/createcase`]);
  
  }
  pageChanged(event: any): void {
    this.pageNo = event.pageIndex + 1;
    this.findAllTask();
  }

  findAllTask(){
    this.loading = true;
    this.projectService.findAllProject(this.userid,this.pageNo).subscribe((res:any)=>{
      this.projectList = res.content;
      this.pageSize = res.size;
      this.pageLength = res.totalElements;
      this.srNo = 0;
      this.projectList.forEach(project => {
        project['srNo'] = ++this.srNo;
      });
      this.loading = false;
     this.bigTotalItems = res.totalElements;
    });
  }

  // onCheckboxChange(e) {
  //   if (e.target.checked) {
  //     this.projects.push(e.target.value);
  //   } else {
  //     this.projects.filter(item =>{
  //       console.log(e.target.value === item);
  //       if(e.target.value === item){
  //           const index: number = this.projects.indexOf(item);
  //           if (index !== -1) {
  //             this.projects.splice(index, 1);
  //            }      
  //       } 
  //     });
  //   }
  //   this.projects = Array.from(new Set(this.projects));
  // }

  onCheckboxChange(e, jobId: number) {
    if (e.checked) {
      this.checkedProject.push({ id: jobId, checkbox: e });
    } else {
      for (let i = 0; i < this.checkedProject.length; ++i) {
        if (this.checkedProject[i]['id'] === jobId) {
          this.checkedProject.splice(i, 1);
          break;
        }
      }
    }
    this.handleDeleteButton();
    this.handleEditButton();
    this.handleAddButton();
    if (this.checkedProject.length === 1) {
      this.firstCheckedProject = this.checkedProject[0]['checkbox'];
    }
  }

  handleEditButton() {
    if (this.checkedProject.length === 1) {
      this.editDisabled = false;
    } else {
      this.editDisabled = true;
    }
  }

  handleDeleteButton() {
    if (this.checkedProject.length > 0) {
      this.deleteDisabled = false;
    } else {
      this.deleteDisabled = true;
    }
  }

  handleAddButton() {
    if (this.checkedProject.length === 0) {
      this.addDisabled = false;
    } else {
      this.addDisabled = true;
    }
  }

  openAddDialog() {
    this.dialog.open(AddProjectDialogComponent);
  }

}
