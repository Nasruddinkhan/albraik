import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.css']
})
export class DeleteConfirmationDialogComponent implements OnInit {
  @Output() confirmClicked = new EventEmitter<any>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string, length: number}) { }

  ngOnInit(): void {
  }

  onConfirm() {
    this.confirmClicked.emit(true);
  }

}
