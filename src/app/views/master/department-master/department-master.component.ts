import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-department-master',
  templateUrl: './department-master.component.html',
  styleUrls: ['./department-master.component.css']
})
export class DepartmentMasterComponent implements OnInit {
  departmentForm: FormGroup;
  constructor(private fb: FormBuilder) { }
  submitted = false;
  ngOnInit() {
    this.departmentForm = this.fb.group({  
      department_names: this.fb.array([this.fb.group({departments:''})])
    })
  }
  get departmentNames() {
    return this.departmentForm.get('department_names') as FormArray;
  }
  getValidity(i) {
    return (<FormArray>this.departmentForm.get('department_names')).controls[i].invalid;
  }
  addDeparment() {
    this.submitted = true;
    this.departmentNames.push(this.fb.group({departments:''}));
  }

  deleteDepartment(index) {
    this.departmentNames.removeAt(index);
  }

  onSubmit(){
    console.log('department onSubmit');
  }
}
