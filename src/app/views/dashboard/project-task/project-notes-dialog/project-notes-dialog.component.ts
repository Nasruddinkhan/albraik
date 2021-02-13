import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-project-notes',
  templateUrl: './project-notes-dialog.component.html',
  styleUrls: ['./project-notes-dialog.component.css']
})
export class ProjectNotesDialogComponent implements OnInit {
  projectNotesForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
                notes: string
              },
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.projectNotesForm = this.fb.group({
      notes: ['']
    });
    if (this.data.notes)
      this.notes.setValue(this.data.notes);
  }

  get notes() {
    return this.projectNotesForm.get('notes');
  }

  onSubmit() {
    console.log(this.notes.value);
  }

}
