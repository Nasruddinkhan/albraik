import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTaskAttachmentComponent } from './project-task-attachment.component';

describe('ProjectTaskAttachmentComponent', () => {
  let component: ProjectTaskAttachmentComponent;
  let fixture: ComponentFixture<ProjectTaskAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTaskAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTaskAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
