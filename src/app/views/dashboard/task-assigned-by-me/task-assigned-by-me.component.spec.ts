import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAssignedByMeComponent } from './task-assigned-by-me.component';

describe('TaskAssignedByMeComponent', () => {
  let component: TaskAssignedByMeComponent;
  let fixture: ComponentFixture<TaskAssignedByMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskAssignedByMeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAssignedByMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
