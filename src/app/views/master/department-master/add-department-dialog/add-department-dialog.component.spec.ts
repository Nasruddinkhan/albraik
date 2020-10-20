import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepartmentDialogComponent } from './add-department-department-dialog.component';

describe('AddDialogComponent', () => {
  let component: AddDepartmentDialogComponent;
  let fixture: ComponentFixture<AddDepartmentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDepartmentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDepartmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
