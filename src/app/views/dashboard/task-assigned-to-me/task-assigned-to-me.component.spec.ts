import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAssignedToMeComponent } from './task-assigned-to-me.component';

describe('TaskAssignedToMeComponent', () => {
  let component: TaskAssignedToMeComponent;
  let fixture: ComponentFixture<TaskAssignedToMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskAssignedToMeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAssignedToMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
