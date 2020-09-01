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

  ngOnInit() {
    this.departmentForm = this.fb.group({
      department_names: this.fb.array([this.fb.group({departments:''})])
    })
  }
  get departmentNames() {
    return this.departmentForm.get('department_names') as FormArray;
  }

  addDeparment() {
    
    this.departmentNames.push(this.fb.group({departments:''}));
  }

  deleteDepartment(index) {
    this.departmentNames.removeAt(index);
  }

  onSubmit(){
    console.log('department onSubmit');
  }
}
