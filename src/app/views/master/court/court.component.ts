import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-court',
  templateUrl: './court.component.html',
  styleUrls: ['./court.component.css']
})
export class CourtComponent implements OnInit {

  constructor() { }

  @Input('courtMst') courtMaster: CourtComponent;
  ngOnInit(): void {
  }

}

