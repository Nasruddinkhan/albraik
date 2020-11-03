import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExecutedCaseComponent } from './add-executed-case.component';

describe('AddExecutedCaseComponent', () => {
  let component: AddExecutedCaseComponent;
  let fixture: ComponentFixture<AddExecutedCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExecutedCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExecutedCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
