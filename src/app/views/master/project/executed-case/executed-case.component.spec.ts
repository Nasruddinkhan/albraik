import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutedCaseComponent } from './executed-case.component';

describe('ExecutedCaseComponent', () => {
  let component: ExecutedCaseComponent;
  let fixture: ComponentFixture<ExecutedCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutedCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutedCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
