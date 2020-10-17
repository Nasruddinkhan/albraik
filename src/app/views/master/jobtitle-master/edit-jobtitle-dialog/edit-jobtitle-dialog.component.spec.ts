import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJobtitleDialogComponent } from './edit-jobtitle-dialog.component';

describe('EditJobtitleDialogComponent', () => {
  let component: EditJobtitleDialogComponent;
  let fixture: ComponentFixture<EditJobtitleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditJobtitleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditJobtitleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
