import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../share.module';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
    MatTableModule
  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
