import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobtitleMasterComponent } from './jobtitle-master.component';

describe('JobtitleMasterComponent', () => {
  let component: JobtitleMasterComponent;
  let fixture: ComponentFixture<JobtitleMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobtitleMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobtitleMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
