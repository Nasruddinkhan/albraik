import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNotesDialogComponent } from './project-notes-dialog.component';

describe('ProjectNotesComponent', () => {
  let component: ProjectNotesDialogComponent;
  let fixture: ComponentFixture<ProjectNotesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectNotesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectNotesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
