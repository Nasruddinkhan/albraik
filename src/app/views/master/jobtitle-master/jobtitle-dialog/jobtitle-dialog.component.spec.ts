import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobtitleDialogComponent } from './jobtitle-dialog.component';

describe('JobtitleDialogComponent', () => {
  let component: JobtitleDialogComponent;
  let fixture: ComponentFixture<JobtitleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobtitleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobtitleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
