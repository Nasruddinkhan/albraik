import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CourtAppointmentListComponent } from './court-appointment-list/court-appointment-list.component';

const routes = [
  {
    path: 'list',
    component: CourtAppointmentListComponent,
    data: {
      title: 'court-appointment-list'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourtAppointmentRoutingModule { }
