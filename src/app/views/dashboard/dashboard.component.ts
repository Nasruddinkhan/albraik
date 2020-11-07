import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ColorEvent } from 'ngx-color';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['projectNumber', 'projectName', 'task', 'date', 'duration', 'assignee', 'priority', 'quickResponse'];
  tasks = [];
  

  ngOnInit(): void {
    // generate random values for mainChart
    
  }

  
}
