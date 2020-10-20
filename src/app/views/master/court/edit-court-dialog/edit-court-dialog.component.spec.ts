import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourtDialogComponent } from './edit-court-dialog.component';

describe('EditCourtDialogComponent', () => {
  let component: EditCourtDialogComponent;
  let fixture: ComponentFixture<EditCourtDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCourtDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourtDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
