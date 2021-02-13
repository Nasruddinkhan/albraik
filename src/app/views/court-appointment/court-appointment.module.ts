import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourtAppointmentListComponent } from './court-appointment-list/court-appointment-list.component';
import { CourtAppointmentRoutingModule } from './court-appointment-routing.module';
import { SharedModule } from '../../share.module';



@NgModule({
  declarations: [
    CourtAppointmentListComponent
  ],
  imports: [
    CourtAppointmentRoutingModule,
    SharedModule,
    CommonModule
  ]
})
export class CourtAppointmentModule { }
