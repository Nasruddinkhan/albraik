import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddJobtitleDialogComponent } from './add-jobtitle-dialog.component';

describe('JobtitleDialogComponent', () => {
  let component: AddJobtitleDialogComponent;
  let fixture: ComponentFixture<AddJobtitleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddJobtitleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJobtitleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
