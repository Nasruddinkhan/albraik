import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSystemMailDialogComponent } from './add-system-mail-dialog.component';

describe('AddSystemMailDialogComponent', () => {
  let component: AddSystemMailDialogComponent;
  let fixture: ComponentFixture<AddSystemMailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSystemMailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSystemMailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
