import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-jobtitle-master',
  templateUrl: './jobtitle-master.component.html',
  styleUrls: ['./jobtitle-master.component.css']
})
export class JobtitleMasterComponent implements OnInit {

  jobTitileForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.jobTitileForm = this.fb.group({
      jobtittle_names: this.fb.array([this.fb.group({jobtittle:''})])
    })
  }
  get jobTitleNames() {
    return this.jobTitileForm.get('jobtittle_names') as FormArray;
  }

  addJobTitle() {
    this.jobTitleNames.push(this.fb.group({jobtittle:''}));
  }

  deleteaddJobTitle(index) {
    this.jobTitleNames.removeAt(index);
  }
  onSubmit(){
    console.log('jobtitle onSubmit');
  }
}
