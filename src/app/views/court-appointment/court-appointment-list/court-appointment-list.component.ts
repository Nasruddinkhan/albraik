import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-court-appointment-list',
  templateUrl: './court-appointment-list.component.html',
  styleUrls: ['./court-appointment-list.component.css']
})
export class CourtAppointmentListComponent implements OnInit {
  displayedColumns: string[] = ['srNo', 'title', 'appointmentDate', 'appointmentTime', 'court', 'judge/group', 'appointmentType', 'notes'];
  courtAppointmentList: any[];

  constructor() { }

  ngOnInit(): void {
    this.courtAppointmentList = [
      {
        srNo: 1,
        title: 'Court appointment for case 227',
        appointmentDate: '12 FEB 2020',
        appointmentTime: '5:30 PM',
        court: 'Mumbai High Court',
        judge: 'Asif',
        appointmentType: 'Virtual',
        notes: 'Attend this appointment as per the schedule'
      },
      {
        srNo: 2,
        title: 'Court appointment for case 397',
        appointmentDate: '2 MARCH 2020',
        appointmentTime: '10:00 AM',
        court: 'Riyadh Hight Court',
        group: 'Asif, Ayaz, Arbaz',
        appointmentType: 'Physical',
        notes: 'Attend this appointment as per the schedule'
      },
    ]
  }

}
