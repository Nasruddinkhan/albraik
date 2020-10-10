import { Component, Input, OnInit } from '@angular/core';
import { DepartmentModel } from '../../../modal/department';

@Component({
  selector: 'app-dept-details',
  templateUrl: './dept-details.component.html',
  styleUrls: ['./dept-details.component.css']
})
export class DeptDetailsComponent implements OnInit {
  @Input("depts")
  depts:DepartmentModel[];
  constructor() { }

  ngOnInit(): void {
  }

}
