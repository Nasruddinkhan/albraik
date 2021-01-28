import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAttachmentDialogComponent } from './task-attachment-dialog.component';

describe('TaskAttachmentDialogComponent', () => {
  let component: TaskAttachmentDialogComponent;
  let fixture: ComponentFixture<TaskAttachmentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskAttachmentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAttachmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
