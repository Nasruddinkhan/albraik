import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDtlComponent } from './project-dtl.component';

describe('ProjectDtlComponent', () => {
  let component: ProjectDtlComponent;
  let fixture: ComponentFixture<ProjectDtlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDtlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
