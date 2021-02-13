import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddSystemMailDialogComponent } from './add-system-mail-dialog/add-system-mail-dialog.component';

@Component({
  selector: 'app-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.css']
})
export class MailListComponent implements OnInit {
  systemMailList: any[];
  displayedColumns = ['mailIcon', 'srNo', 'from', 'to', 'subject', 'sentDate', 'attachment'];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSystemMailList();
  }

  getSystemMailList() {
    this.systemMailList = [
      {
        from: 'Asif Shaikh',
        to: 'Aziz Shaikh',
        subject: 'Test mail',
        sentDate: '12 FEB 2021',
        status: 'READ',
        attachment: []
      },
      {
        from: 'Asif Shaikh',
        to: 'Wasim Shaikh',
        subject: 'Test mail 2',
        sentDate: '12 MARCH 2021',
        status: 'UNREAD',
      },
    ];
    let srNo = 0;
    this.systemMailList.forEach(mail => {
      mail['srNo'] = ++srNo;
    })
  }

  openAddMailDialog() {
    this.dialog.open(AddSystemMailDialogComponent);
  }

}
